import Order from "../model/order.model.js";
import Cart from "../model/cart.model.js";
import Book from "../model/book.model.js";

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.bookId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Check stock availability before proceeding
    for (const item of cart.items) {
      const book = await Book.findById(item.bookId._id);
      if (!book) {
        return res.status(400).json({ message: `Book not found: ${item.bookId.name}` });
      }
      if (book.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for "${book.name}". Only ${book.stock} left.`,
        });
      }
    }

    // Calculate total
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.bookId.price * item.quantity,
      0
    );

    // Create order
    const order = new Order({
      userId,
      customer: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      },
      items: cart.items.map(item => ({
        bookId: item.bookId._id,
        quantity: item.quantity,
      })),
      total: totalAmount,
    });

    await order.save();

    // Deduct stock and mark out of stock if needed
    for (const item of cart.items) {
      const book = await Book.findById(item.bookId._id);
      book.stock -= item.quantity;

      if (book.stock <= 0) {
        book.stock = 0;
        book.outOfStock = true;
      }

      await book.save();
    }

    // Clear the cart
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res.status(200).json({ message: "Order placed successfully", order });

  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate("items.bookId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({ status: "Pending" }).populate("items.bookId");
  res.json(orders);
};

export const getShippedOrders = async (req, res) => {
  const orders = await Order.find({ status: "Shipped" }).populate("items.bookId");
  res.json(orders);
};

export const getDeliveredOrders = async (req, res) => {
  const orders = await Order.find({ status: "Delivered" }).populate("items.bookId");
  res.json(orders);
};

export const markOrderShipped = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    { status: "Shipped" },
    { new: true }
  );
  res.json({ message: "Marked as Shipped", order });
};

export const markOrderDelivered = async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate("items.bookId");

  // Reduce stock
  for (const item of order.items) {
    const book = await Book.findById(item.bookId._id);
    if (book.stock >= item.quantity) {
      book.stock -= item.quantity;
      await book.save();
    }
  }

  order.status = "Delivered";
  await order.save();
  res.json({ message: "Marked as Delivered", order });
};
