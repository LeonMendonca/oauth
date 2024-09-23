import mongoose from "mongoose";
const database = "oauth";
const uri = `mongodb://127.0.0.1:27017/${database}`;
async function ConnectMongodb() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("Connected to MongoDb");
  } catch (error) {
    throw error;
  }
}
;
export { ConnectMongodb };