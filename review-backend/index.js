//This is considered to be database code - Persistance Layer
import app from "./server.js";
import mongodb, { MongoAPIError } from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

const MongoClient = mongodb.MongoClient
const mongo_username = "admin";   //process.env.MONGO_USERNAME;
const mongo_password = "28112003" //process.env.MONGO_PASSWORD;
console.log(mongo_username + ":" + mongo_password);
//connection string
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.a7waf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        timeoutMS: 2500
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on: http://127.0.0.1: ${port}`)
        })
    })
