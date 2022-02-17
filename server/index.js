const express = require('express');

const admin = require('firebase-admin');

const bodyParser = require('body-parser');

const cors = require('cors');

require('dotenv').config();

console.log(process.env.DB_PASS);

const app = express();


var serviceAccount = require("./jm-auth-98220-firebase-adminsdk-s7i07-866a97f01a.json");

var serviceAccount = require("./jm-auth-98220-firebase-adminsdk-s7i07-866a97f01a.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const port = 3100;

app.use(cors());
app.use(bodyParser.json());

const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cjree.mongodb.net/hotel_management?retryWrites=true&w=majority`;


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


        const bearer = req.headers.authorization;

        if (bearer && bearer.startsWith('Bearer ')) {
            const idToken = bearer.split(' ')[1];

            admin.auth().verifyIdToken(idToken)
                .then(function (decodeToken) {
                    let tokenEmail = decodeToken.email;

                    if (tokenEmail == req.query.mail) {
                        bookings.find({ mail: req.query.mail })
                            .toArray((err, documents) => {
                                res.send(documents);
                                console.log("Error : " + err);
                            })
                    }
                    else {
                        res.status(401).send("Unauthorized Access");
                    }
                })
                .catch(function (err) {
                    res.status(401).send("Unauthorized Access");

                })
        }
        else {
            res.status(401).send("Unauthorized Access");
        }


    })

});


app.get('/', (req, res) => {
    res.send('Welcome To Hotel Management System Backend')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})