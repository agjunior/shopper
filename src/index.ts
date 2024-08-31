import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/ErrorHandler";
import MeasureRouter from "./routes/MeasureRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '20mb' }));

app.get('/health', (_, res: Response) => res.send());
app.use(MeasureRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});