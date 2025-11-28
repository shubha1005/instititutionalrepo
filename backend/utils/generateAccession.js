// utils/generateAccession.js

const modelMap = {
  "question-papers": require("../models/QuestionPaper"),
  "research-papers": require("../models/ResearchPaper"),
  // syllabus: require("../models/Syllabus"),
};

const prefixMap = {
  "question-papers": "QP",
  "research-papers": "RP",
  syllabus: "SY",
};

const generateAccession = async (type) => {
  const Model = modelMap[type];
  const prefix = prefixMap[type];

  if (!Model || !prefix) {
    throw new Error("Invalid resource type for accession generation");
  }

  const latest = await Model.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;

  if (latest && latest.accessionNumber) {
    const match = latest.accessionNumber.match(/\d+$/);
    if (match) {
      nextNumber = parseInt(match[0], 10) + 1;
    }
  }

  const padded = nextNumber.toString().padStart(3, "0");
  return `${prefix}${padded}`;
};

module.exports = generateAccession;

// // backend/utils/generateAccession.js
// const Counter = require("../models/Counter");

// async function generateAccession(prefix) {
//   const counter = await Counter.findByIdAndUpdate(
//     prefix,
//     { $inc: { sequence_value: 1 } },
//     { new: true, upsert: true }
//   );

//   const number = counter.sequence_value.toString().padStart(3, "0");
//   return `${prefix}${number}`; // e.g., QP001
// }

// module.exports = generateAccession;
