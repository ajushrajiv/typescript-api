import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import AppRouter from "./routes";

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use("/v1", AppRouter);

export default app;
