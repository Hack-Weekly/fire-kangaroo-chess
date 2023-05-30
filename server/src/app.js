require('dotenv').config();
const express = require('express');
const app = express();
const connectToMongoDB = require('./config/dbConfig');
const ObjectID = require('mongodb').ObjectId;
const port = process.env.PORT;
let db = null;

// Connect to MongoDB
connectToMongoDB()
  .then(({ db: database }) => {
    db = database;
    app.listen(port, () => {
      console.log(`Running -> http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('test');
});

app.get('/game/:id', async (req, res) => {
  if (!db) {
    res.status(500).send('Not connected to the database');
    return;
  }

  const gamesCollection = db.collection('games');

  try {
    const gameId = req.params.id;
    const game = await gamesCollection.findOne({ _id: new ObjectID(gameId) });

    if (game) {
      let gameInfo = '';
      for (let header of game.headers) {
        gameInfo += `<p>${header.name}: ${header.value}</p>`;
      }
      let gamePgn = '';
      game.moves.forEach((move) => {
        gamePgn += ` ${move.move_number ? move.move_number + '.' : ''}${move.move}`;
      });
      res.send(`<h1>Game ${gameId}</h1><pre>${gameInfo}${gamePgn}</pre>`);
    } else {
      res.status(404).send('Game not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving game');
  }
});

app.get(`/game-index`, async (req, res) => {
  if (!db) {
    res.status(500).send('Not connected to the database');
    return;
  }

  const gamesCollection = db.collection('games');

  try {
    const games = await gamesCollection.find().toArray();

    if (Array.isArray(games)) {
      let response = '<h1>Game Index</h1>';
      games.forEach((game) => {
        response += `<p><a href="/game/${game._id}">${game._id}</a></p>`;
      });
      res.send(response);
    } else {
      res.status(500).send('Error retrieving games');
    }
  } catch (err) {
    res.status(500).send('Error retrieving games');
  }
});

module.exports = app;