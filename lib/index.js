import express from "express";
import { logger, client } from "./middleware/logger.js";
import { ConnectMongodb } from "./mongodb/connect.js";
import { MongooseError } from "mongoose";
import { userRoute } from "./routes/userAuthRoute.js";
import { userGet } from "./routes/userGetRoute.js";
import { oauth } from "./routes/oauthRoute.js";
import { exceptionHandler } from "./middleware/error.js";
const app = express();
const PORT = 3000;

//logger m/w
app.use(client, logger);
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.get('/', function (req, res) {
  res.json({
    message: "hello world"
  });
});
app.use('/auth', userRoute);
app.use('/', userGet);
app.use('/', oauth);
app.use(function (req, res) {
  res.status(404).json({
    error: `${req.originalUrl} not found`
  });
});
app.use(exceptionHandler);
(async () => {
  try {
    await ConnectMongodb();
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(error.message);
      return;
    }
    console.log(error);
  }
})();