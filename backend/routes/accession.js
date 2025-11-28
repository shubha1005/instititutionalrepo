// routes/accession.js

const express = require("express");
const router = express.Router();

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

router.get("/:type/next-accession", async (req, res) => {
  const type = req.params.type;
  const Model = modelMap[type];
  const prefix = prefixMap[type];

  if (!Model || !prefix) {
    return res.status(400).json({ error: "Invalid resource type" });
  }

  try {
    // ✅ Find the latest created document
    const latest = await Model.findOne().sort({ createdAt: -1 });

    let nextNumber = 1;

    if (latest && latest.accessionNumber) {
      const match = latest.accessionNumber.match(/\d+$/); // Extract number from end
      if (match) {
        nextNumber = parseInt(match[0], 10) + 1;
      }
    }

    const paddedNumber = nextNumber.toString().padStart(3, "0");
    const accessionNumber = `${prefix}${paddedNumber}`;

    return res.json({ accessionNumber });
  } catch (err) {
    console.error("❌ Failed to fetch next accession number:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const modelMap = {
//   "question-papers": require("../models/QuestionPaper"),
//   "research-papers": require("../models/ResearchPaper"),
//   // "syllabus": require("../models/Syllabus"), // Uncomment when model is ready
// };

// const prefixMap = {
//   "question-papers": "QP",
//   "research-papers": "RP",
//   "syllabus": "SY",
// };

// router.get("/:type/next-accession", async (req, res) => {
//   const type = req.params.type;
//   const Model = modelMap[type];
//   const prefix = prefixMap[type];

//   if (!Model || !prefix) {
//     return res.status(400).json({ error: "Invalid resource type" });
//   }

//   try {
//     // 🔍 Find latest document by accessionNumber (descending)
//     const latestDoc = await Model.findOne().sort({ accessionNumber: -1 });

//     let nextNumber;

//     if (latestDoc && latestDoc.accessionNumber) {
//       // 🧠 Extract the numeric part from the last accession number
//       const match = latestDoc.accessionNumber.match(/\d+$/);
//       const lastNumber = match ? parseInt(match[0], 10) : 0;
//       nextNumber = (lastNumber + 1).toString().padStart(3, "0");
//     } else {
//       // If no records found, start from 001
//       nextNumber = "001";
//     }

//     const accessionNumber = `${prefix}${nextNumber}`;

//     return res.json({ accessionNumber });
//   } catch (err) {
//     console.error("❌ Error generating accession number:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const modelMap = {
//   "question-papers": require("../models/QuestionPaper"),
//   "research-papers": require("../models/ResearchPaper"),
//   //syllabus: require("../models/Syllabus"),
//   // Add others
// };

// const prefixMap = {
//   "question-papers": "QP",
//   "research-papers": "RP",
//   syllabus: "SY",
// };

// router.get("/:type/next-accession", async (req, res) => {
//   const type = req.params.type;
//   const Model = modelMap[type];
//   const prefix = prefixMap[type];

//   if (!Model || !prefix) return res.status(400).json({ error: "Invalid type" });

//   const count = await Model.countDocuments();
//   const nextNumber = (count + 1).toString().padStart(3, "0");
//   const accessionNumber = `${prefix}${nextNumber}`;

//   res.json({ accessionNumber });
// });

// module.exports = router;
