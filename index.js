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
        console.log('db connect');

    }
    catch (err) {

    }
}

run();


const productCollection = client.db('tutor11').collection('products');
const reviewCollection = client.db('tutor11').collection('reviews');
app.post('/products', async (req, res) => {
    try {
        const result = await productCollection.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: `successfully added ${req.body.name}`
            })
        }
        else {
            res.send({
                success: false,
                error: `could not add the product`
            })
        }
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
        })
    }
})

app.listen(port, () => console.log('server running on now', port))