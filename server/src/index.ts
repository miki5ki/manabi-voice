import type { Express } from "express";
import express from "express";

const app: Express = express();
const PORT = 8080;

app.listen(PORT, () => console.log("server is running🚀"));
