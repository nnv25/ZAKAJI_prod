import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import restaurantRouter from "./routes/restaurantRoute.js";

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

//db connection
connectDB();

//api endpoints
app.use("/api/restaurant", restaurantRouter);

app.get("/", (req, res) => {
  res.send("Zakaji API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
