import express from "express";
import { logger, client } from "./middleware/logger";
import { ConnectMongodb } from "./mongodb/connect";
import { MongooseError } from "mongoose"

import type { Request, Response, NextFunction } from "express";
import { userRoute } from "./routes/userAuthRoute";

const app = express();
const PORT = 3000;

//logger m/w
app.use(client, logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.json({ message: "hello world" })
});

app.use('/auth',userRoute);

app.use(function (req: Request, res: Response) {
  res.status(404).json({ error: `${req.originalUrl} not found` });
});

(async()=>{
  try {
    await ConnectMongodb();
    app.listen(PORT, ()=> {
      console.log(`listening to port ${PORT}`);
    });  
  } catch (error) {
    if(error instanceof MongooseError) {
      console.log(error.message);
      return;
    }
    console.log(error);
  } 
})();

