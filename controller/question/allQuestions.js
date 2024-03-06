const dbConnection = require("../../dbConfig");

const allQuestions = async (req, res) => {
  try {
    const results = await dbConnection.query(
      "SELECT *,users.username FROM questions JOIN users ON questions.userid = users.userid"
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
module.exports = allQuestions;
