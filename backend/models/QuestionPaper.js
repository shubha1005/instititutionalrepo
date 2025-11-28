// backend/models/QuestionPaper.js
const mongoose = require("mongoose");

const questionPaperSchema = new mongoose.Schema({
  accessionNumber: { type: String, unique: true },
  year: String,
  course: String,
  semester: String,
  subject: String,
  link: String,
  status: { type: String, default: "available" }, // or shelf/demolished
},{ timestamps: true });

module.exports = mongoose.model("QuestionPaper", questionPaperSchema);
