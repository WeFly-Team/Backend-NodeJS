import express, { Application } from "express";
import UISwaggerExpress from "swagger-ui-express";
import cors from "cors";
import * as config from "../knexfile";
import knex from "knex";
import { Model } from "objection";
import notificationRoute from "./routes/NotificationRoute";
import { swaggerSpec } from "./docs/swagger";

const ENV: string = "development";
//@ts-expect-error
const knexInstance = knex(config[ENV]);
Model.knex(knexInstance);

const app: Application = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "20mb" }));

app.use("/docs", UISwaggerExpress.serve, UISwaggerExpress.setup(swaggerSpec));

app.use("/api", notificationRoute);
export default app;
