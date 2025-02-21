import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes
app.use("/api/products", router);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontEnd/dist"); // Correct path
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start the server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
