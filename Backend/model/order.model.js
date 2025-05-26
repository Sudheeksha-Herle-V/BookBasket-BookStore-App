import mongoose from "mongoose";

// order.model.js
const orderSchema = new mongoose.Schema({
  userId: String,
  customer: {
    name: String,
    phone: String,
    address: String,
  },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      quantity: Number,
    },
  ],
  total: Number,
  status: { type: String, default: "Pending" }, // "Pending", "Shipped", "Delivered"
}, { timestamps: true });


const Order = mongoose.model("Order", orderSchema);
export default Order;
