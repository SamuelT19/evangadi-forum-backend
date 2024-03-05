const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET;

  try {
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    const { username, userid } = jwt.verify(token, secretKey);
    console.log("Token verified successfully");
    console.log(token);

    req.decoded = { username, userid };
    console.log(req.decoded);
    next();
  } catch (err) {
    console.error("Token verification failed");
    return res.status(401).json({ msg: "Token verification failed" });
  }
};

module.exports = authMiddleware;
