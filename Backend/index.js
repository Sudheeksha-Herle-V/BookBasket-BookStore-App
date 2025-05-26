import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.js";
import cartRoutes from './route/cart.route.js';
import checkoutRoutes from "./route/Checkout.route.js";
import orderRoutes from "./route/order.route.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}


// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/orders',orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});