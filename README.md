# 🚀 Template Project Akhir - Teknologi Server

Welcome, Challengers! 👋

Ini adalah **Starter Pack** yang sudah **LENGKAP** untuk Project Akhir kalian. Repository ini sudah dilengkapi dengan setup Express.js, Docker, MySQL, Nginx, dan Tailwind CSS.

## ✨ Fitur yang Sudah Tersedia

- ✅ **Express.js Backend** dengan struktur folder yang rapi
- ✅ **MySQL Database** dengan schema Users & Posts
- ✅ **Nginx Reverse Proxy** untuk routing
- ✅ **Docker Compose** untuk orchestration
- ✅ **Tailwind CSS** untuk styling modern
- ✅ **EJS Template Engine** untuk views
- ✅ **API Endpoints** untuk Users & Posts

## 📂 Struktur Folder

```
KELOMPOK_B6_FINALPROJECT/
├── app/                        # Backend Application
│   ├── config/                 # Database configuration
│   ├── routes/                 # API routes
│   ├── view/                   # EJS templates
│   ├── public/                 # Static files (CSS, JS, images)
│   ├── app.js                  # Main application file
│   ├── Dockerfile              # Docker image definition
│   └── package.json            # Dependencies
├── database/
│   └── init.sql                # Database initialization script
├── nginx/
│   └── default.conf            # Nginx configuration
├── docker-compose.yml          # Docker orchestration
├── .env.example                # Environment variables template
└── SETUP.md                    # Detailed setup instructions
```

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env file dengan nilai yang sesuai
# GROUP_NAME, APP_PORT, DB credentials, dll
```

### 2. Jalankan Aplikasi

#### **Windows (PowerShell) - Recommended:**
```powershell
.\run.ps1
```

#### **WSL/Linux:**
```bash
# Buka WSL terminal
wsl

# Navigate ke directory
cd /home/haidaryuum/KELOMPOK_B6_FINALPROJECT

# Jalankan docker compose
docker compose up --build
```

#### **Atau menggunakan script helper:**
```bash
./start.sh
```

### 3. Akses Aplikasi
Buka browser dan akses:
```
http://localhost:8080
```
(atau port sesuai yang Anda set di `APP_PORT`)

### ⚠️ Troubleshooting
Jika ada masalah, lihat file **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** untuk solusi lengkap.


## 🎨 Tech Stack

- **Backend:** Express.js (Node.js 18)
- **Database:** MySQL 8.0
- **Reverse Proxy:** Nginx Alpine
- **Styling:** Tailwind CSS v4
- **View Engine:** EJS
- **Containerization:** Docker + Docker Compose

## 📊 Database Schema

### Users Table
```sql
- id (INT, Primary Key, Auto Increment)
- username (VARCHAR(50), Unique)
- name (VARCHAR(100))
- password (VARCHAR(255))
- created_at (TIMESTAMP)
```

### Posts Table
```sql
- id (INT, Primary Key, Auto Increment)
- user_id (INT, Foreign Key -> users.id)
- content (TEXT)
- likes (INT, Default: 0)
- parent_id (INT, Foreign Key -> posts.id)
- created_at (TIMESTAMP)
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Homepage dengan posts & stats |
| GET | `/api/users` | Get all users (JSON) |
| GET | `/api/posts` | Get all posts with user info (JSON) |

## 📝 Development Guide

### Menambah Route Baru
Edit file `app/routes/index.js`:
```javascript
router.get('/your-route', async (req, res) => {
    // Your logic here
});
```

### Menambah Tabel Database
Edit file `database/init.sql` dan rebuild:
```bash
docker compose down -v
docker compose up --build
```

### Update Styling
Edit file `app/view/index.ejs` dengan Tailwind classes, lalu rebuild:
```bash
docker compose up --build
```

## 🛠️ Useful Commands

```bash
# Start application
docker compose up --build

# Start in background
docker compose up -d --build

# View logs
docker compose logs -f

# Stop application
docker compose down

# Stop and remove all data
docker compose down -v

# Access MySQL container
docker exec -it db_B6 mysql -u root -p
```

## 🐛 Troubleshooting

### Port sudah digunakan
Ubah `APP_PORT` di file `.env`

### Database connection error
Tunggu beberapa detik untuk MySQL initialization, atau cek logs:
```bash
docker compose logs db_service
```

### Perubahan code tidak terlihat
Rebuild container:
```bash
docker compose up --build
```

## 📚 Documentation

Lihat file `SETUP.md` untuk dokumentasi lengkap dan troubleshooting.

## 👥 Team

**Group B6** - Final Project Teknologi Server

---

_Selamat Berjuang! May the Server be with you._ 🚀