import express from "express";
import {
  getFirms,
  deleteFirms,
  postFirm,
} from "../controllers/firm.controller.js";

const router = express.Router();

router.get("/get", getFirms);
router.delete("/delete", deleteFirms);
router.post("/post", postFirm);

export default router;
