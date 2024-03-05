const express = require("express");
const router = express.Router();

const login = require("../controller/user/login");
const signup = require("../controller/user/signup");
const checkUsers = require("../controller/user/checkUsers");
const checker = require("../controller/user/checker");

const authMiddleware = require("../auth/authMiddleware");

router.post("/login", login);
router.post("/signup", signup);
router.get("/check", authMiddleware, checkUsers);
router.get("/checker", checker);

module.exports = router;
