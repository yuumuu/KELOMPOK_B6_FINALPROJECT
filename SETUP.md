# 🚀 Cara Menjalankan Aplikasi

## Prerequisites
Pastikan Anda sudah menginstall:
- Docker Desktop (untuk Windows)
- Docker Compose

## Langkah-langkah Setup

### 1. Clone Repository (Sudah dilakukan)
```bash
git clone https://github.com/yuumuu/KELOMPOK_B6_FINALPROJECT.git
cd KELOMPOK_B6_FINALPROJECT
```

### 2. Setup Environment Variables
Pastikan file `.env` sudah ada dan terisi dengan benar:
```bash
# Jika belum ada, copy dari .env.example
cp .env.example .env
```

Isi file `.env` dengan nilai yang sesuai:
```env
DB_HOST=db_service
DB_USER=root
DB_PASS=secret
DB_NAME=final_project_db
DB_ROOT_PASS=rootpassword
GROUP_NAME=B6
APP_PORT=8080
```

### 3. Jalankan Aplikasi dengan Docker Compose

**Dari WSL Ubuntu:**
```bash
cd /home/haidaryuum/KELOMPOK_B6_FINALPROJECT
docker compose up --build
```

**Atau dari PowerShell/CMD (jika Docker Desktop sudah running):**
```bash
docker compose up --build
```

### 4. Akses Aplikasi
Setelah semua container berjalan, buka browser dan akses:
```
http://localhost:8080
```

## 🛠️ Perintah Docker Berguna

### Menjalankan aplikasi (background)
```bash
docker compose up -d --build
```

### Melihat logs
```bash
docker compose logs -f
```

### Stop aplikasi
```bash
docker compose down
```

### Stop dan hapus semua data (termasuk database)
```bash
docker compose down -v
```

### Rebuild aplikasi setelah perubahan code
```bash
docker compose up --build
```

## 📊 Struktur Database

### Tabel Users
- `id` - INT (Primary Key, Auto Increment)
- `username` - VARCHAR(50) (Unique)
- `name` - VARCHAR(100)
- `password` - VARCHAR(255)
- `created_at` - TIMESTAMP

### Tabel Posts
- `id` - INT (Primary Key, Auto Increment)
- `user_id` - INT (Foreign Key -> users.id)
- `content` - TEXT
- `likes` - INT (Default: 0)
- `parent_id` - INT (Foreign Key -> posts.id, untuk replies)
- `created_at` - TIMESTAMP

## 🎨 Tech Stack
- **Backend:** Express.js (Node.js)
- **Database:** MySQL 8.0
- **Reverse Proxy:** Nginx
- **Styling:** Tailwind CSS
- **Containerization:** Docker + Docker Compose
- **View Engine:** EJS

## 📝 API Endpoints

### GET /
Halaman utama dengan tampilan posts dan statistik

### GET /api/users
Mendapatkan semua user (JSON)

### GET /api/posts
Mendapatkan semua posts dengan informasi user (JSON)

## 🐛 Troubleshooting

### Port sudah digunakan
Jika port 8080 sudah digunakan, ubah `APP_PORT` di file `.env`

### Database tidak terkoneksi
Pastikan service `db_service` sudah running:
```bash
docker compose ps
```

### Perubahan code tidak terlihat
Rebuild container:
```bash
docker compose up --build
```

### Error saat build Tailwind CSS
Tailwind CSS akan di-build otomatis saat Docker image dibuat. Jika ada error, periksa file `tailwind.config.js` dan `public/css/input.css`

## 📦 Development

Untuk development lokal tanpa Docker (tidak disarankan):
```bash
cd app
npm install
npm run build:css  # Build Tailwind CSS
npm start          # Jalankan aplikasi
```

**Note:** Pastikan MySQL sudah running dan sesuaikan environment variables di `.env`
