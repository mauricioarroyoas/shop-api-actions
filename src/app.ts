import express from "express";
import { productController } from "./controllers/productController";

export const app = express();
app.use(express.json());  // Middleware to parse JSON
app.use('/products', productController);