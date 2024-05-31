import mongoose from "mongoose";

const Schema = mongoose.Schema;
const firmScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Firm = mongoose.model("firms", firmScheme);
export default Firm;
