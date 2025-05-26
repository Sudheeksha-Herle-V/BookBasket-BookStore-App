import express from "express";
import {
  placeOrder,
  getOrdersByUser,
  getAllOrders,
  getShippedOrders,
  getDeliveredOrders,
  markOrderShipped,
  markOrderDelivered,
} from "../controller/order.controller.js";

const router = express.Router();

router.post("/place/:userId", placeOrder);
router.get("/user/:userId", getOrdersByUser);

// Admin routes
router.get("/admin/orders/all", getAllOrders);
router.get("/admin/orders/shipped", getShippedOrders);
router.get("/admin/orders/delivered", getDeliveredOrders);
router.put("/admin/orders/:orderId/mark-shipped", markOrderShipped);
router.put("/admin/orders/:orderId/mark-delivered", markOrderDelivered);

export default router;
