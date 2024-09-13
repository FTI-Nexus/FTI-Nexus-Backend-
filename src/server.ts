import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDatabase } from "./infrastructure/database/connectToDatabase";
import { authRouter } from "./interface/routes/authRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./swaggerConfig";
import { errorHandler } from "./interface/middlewares/errorHandler";





const server = express();
// setting up swagger-ui
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// middlewares
server.use(express.json());


// routes
server.use("/api/v1/auth",authRouter)


// error handling middlware
server.use(errorHandler)

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