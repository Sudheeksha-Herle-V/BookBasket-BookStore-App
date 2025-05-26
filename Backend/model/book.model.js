import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  count: { type: Number, default: 0 }, 
  outOfStock: {
  type: Boolean,
  default: false,
}
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
