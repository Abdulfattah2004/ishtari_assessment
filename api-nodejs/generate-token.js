const jwt = require("jsonwebtoken");
require("dotenv").config();

const token = jwt.sign(
  {
    userId: 1,
    role: "admin",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);

console.log(token);