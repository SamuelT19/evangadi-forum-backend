const dbConnection = require("../../dbConfig");

const usersInfo = async (req, res) => {
  const userid = req.params.userid;
  try {
    const results = await dbConnection.query(
      "SELECT username FROM users WHERE userid = ?",
      [userid]
    );
    if (results[0].length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = results[0][0];
    res.json({ username: user.username });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Error fetching user info" });
  }
};
module.exports = usersInfo;
