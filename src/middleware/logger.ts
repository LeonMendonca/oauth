import type { Request, Response, NextFunction } from "express";
import { URL } from "url";

const baseurl = 'http://localhost:3000'

function logger(req: Request, _: Response, next: NextFunction) {
  const start: number = Date.now();
  req.on('end', ()=> {
    const end = Date.now() - start;
    const statement: string = `${req.method} ${req.path} took ${end}ms`;
    console.log(statement);
    console.log(); //new line
    //printEnd(statement.length);
  });
  next();
}

function client(req: Request, _: Response, next: NextFunction) {
  const url = new URL(`${baseurl}${req.originalUrl}`);
  console.log(req.ip, req.hostname, url.searchParams);
  next();
}

/*
function printEnd(length: number) {
  const mid = Math.round(length / 2);
  for (let i: number = 0; i < length; i++) {
    process.stdout.write('-');
    if(i === mid) {
      process.stdout.write('End');
    }
  }
  console.log();
}
*/

export { logger, client };
