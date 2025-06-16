# Emolog-Capstone 

**Emolog** adalah aplikasi journaling berbasis AI yang memungkinkan pengguna menulis catatan harian sekaligus menganalisis emosi yang terkandung di dalamnya secara otomatis. Aplikasi ini terdiri dari tiga bagian utama:

- 🖼️ **Frontend**: Aplikasi web interaktif
- 🔧 **Backend**: REST API dan pengelolaan data
- 🤖 **Machine Learning**: Model deteksi menggunakan FAST API
- 🗄️ **Database**: PostgreSQL untuk menyimpan data pengguna dan catatan

---

## 📁 Struktur Proyek

```
emolog/
├── Emolog-Frontend/                 # Aplikasi client-side (HTML, JS, CSS, Webpack)
├── Emolog-Backend/                  # Backend (Node.js + Express)
├── Emolog-ML/                       # Folder model Machine Learning
├── emolog.sql                       # File SQL untuk struktur database PostgreSQL
└── README.md                        # Dokumentasi proyek ini
```

---

## 🚀 Cara Menjalankan Proyek

### 1. 📦 Prasyarat

Pastikan Anda sudah menginstall:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Python 3.11](https://www.python.org/)
- [pip](https://pip.pypa.io/en/stable/)

---

### 2. 🗄️ Setup Database

1. Buka PostgreSQL (bisa lewat PgAdmin atau psql CLI).
2. Buat database baru bernama `emolog`.
3. Import file `emolog.sql` ke dalam database:

   ```bash
   psql -U postgres -d emolog -f emolog.sql
   ```

4. Pastikan koneksi database di backend sudah sesuai di `app.js`:
   ```js
   const { Pool } = require('pg')
   const db = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'emolog',
     password: 'YOUR_PASSWORD',
     port: 5432
   })
   ```

---

### 3. ⚙️ Jalankan Backend

1. Masuk ke direktori backend:
   ```bash
   cd Emolog-Backend
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server:
   ```bash
   npx nodemon app.js
   ```

4. Backend akan berjalan di: `http://localhost:3000`

---

### 4. 🖥️ Jalankan Frontend

1. Masuk ke direktori frontend:
   ```bash
   cd Emolog-Frontend
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server:
   ```bash
   npm start
   ```

4. Akses melalui: `http://localhost:5173`

---

### 5. 🤖 Jalankan Model Machine Learning

1. Masuk ke direktori model:
   ```bash
   cd Emolog-ML
   ```

2. Install dependensi:
   ```bash
   pip install fastapi uvicorn torch transformers
   ```

3. Jalankan API model:
   ```bash
   uvicorn app:app --reload
   ```

4. Akses melalui: `http://localhost:8000`

---

## 🌟 Fitur Aplikasi

- ✍️ Menulis catatan harian
- 😄 Deteksi otomatis emosi pengguna
- 📅 Kalender histori catatan
- 📤 Upload dan simpan gambar
- 🔐 Autentikasi pengguna

---

## 🛠️ Teknologi yang Digunakan

| Bagian     | Teknologi                             |
|------------|---------------------------------------|
| Frontend   | HTML, CSS, JavaScript, Webpack        |
| Backend    | Node.js, Express.js,                  |
| ML Model   | IndoBERT, FastAPI, PyTorch            |
| Database   | PostgreSQL                            |

---

## 📁 Penjelasan Direktori Penting

### Frontend

```
Emolog-Frontend/
├── pages/              # File HTML halaman login, register, home, dsb.
├── script/             # JavaScript per halaman
├── assets/             # Gambar dan style (CSS)
├── webpack.common.js   # Konfigurasi build umum
```

### Backend

```
Emolog-Backend/
├── app.js              # Entry point Express.js
├── src/                # Berisi controller, router, dsb.
```

### Model Machine Learning

```
Emolog-ML/
├── app.py                  # Serve FastAPI untuk deteksi emosi
├── checkpoint-1315         # Bobot model IndoBERT
├── tokenizer.json          # Tokenizer hasil training
```

---


## 🔐 Environment Variable (Opsional)

Untuk mengatur environment:

**backend/.env**
```
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=emolog
DB_PASSWORD=your_password
DB_PORT=5432
```