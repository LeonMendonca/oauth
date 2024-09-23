import express from "express";
import type { Request, Response } from "express";
import http from 'http'
import { getResource } from "./getresource";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/me', async function(req: Request, res: Response) {
  try {
    let pathWithQuery: string = "/oauth";

    if(!req.body.email) {
      throw new Error('no email provided');
    }

    const query = req.query;
    if(query.allow && typeof query.allow === 'string') {
      pathWithQuery = `/oauth?allow=${query.allow}`
    }
    
    const body = JSON.stringify(req.body);    

    const httpReq = http.request({
      host: 'localhost',
      port: 3000,
      method: 'GET',
      path: pathWithQuery,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    }, (httpRes)=> {
      httpRes.on('data', async (data: Buffer)=> {
        if(httpRes.statusCode == 201) {
          //got access token
          const response = await getResource(data.toString('utf-8'));
          res.send(response);
          return;
        }
        //console.log("Headers", httpRes.headers);
        res.set(httpRes.headers);
        res.send(data);
      });
      httpRes.on('end', ()=> {
        console.log('--end of response 1--');
      });
    });
    httpReq.on('error', function(error) {
      console.log(error.message);
    });
    httpReq.write(body);
    httpReq.end();      
  } catch (error) {
    if(error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(400).send("Something went wrong");
  }
  
});

app.use(function (req: Request, res: Response) {
  res.send(`Cannot ${req.method} ${req.path}`);
});

app.listen(2000, ()=> {
  console.log("listening to port 2000");
});
