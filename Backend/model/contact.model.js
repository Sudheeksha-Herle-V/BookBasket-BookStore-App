// models/contact.model.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactSchema);
export default ContactMessage;
