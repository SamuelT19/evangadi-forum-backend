const dbConnection = require("../../dbConfig");
const { v4: uuidv4 } = require("uuid");

const postQuestion = async (req, res) => {
  const questionid = uuidv4();
  console.log(questionid);
  const { userid, username, title, description } = req.body;
  try {
    await dbConnection.execute(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?,?)",
      [questionid, userid, username, title, description]
    );
    console.log("Question inserted successfully:");
    return res.status(200).json({ msg: "questQuestion inserted successfully" });
  } catch (error) {
    console.error("Error inserting question:", error);
    throw error;
  }
};

module.exports = postQuestion;
