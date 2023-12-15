import app from "./app.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port 5000 and connected to db");
    });
  })
  .catch((err) => {
    if (err) {
      disconnectDB();
    }
  });
