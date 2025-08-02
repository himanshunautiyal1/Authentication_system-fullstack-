import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo db connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "mongo db connection error.Please make sure mongodb is running " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
