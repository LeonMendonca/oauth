import mongoose from "mongoose";

const database: string = "oauth"
const uri: string = `mongodb://localhost:27017/${database}`;

async function ConnectMongodb() {
  try {
    const conn = await mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000
    }).asPromise();
    if(conn.readyState === 1) {
      console.log("connected to MongoDb", conn.readyState);
    } 
  } catch (error) {
    throw error;
  }
};

export { ConnectMongodb };
