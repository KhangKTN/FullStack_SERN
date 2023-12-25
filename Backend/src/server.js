import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web";
import web from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors"

require('dotenv').config();

let app = express();
app.use(cors({origin: true, credentials: true}));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({extended: true}));

viewEngine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT;

app.listen(port, () => {
    console.log("Backend NodeJs is running on the port: ", port);
})