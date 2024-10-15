// authorization
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const authUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    //split token
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ msg: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ msg: "Token is invalid" });
  }
};

module.exports = authUser;
