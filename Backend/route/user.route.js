import express from "express";
import { signup, login,  getAllUsers, deleteUser } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getAllUsers); // GET all users
router.delete("/:id", deleteUser);

export default router;