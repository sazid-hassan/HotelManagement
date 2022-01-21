const express = require('express');

const admin = require('firebase-admin');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

var serviceAccount = require("./jm-auth-98220-firebase-adminsdk-s7i07-866a97f01a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const port = 3100;

app.use(cors());
app.use(bodyParser.json());

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hotel:hotel@cluster0.cjree.mongodb.net/hotel_management?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookings = client.db("hotel_management").collection("bookings");

    console.log("DB connected");
    app.post("/addBooking", (req, res) => {
        const newBookings = req.body;

        bookings.insertOne(newBookings)
            .then(result => res.send(result.insertedID));

    });

    app.get('/bookings', (req, res) => {
        console.log(req.headers.authorization);
        bookings.find({ mail: req.query.mail })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

});


app.get('/', (req, res) => {
    res.send('Welcome To Hotel Management System Backend')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})