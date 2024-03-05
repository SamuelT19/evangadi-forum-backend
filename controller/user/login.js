const dbConnection = require("../../dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await dbConnection.execute(
      "SELECT userid,username, email,password FROM users WHERE email = ?",
      [email]
    );
    console.log(user);

    if (user.length === 0) {
      console.log("User not found");
      return res.status(400).json({ msg: "user not exist" });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "incorrect password" });
    }

    const payload = {
      userid: user[0].userid,
      username: user[0].username,
    };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey);
    console.log(token);
    return res.status(200).json({
      msg: `logedIn succefully`,
      token,
      username: payload.username,
      userid: payload.userid,
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
