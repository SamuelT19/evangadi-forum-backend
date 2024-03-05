const express = require("express");
const router = express.Router();

const postQuestion = require("../controller/question/postQuestion");
const allQuestions = require("../controller/question/allQuestions");
const singleQuestion = require("../controller/question/singleQuestion");

router.post("/postQuestion", postQuestion);
router.get("/allQuestions", allQuestions);
router.get("/:questionid", singleQuestion);

module.exports = router;
