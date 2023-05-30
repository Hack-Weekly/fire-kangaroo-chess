const fs = require('fs');
const pgnParser = require('pgn-parser');
const path = require('path');
const connectToMongoDB = require('./config/dbConfig');
const directoryPath = path.join(__dirname, '..', 'pgn');

connectToMongoDB()
  .then(({ client, db }) => {
    console.log(`connected`);

    fs.readdir(directoryPath, 'utf-8', (err, files) => {
      if (err) {
        return;
      }

      const insertions = files.filter(file => path.extname(file) === '.pgn').map(file => {
        const pgnFilePath = path.join(directoryPath, file);

        return new Promise((resolve, reject) => {
          fs.readFile(pgnFilePath, 'utf-8', (err, pgnData) => {
            if (err) {
              reject(err);
              return;
            }

            let parsedGames;
            try {
              parsedGames = pgnParser.parse(pgnData);
            } catch (parseErr) {
              reject(parseErr);
              return;
            }

            const gamesCollection = db.collection('games');
            Promise.all(parsedGames.map(game => gamesCollection.insertOne(game)))
              .then(() => {
                console.log(`Saved games from ${file} to MongoDB`);
                resolve();
              })
              .catch((dbErr) => {
                console.error('Error saving games to MongoDB', dbErr);
                reject(dbErr);
              });
          });
        });
      });

      Promise.all(insertions)
        .then(() => {
          console.log('All games saved to MongoDB');
          client.close(); // Close the MongoDB connection after all insertions are complete
        })
        .catch((err) => {
          console.error(`Error processing PGN files: ${err}`);
        });
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB`, err);
  });
