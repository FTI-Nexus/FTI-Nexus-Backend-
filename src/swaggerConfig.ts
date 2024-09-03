import dotenv from "dotenv";
dotenv.config();
import swaggerJsdoc from "swagger-jsdoc";

import path from "path";

const option: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FTI Nexus Documentation",
      version: "1.0.0",
      description: "This is the documenation on how to interact with FTI Nexus backend service",
    },
    servers: [{ url: `${process.env.BaseUrl}` }],
    tags: [
      {
        name: "Account",
        description: "All operations relating to account",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.resolve(__dirname, `./interface/routes/**/*.js`)],
};

export const swaggerSpecs = swaggerJsdoc(option);


