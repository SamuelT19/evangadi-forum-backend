const dbConnection = require("../../dbConfig");

const allAnswers = async (req, res) => {
  const questionid = req.params.questionid;
  try {
   const results = await dbConnection.query(
     "SELECT answerid, answer, users.username FROM answers  JOIN users  ON answers.userid = users.userid WHERE questionid = ? ORDER BY answerid DESC;",
     [questionid]
   );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
module.exports = allAnswers;
