const jwt = require("jsonwebtoken");
require("dotenv").config();

//jwt token authentication
function authenticateToken(req, res, next) {
  if (req.headers.hasOwnProperty("authorization") === false) {
    res.status(403).json("No authorization token found.");
  } else {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === "null")
      return res.status(403).json("No authorization token found.");

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.sendStatus(403).json("Failed to authenticate.");
      }
      req.user = user;
      next();
    });
  }
}

module.exports = {authenticateToken};