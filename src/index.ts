import express from "express";
import type { Request, Response, NextFunction } from "express";
import { logger, client } from "./middleware/logger";

const app = express();
const PORT = 3000;

//logger m/w
app.use(client, logger);

app.get('/', function (req: Request, res: Response) {
  res.json({ message: "hello world" })
});

app.use(function (req: Request, res: Response) {
  res.status(404).json({ error: `${req.originalUrl} not found` });
})

app.listen(PORT, ()=> {
  console.log(`listening to port ${PORT}`);
});
