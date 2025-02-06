import express from "express";

const router = express.Router();

import { getProducts,postProducts,deleteProducts,updateProducts } from "../controllers/product.controller.js";

router.get("/", getProducts);
router.post("/",postProducts)
router.delete("/:id",deleteProducts);
router.put("/:id" , updateProducts);

export default router;