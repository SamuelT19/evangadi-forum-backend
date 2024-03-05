const dbConnection = require("../../dbConfig");

const checker = async (req, res) => {
    const { userid, username } = req.query;
    
  if (!userid || !username) {
    return res.status(200).json({ result: false });
  }

  try {
    const [userRows] = await dbConnection.execute(
      "SELECT * FROM users WHERE userid = ? AND username = ?",
      [userid, username]
    );
    if (userRows.length >= 1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error("Error fetching data for checker:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = checker;
