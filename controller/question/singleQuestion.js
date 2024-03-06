const dbConnection = require("../../dbConfig");

const singleQuestion = async (req, res) => {
  const questionid = req.params.questionid;
  try {
    const results = await dbConnection.query(
      "SELECT userid, users.username, title, description FROM questions JOIN users ON answers.userid = users.userid WHERE questionid = ?",
      [questionid]
    );

    if (results.length > 0 && results[0].length > 0) {
      const question = results[0][0];
      res.json({
        userid: question.userid,
        username: question.username,
        title: question.title,
        description: question.description,
      });
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  } catch (error) {
    console.error("Error fetching question info:", error);
    res.status(500).json({ error: "Error fetching question info" });
  }
};

module.exports = singleQuestion;
