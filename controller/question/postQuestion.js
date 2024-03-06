const dbConnection = require("../../dbConfig");
const { v4: uuidv4 } = require("uuid");

const postQuestion = async (req, res) => {
  const questionid = uuidv4();
  console.log(questionid);
  const { userid, title, description } = req.body;
  try {
    await dbConnection.execute(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?,?)",
      [questionid, userid, title, description]
    );
    console.log("Question inserted successfully:");
    return res.status(200).json({ msg: "questQuestion inserted successfully" });
  } catch (error) {
    console.error("Error inserting question:", error);
    return res.status(500).json({ error: "Error fetching question info" });
  }
};

module.exports = postQuestion;
