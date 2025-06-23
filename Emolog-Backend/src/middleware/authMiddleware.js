const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Ambil token dari header
  const authHeader = req.headers.authorization;

  // 2. Cek apakah header ada dan formatnya benar ('Bearer <token>')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak disediakan atau format salah.' });
  }

  try {
    // 3. Ambil token-nya saja (tanpa 'Bearer ')
    const token = authHeader.split(' ')[1];

    // 4. Verifikasi token
    // Pastikan JWT_SECRET sama dengan yang Anda gunakan saat membuat token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. PENTING: Tempelkan payload (data user) dari token ke request
    // Payload Anda harus berisi objek user dengan properti 'id'
    req.user = decoded.user; // atau decoded.id, tergantung struktur token Anda

    // Jika Anda mencetak req.user di sini, seharusnya sudah ada isinya
    // console.log('DEBUG Middleware: req.user berhasil di-set:', req.user);

    // 6. Lanjutkan ke controller berikutnya
    next();
  } catch (error) {
    // Jika token tidak valid (kadaluwarsa, salah, dll.)
    res.status(401).json({ message: 'Token tidak valid.' });
  }
};

module.exports = authMiddleware;