const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://server11:server11@cluster0.czo9kw9.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log('db connect')
    }
    catch (err) {
        console.log(err.name, err.message)
    }
}


app.get('/product', (req, res) => {
    res.send('data is runnig')
})
run();
app.listen(port, () => console.log('server running on now', port))