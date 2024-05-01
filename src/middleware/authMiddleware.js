const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECURITY, (err, decoded) => {
        if (err) return res.status(401).json({ err: "UnAuthorised User" });
        req.user = decoded;
        console.log(req.user.id);
        next();
      });
    }
  } catch (err) {
    res.status(500).json({ Error: err });
  }
};

module.exports = authMiddleware;
