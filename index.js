const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jcatyox.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const foodCollection = client.db("rifat-kitchen").collection('food-item');

        app.get('/limitFoodItem', async(req, res)=>{
            const cursor = foodCollection.find({});
            const limitFood = await cursor.limit(3).toArray();
            res.send(limitFood);
        })
        app.get('/FoodItem', async(req, res)=>{
            const cursor = foodCollection.find({});
            const food = await cursor.toArray();
            res.send(food);
        })
        app.get('/FoodItem/:id', async(req, res)=>{
            const {id} = req.params;
            const query = {_id: ObjectId(id)};
            const food = await foodCollection.findOne(query);
            res.send(food);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))




app.get('/', (req, res) => {
    res.send('Kitchen Server Is Running')
})

app.listen(port, () => {
    console.log(`Kitchen Server Is Running On ${port}`);
})