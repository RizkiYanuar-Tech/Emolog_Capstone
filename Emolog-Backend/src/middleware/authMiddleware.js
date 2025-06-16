const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // atau secret kamu
    req.user = decoded;
    console.log("Decoded token:", decoded); // 👈 tambahkan ini
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};
