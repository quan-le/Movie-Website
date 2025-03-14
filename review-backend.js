import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

//This is consider to be a server code
const app = express();

app.use(cors());
app.use(express.json());                                                //allow sending json in request

//Initialize api route. In the reviews.route.js file, we will write how it will react with different type of request being send to this url
app.use("/api/v1/reviews", reviews)  

//404 case
app.use("*", (req, res) => res.status(404).json({error: "Not Found"}))

export default app;