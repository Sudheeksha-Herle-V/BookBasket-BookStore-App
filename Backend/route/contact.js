import express from "express";
import ContactMessage from "../model/contact.model.js";

const router = express.Router();

// POST: Create a new contact message
router.post("/", async (req, res) => {
  try {
    const contact = new ContactMessage(req.body);
    await contact.save();
    res.status(200).json({ success: true, message: "Message stored" });
  } catch (err) {
    console.error("Contact POST error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET: Fetch all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// DELETE: Delete a specific contact message by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Contact DELETE error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
