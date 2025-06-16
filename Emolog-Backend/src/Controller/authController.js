const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Fungsi untuk registrasi user baru
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validasi input
  if (!username || !email || !password) {
    return res.status(400).json({ 
      message: "Username, email, dan password harus diisi" 
    });
  }

  try {
    // Cek apakah email atau username sudah ada
    const checkQuery = "SELECT * FROM users WHERE email = $1 OR username = $2";
    const checkResult = await db.query(checkQuery, [email, username]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ 
        message: "Email atau username sudah terdaftar" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru ke database
    const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email
    `;
    const result = await db.query(insertQuery, [username, email, hashedPassword]);

    // Return JSON response
    return res.status(201).json({
      message: "Registrasi berhasil",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Error saat registrasi:", error);
    return res.status(500).json({ 
      message: "Gagal mendaftar", 
      error: error.message 
    });
  }
};

// Fungsi untuk login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ 
      message: "Email dan password harus diisi" 
    });
  }

  try {
    // Cari user berdasarkan email
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        message: "Email tidak ditemukan" 
      });
    }

    const user = result.rows[0];

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ 
        message: "Password salah" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return JSON response
    return res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error login:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat login",
      error: error.message
    });
  }
};

// Fungsi untuk mendapatkan profile user
exports.profile = async (req, res) => {
  try {
    // Set header untuk memastikan response JSON
    res.setHeader('Content-Type', 'application/json');
    
    const userId = req.user.id; // Diambil dari JWT middleware
    
    // Query untuk mendapatkan data user
    const result = await db.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: "User tidak ditemukan" 
      });
    }

    // Return JSON response
    return res.status(200).json({
      message: "Profile berhasil diambil",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Error ambil profile:", error);
    return res.status(500).json({
      message: "Gagal mengambil data profil",
      error: error.message
    });
  }
};