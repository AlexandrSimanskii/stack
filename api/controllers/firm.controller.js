import mongoose from "mongoose";
import Firm from "../models/firm.models.js";

export const getFirms = async (req, res, next) => {
  try {
    const searchTerm = req.query._searchTerm || "";
    const limit = parseInt(req.query._limit) || 4;
    const page = parseInt(req.query._page) || 1;

    const searchQuery = searchTerm
      ? { name: { $regex: searchTerm, $options: "i" } }
      : {};

    const totalFirms = await Firm.countDocuments(searchQuery);

    const totalPages = Math.ceil(totalFirms / limit);

    const firms = await Firm.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      firms,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteFirms = async (req, res, next) => {
  const firmId = req.query._id;

  try {
    const firms = await Firm.findByIdAndDelete(firmId);
    if (firms) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Firm not found" });
    }
  } catch (error) {
    next(error);
  }
};
export const postFirm = async (req, res, next) => {
  const { title, director, number } = req.body;

  // Проверка наличия всех обязательных полей
  if (!title || !director || !number) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newFirm = new Firm({
      title,
      director,
      number,
    });
    await newFirm.save();
    res.json({ success: true, firm: newFirm });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};
