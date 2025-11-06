import express from "express";
import {
  addRestaurant,
  getAllRestaurants,
} from "../controllers/restaurantController.js";
import multer from "multer";

const restaurantRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

restaurantRouter.post("/add", upload.single("image"), addRestaurant);

// Получить все рестораны
restaurantRouter.get("/all", getAllRestaurants);

export default restaurantRouter;
