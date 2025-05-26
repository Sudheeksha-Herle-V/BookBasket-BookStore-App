import Cart from "../model/cart.model.js";


export const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.bookId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// cart.controller.js
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "Missing userId or bookId" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ bookId, quantity: 1 }],
      });
    } else {
      const existingItem = cart.items.find(item => item.bookId.toString() === bookId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ bookId, quantity: 1 });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// cart.controller.js
export const removeFromCart = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
    await cart.save();

    // Populate updated cart before returning
    const updatedCart = await Cart.findOne({ userId }).populate("items.bookId");
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookId, action } = req.body;

    if (!["increase", "decrease"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    if (action === "increase") {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items[itemIndex].quantity -= 1;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1); // remove item if quantity hits 0
      }
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.bookId");
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
