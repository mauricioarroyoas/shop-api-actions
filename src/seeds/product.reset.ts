import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

const resetProducts = async () => {
  await AppDataSource.initialize();
  const productRepo = AppDataSource.getRepository(Product);
  await productRepo.clear();


  const products = [
    {
      name: "Gaming Mouse",
      price: 59.99,
      description: "High precision RGB gaming mouse",
      stock: 30,
    },
    {
      name: "Mechanical Keyboard",
      price: 89.99,
      description: "RGB mechanical keyboard with blue switches",
      stock: 20,
    },
    {
      name: "4K Monitor",
      price: 299.99,
      description: "27-inch 4K UHD monitor",
      stock: 10,
    },
    {
      name: "USB-C Hub",
      price: 29.99,
      description: "Multi-port USB-C hub with HDMI and Ethernet",
      stock: 50,
    },
    {
      name: "Laptop Stand",
      price: 39.99,
      description: "Aluminum laptop stand with adjustable height",
      stock: 25,
    },
    {
      name: "Noise Cancelling Headphones",
      price: 199.99,
      description: "Over-ear headphones with active noise cancellation",
      stock: 15,
    },
    {
      name: "Webcam",
      price: 79.99,
      description: "1080p HD webcam with built-in microphone",
      stock: 40,
    },
    {
      name: "Portable SSD",
      price: 129.99,
      description: "1TB USB 3.2 portable solid-state drive",
      stock: 35,
    },
    {
      name: "Ergonomic Chair",
      price: 249.99,
      description: "Office chair with lumbar support and mesh back",
      stock: 12,
    },
    {
      name: "Wi-Fi Router",
      price: 109.99,
      description: "Dual-band Wi-Fi 6 router with parental controls",
      stock: 18,
    },
  ];

  for (const productData of products) {
    const product = productRepo.create(productData);
    await productRepo.save(product);
  }

  console.log("🔄 Products table has been reset.");
  process.exit();
};

resetProducts().catch((err) => {
  console.error("❌ Failed to reset products:", err);
  process.exit(1);
});