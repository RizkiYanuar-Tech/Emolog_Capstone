const db = require('../Config/db'); 
const bcrypt = require('bcryptjs');

class User {
    /**
     * Membuat user baru dan menyimpan ke database dengan password yang sudah di-hash.
     * @param {object} userData - Data user { username, email, password }
     * @returns {Promise<object>} Objek user yang baru dibuat (tanpa password hash).
     */
    static async create({ username, email, password }) {
        // 1. Generate salt dan hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Simpan user baru ke database
        try {
            const result = await db.query(
                'INSERT INTO tbl_users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email, created_at',
                [username, email, hashedPassword]
            );
            return result.rows[0];
        } catch (error) {
            // Tangani error jika username atau email sudah ada (unique constraint)
            if (error.code === '23505') { // Kode error PostgreSQL untuk unique violation
                throw new Error('Username atau email sudah terdaftar.');
            }
            throw error;
        }
    }

    /**
     * Mencari user berdasarkan email.
     * @param {string} email - Email user.
     * @returns {Promise<object|undefined>} Objek user lengkap (termasuk password hash) atau undefined jika tidak ditemukan.
     */
    static async findByEmail(email) {
        const result = await db.query('SELECT * FROM tbl_users WHERE email = $1', [email]);
        return result.rows[0];
    }
}

module.exports = User;