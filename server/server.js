import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;


app.get('/socks', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/socks/:color', async (req, res) => {
    try {
        // Console log the entire request object
        //console.log(req);
        const { color } = req.params;//.toLowerCase();

        // Console log specific parts of the request
        //console.log("Headers:", req.headers);
        //console.log("URL:", req.url);
        //console.log("Method:", req.method);
        //console.log("Query parameters:", req.query);

        const data = await fs.readFile('../data/socks.json', 'utf8');
        const jsonObj = JSON.parse(data);
        //sort data to find only reds
        let colorSocks = [];
        for (const sock in jsonObj) {
            if (jsonObj[sock].color.toLowerCase() === color) {
                colorSocks.push(jsonObj[sock]);
            }
        }
        res.json(colorSocks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/socks', async (req, res) => {
    try {
        /*
        //removing user_id from the body of the request
        const user_id = req.body.user_id;
        delete req.body[user_id];
        */
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.insertOne(req.body);
        console.log(socks);
        res.json(socks);

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});

app.post('/socks/search', async (req, res) => {
    try {
        // TODO: Add code that can search MongoDB based on a color value
        // from the Search text box.
        //console.log(req.body.searchTerm);
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({ "sockDetails.color": req.body.searchTerm }).toArray();
        console.log(socks);
        res.json(socks);

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});


app.delete('/socks/:id', async (req, res) => {
    try {
        // TODO: Add code that delete a sock when its delete button is clicked.
        const { id } = req.params;
        console.log(id);
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const resStatus = await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email, // This URL should point to the newly created user
            message: 'User updated successfully.'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});