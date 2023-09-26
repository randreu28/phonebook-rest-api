import mongoose from "mongoose";
import express from "express";

const port = process.env.PORT || 3001;

export function dbConnect(app: express.Express) {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fullstackopencluster.zgr0jwp.mongodb.net/phonebook?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    })
    .catch(() => {
      console.error("Error connecting to db");
    });

  process.on("SIGINT", closeConnection).on("SIGTERM", closeConnection);

  function closeConnection() {
    console.log("MongoDB connection closed due to app termination");
    mongoose.connection.close();
    process.exit(0);
  }
}
