const express = require("express");
const router = express.Router();

const allAnswers = require("../controller/answer/allAnswers");
const postAnswer = require("../controller/answer/postAnswer");

router.get("/:questionid", allAnswers);
router.post("/postAnswer", postAnswer);

module.exports = router;
