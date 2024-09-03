import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDatabase } from "./infrastructure/database/connectToDatabase";





const server = express();

// middlewares
server.use(express.json());


// routes


// error handling middlware


const port = process.env.PORT ? process.env.PORT : 8000;

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MongoDbConnectionUrl);

    server.listen(port, () => {
      console.log(`Server  is listening on ${port} `);
    });
  } catch (error) {
    console.log(`ServerStartUpError:${error}`);
  }
};

startServer()