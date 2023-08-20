require('dotenv').config()

import express from 'express';
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from './router';

/**
 * Application creation. Applying global middlewares
 */

const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

/**
 * Starting HTTP Server.
 */

const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
})

/**
 * Connection to the MongoDB Database. MONGO_URL retrieved from the .env file.
 */

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL).then(() => { console.log("Base de données connectée.") });
mongoose.connection.on('error', (error: Error) => { console.log(error) })


/**
 * Registering main router for the /api route.
 */

app.use('/api', router());