const jwt = require("jsonwebtoken");

const config = process.env;
const JWT_SECRET = "asfnajksnfkjasdnfkjsdnfkjsdnfknsdkjf"

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
    console.log("🚀 ~ file: auth.js ~ line 7 ~ verifyToken ~ token", token)

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;