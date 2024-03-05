const dbConnection = require("../../dbConfig");
const bcrypt = require("bcrypt");
// const { statusCodes } = require("http-status-codes");

const signup = async (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  try {
    // Run the INSERT query
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [user] = await dbConnection.execute(
      "SELECT userid, username, email FROM users WHERE email = ? or username = ?",
      [email, username]
    );

    if (user.length > 0) {
      if (user[0].email === email) {
        return res.status(400).json({ msg: "Email already registered" });
      } else if (user[0].username === username) {
        return res.status(400).json({ msg: "Username already used" });
      }
    }

    // If the user doesn't exist, insert the new user
    await dbConnection.query(
      "INSERT INTO users (email, firstname, lastname,username,  password ) VALUES (?, ?, ?, ?, ?)",
      [email, firstname, lastname, username, hashedPassword]
    );

    return res.status(200).json({ msg: "User created" });
  } catch (error) {
    console.error("Error inserting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = signup;
