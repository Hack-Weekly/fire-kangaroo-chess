const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const dbURL = process.env.DB_URL;

MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log(`Connected to MongoDB!`);
    const db = client.db();

    db.collection('games').aggregate([
        {
            $group: {
                _id: { headers: "$headers" },
                dups: { $addToSet: "$_id" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { $gt: 1 }
            }
        }
    ])
    .forEach(function(doc) {
        doc.dups.shift();
        db.collection('games').deleteMany({ _id : {$in: doc.dups }});
    });

  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB`, err);
  });