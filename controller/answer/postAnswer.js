const dbConnection = require("../../dbConfig");

const postAnswer = async (req, res) => {
  const { userid, questionid, answer } = req.body;
  try {
    await dbConnection.execute(
      "INSERT INTO answers ( userid,questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );
    console.log("Answer inserted successfully");
    return res.status(200).json({ msg: "answer posted successfully" });
  } catch (error) {
    console.error("Error inserting answer:", error);
    throw error;
  }
};

module.exports = postAnswer;
