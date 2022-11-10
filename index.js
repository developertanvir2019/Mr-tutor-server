const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
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
//for all services
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
});
app.get('/products', async (req, res) => {
    try {
        const cursor = productCollection.find({});
        const products = await cursor.toArray();
        res.send(products)
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
        })
    }
})
app.get('/services/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products)
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
        })
    }
})
app.get('/limit', async (req, res) => {
    try {
        const cursor = productCollection.find({}).limit(3);
        const products = await cursor.toArray();
        res.send(products)
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
        })
    }
})

//end all service getting part


//start review part.....

app.post('/review', async (req, res) => {
    try {
        const result = await reviewCollection.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: `successfully added ${req.body.name}`
            })
        }
        else {
            res.send({
                success: false,
                error: `could not add the review`
            })
        }
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
        })
    }
});


app.get('/myReview', async (req, res) => {
    let query = {};
    if (req.query.email) {
        query = {
            email: req.query.email
        }
    }
    const cursor = reviewCollection.find(query);
    const reviews = await cursor.toArray();
    res.send(reviews)
});
app.get('/productReview', async (req, res) => {
    let query = {};
    if (req.query.productName) {
        query = {
            productName: req.query.productName
        }
    }
    const cursor = reviewCollection.find(query);
    const reviewss = await cursor.toArray();
    res.send(reviewss)
});




app.delete('/myReview/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await reviewCollection.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount) {
            res.send({
                success: true,
                message: 'successfully delete'
            })

        } else {

        }
    }
    catch (error) {
        console.log(error)
    }
})





app.listen(port, () => console.log('server running on now', port))