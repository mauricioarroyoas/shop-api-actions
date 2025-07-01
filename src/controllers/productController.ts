import { Router } from "express";
import { ProductService } from "../services/ProductService";

export const productController = Router();
const productService = new ProductService();

productController.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
});

productController.post("/", async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.name || !productData.price || !productData.description) {
      res.status(400).json({
        message: "invalid product data",
        error: "name, price and description are required",
      });
    }
    const newProduct = await productService.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "error craeting the product",
      error: error instanceof Error ? error.message : "unknowns error",
    });
  }
});

productController.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await productService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : "unknown error",
    });
  }
});

productController.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedProduct = await productService.update(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : "unknown error",
    });
  }
});

productController.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({error: "id must be a number"})
    }
    const product = await productService.getById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({error: "product doesn't exist"})
  }
})

productController.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const fieldUpdated = await productService.updateField(id, req.body);
    res.status(200).json(fieldUpdated);
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : "Unprocesable Entity"
    })
  }
})
