const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
// for access ing .cnv file
const port= process.env.PORT || 3000;
// middleware
app.use(cors())
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.cg8xo0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const ChairsCollection = client.db("furnifluxDB").collection("chairs");

    app.get('/chairs', async (req, res) => {
      const cursor = ChairsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("furniflux is running");
  });
  
  app.listen(port, () => {
    console.log(`furniflux is running on port ${port}`);
  });
  
  /**
   * ----------------------
   * naming convention
   * ----------------------
   * app.get('/user')
   * app.get('/user/:id')
   * app.post('/user')
   * app.put('/user/:id')
   * app.patch('/user/:id')
   * app.delete('/user/:id')
   */
  