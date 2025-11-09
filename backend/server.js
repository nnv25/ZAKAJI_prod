import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import foodRouter from "./routes/foodRoute.js";
import categoryRouter from "./routes/categoryRouter.js";
import userRoutes from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/uploadsFood", express.static("uploadsFood"));

//db connection
connectDB();

//api endpoints
app.use("/api/restaurant", restaurantRouter);
app.use("/api/food", foodRouter);
app.use("/api/category", categoryRouter);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Zakaji API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
