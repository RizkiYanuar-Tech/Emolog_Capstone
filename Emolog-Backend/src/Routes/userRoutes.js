// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db"); // pakai config/db.js kamu
const bcrypt = require("bcrypt");

// GET /api/auth/profile
router.get("/profile", authMiddleware, async (req, res) => {
  console.log("Route /profile berhasil dipanggil");
  try {
    const username = req.user.username;

    const query = "SELECT username, email FROM users WHERE username = $1";
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const user = result.rows[0];
    res.json(user);

  } catch (error) {
    console.error("Error ambil profile:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// PATCH /api/profile/email
router.patch("/profile/email", authMiddleware, async (req, res) => {
  const { currentEmail, newEmail } = req.body;
  const username = req.user.username;

  try {
    // Cek apakah currentEmail cocok
    const checkQuery = "SELECT email FROM users WHERE username = $1";
    const checkResult = await db.query(checkQuery, [username]);

    if (checkResult.rows.length === 0 || checkResult.rows[0].email !== currentEmail) {
      return res.status(400).json({ message: "Email lama tidak cocok." });
    }

    // Update ke email baru
    const updateQuery = "UPDATE users SET email = $1 WHERE username = $2";
    await db.query(updateQuery, [newEmail, username]);

    res.json({ message: "Email berhasil diperbarui." });
  } catch (err) {
    console.error("Error update email:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat update email." });
  }
});

router.patch("/profile/password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.user.username;

  try {
    // Ambil password hash dari database
    const userResult = await db.query("SELECT password FROM users WHERE username = $1", [username]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const user = userResult.rows[0];

    // Bandingkan password lama
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password lama salah." });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.query("UPDATE users SET password = $1 WHERE username = $2", [hashedPassword, username]);

    res.json({ message: "Password berhasil diubah." });
  } catch (err) {
    console.error("Error update password:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat update password." });
  }
});

module.exports = router;
