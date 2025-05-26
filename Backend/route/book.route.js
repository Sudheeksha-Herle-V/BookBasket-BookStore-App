import express from "express";
import {getBook, createBook, getBookById, updateBook, deleteBook} 
from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/", createBook);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;