import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send("API RESTful is working!"));

export default router;
