# 🐛 Troubleshooting Guide

## Masalah Umum dan Solusinya

### 1. ❌ Docker command not found (PowerShell)

**Error:**
```
docker : The term 'docker' is not recognized...
```

**Penyebab:** Docker tidak tersedia di PowerShell Windows

**Solusi:**

#### Opsi A: Gunakan PowerShell Script (Recommended)
```powershell
.\run.ps1
```

#### Opsi B: Jalankan dari WSL Terminal
```bash
# Buka WSL Ubuntu terminal
wsl

# Navigate ke project directory
cd /home/haidaryuum/KELOMPOK_B6_FINALPROJECT

# Jalankan docker compose
docker compose up --build
```

#### Opsi C: Gunakan Docker Desktop Terminal
- Buka Docker Desktop
- Klik "Terminal" atau "CLI"
- Navigate ke project directory
- Run `docker compose up --build`

---

### 2. ❌ Database Connection Failed

**Error:**
```
Database connection failed: connect ECONNREFUSED
```

**Penyebab:** 
- MySQL belum siap saat app mencoba connect
- Password mismatch antara .env dan docker-compose

**Solusi:**

1. **Pastikan .env sudah benar:**
```env
DB_HOST=db_service
DB_USER=root
DB_PASS=secret
DB_NAME=final_project_db
DB_ROOT_PASS=rootpassword
GROUP_NAME=B6
APP_PORT=8080
```

2. **Tunggu beberapa detik** - MySQL membutuhkan waktu untuk initialize

3. **Cek logs database:**
```bash
docker compose logs db_service
```

4. **Restart dengan clean state:**
```bash
docker compose down -v
docker compose up --build
```

---

### 3. ❌ Port Already in Use

**Error:**
```
Error starting userland proxy: listen tcp 0.0.0.0:8080: bind: address already in use
```

**Solusi:**

1. **Ubah APP_PORT di .env:**
```env
APP_PORT=8081  # atau port lain yang available
```

2. **Atau stop service yang menggunakan port tersebut:**
```powershell
# Windows PowerShell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

### 4. ❌ Tailwind CSS Not Building

**Error:**
```
Tailwind build failed
```

**Penyebab:** Tailwind v4 mungkin memiliki compatibility issues

**Solusi:**

File Dockerfile sudah memiliki fallback. Jika masih error:

1. **Downgrade Tailwind ke v3:**
```bash
cd app
npm install -D tailwindcss@3.4.1
```

2. **Update tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./view/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. **Rebuild:**
```bash
docker compose up --build
```

---

### 5. ❌ Permission Denied (WSL)

**Error:**
```
permission denied while trying to connect to the Docker daemon socket
```

**Solusi:**

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Restart WSL
exit
wsl --shutdown
wsl
```

---

### 6. ❌ MySQL Init Script Not Running

**Error:** Tables tidak terbuat

**Solusi:**

1. **Hapus volume dan rebuild:**
```bash
docker compose down -v
docker compose up --build
```

2. **Cek init.sql syntax:**
```bash
cat database/init.sql
```

3. **Manual check di MySQL:**
```bash
docker exec -it db_B6 mysql -u root -prootpassword

# Di MySQL prompt:
USE final_project_db;
SHOW TABLES;
```

---

### 7. ❌ Container Keeps Restarting

**Solusi:**

1. **Cek logs:**
```bash
docker compose logs -f app_service
```

2. **Common issues:**
   - Syntax error di app.js
   - Missing dependencies
   - Database connection timeout

3. **Debug mode:**
```bash
# Edit docker-compose.yml, tambahkan:
app_service:
  command: sh -c "sleep infinity"  # Prevent restart
  
# Lalu exec ke container:
docker exec -it app_B6 sh
npm start  # Run manually untuk lihat error
```

---

### 8. ❌ Changes Not Reflected

**Penyebab:** Docker menggunakan cached image

**Solusi:**

```bash
# Rebuild tanpa cache
docker compose build --no-cache
docker compose up

# Atau force recreate
docker compose up --force-recreate --build
```

---

### 9. ⚠️ Slow Build Time

**Solusi:**

1. **Pastikan .dockerignore ada:**
```
node_modules
npm-debug.log
.env
.git
```

2. **Use BuildKit:**
```bash
# Linux/WSL
export DOCKER_BUILDKIT=1
docker compose up --build

# Windows PowerShell
$env:DOCKER_BUILDKIT=1
docker compose up --build
```

---

### 10. ❌ WSL Integration Not Working

**Solusi:**

1. **Enable WSL Integration di Docker Desktop:**
   - Open Docker Desktop
   - Settings → Resources → WSL Integration
   - Enable integration with Ubuntu
   - Apply & Restart

2. **Verify Docker in WSL:**
```bash
wsl
docker --version
docker compose version
```

---

## 🔍 Debugging Commands

### Check Container Status
```bash
docker compose ps
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f app_service
docker compose logs -f db_service
```

### Access Container Shell
```bash
# App container
docker exec -it app_B6 sh

# Database container
docker exec -it db_B6 mysql -u root -prootpassword
```

### Check Network
```bash
docker network ls
docker network inspect kelompok_b6_finalproject_app_network
```

### Check Volumes
```bash
docker volume ls
docker volume inspect kelompok_b6_finalproject_mysql_data
```

---

## 📞 Still Having Issues?

1. **Check Docker Desktop is running**
2. **Verify .env file exists and has correct values**
3. **Try clean rebuild:**
   ```bash
   docker compose down -v
   docker system prune -f
   docker compose up --build
   ```

4. **Check system requirements:**
   - Docker Desktop installed
   - WSL 2 enabled (for Windows)
   - At least 4GB RAM available
   - Ports 8080 (or APP_PORT) available

---

## ✅ Verification Checklist

- [ ] Docker Desktop is installed and running
- [ ] WSL integration is enabled (Windows)
- [ ] `.env` file exists with correct values
- [ ] Port 8080 (or APP_PORT) is available
- [ ] No other MySQL instance running on port 3306
- [ ] At least 2GB free disk space
- [ ] Internet connection available (for pulling images)

---

**Last Updated:** 2026-01-13
