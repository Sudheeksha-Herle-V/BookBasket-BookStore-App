import express from "express";
import {
  addToCart,
  getCartByUserId,
  removeFromCart,
  clearCart,
  updateCartQuantity
} from "../controller/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCartByUserId); 
router.delete("/:userId/:bookId", removeFromCart);
router.delete("/:userId", clearCart);
router.put("/:userId", updateCartQuantity);

export default router;
