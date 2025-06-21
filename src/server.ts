import mongoose from "mongoose";
import { Server } from "http";
import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/db";

let server: Server;
const port = process.env.PORT || 4000;

const main = async () => {
  try {
    await connectDB();
    server = app.listen(port, () => {
      console.log(`App listening at port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
