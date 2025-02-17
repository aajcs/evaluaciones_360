const jwt = require("jsonwebtoken");
const validadJwt = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }
  try {
    const { id } = jwt.verify(token, process.env.RIVATE_KEY);

    req.id = id;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};

module.exports = {
  validadJwt,
};
