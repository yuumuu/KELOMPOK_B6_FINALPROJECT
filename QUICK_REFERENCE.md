# 🚀 Quick Reference - Express Docker App

## 📋 Checklist Sebelum Mulai

- [ ] Docker Desktop installed dan running
- [ ] WSL 2 enabled (untuk Windows)
- [ ] File `.env` sudah dibuat dan diisi
- [ ] Port 8080 (atau APP_PORT) tersedia

---

## ⚡ Quick Commands

### Start Application

**Windows PowerShell:**
```powershell
.\run.ps1
```

**WSL/Linux:**
```bash
docker compose up --build
```

### Stop Application
```bash
docker compose down
```

### Stop + Remove Data
```bash
docker compose down -v
```

### View Logs
```bash
docker compose logs -f
```

### Rebuild After Changes
```bash
docker compose up --build --force-recreate
```

---

## 🌐 Access Points

| Service | URL |
|---------|-----|
| Homepage | http://localhost:8080 |
| API Users | http://localhost:8080/api/users |
| API Posts | http://localhost:8080/api/posts |

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (REQUIRED) |
| `docker-compose.yml` | Container orchestration |
| `app/app.js` | Main application |
| `app/routes/index.js` | API routes |
| `database/init.sql` | Database schema |
| `nginx/default.conf` | Reverse proxy config |

---

## 🔧 Common Tasks

### Update Database Schema
1. Edit `database/init.sql`
2. Run: `docker compose down -v`
3. Run: `docker compose up --build`

### Add New Route
1. Edit `app/routes/index.js`
2. Add your route handler
3. Rebuild: `docker compose up --build`

### Update UI
1. Edit `app/view/index.ejs`
2. Rebuild: `docker compose up --build`

### Check Database
```bash
docker exec -it db_B6 mysql -u root -prootpassword
```

Then in MySQL:
```sql
USE final_project_db;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM posts;
```

---

## 🐛 Quick Fixes

### Docker not found
→ Use `.\run.ps1` (PowerShell) or run from WSL

### Port in use
→ Change `APP_PORT` in `.env`

### Database connection failed
→ Wait 10 seconds, or run `docker compose down -v && docker compose up --build`

### Changes not showing
→ Run `docker compose up --build --force-recreate`

### Tailwind not working
→ Check `app/public/css/output.css` exists after build

---

## 📊 Container Names

Based on `GROUP_NAME=B6`:
- Database: `db_B6`
- App: `app_B6`
- Nginx: `nginx_B6`

---

## 🔍 Debug Commands

```bash
# Check all containers
docker compose ps

# Check specific service logs
docker compose logs app_service
docker compose logs db_service

# Access app container
docker exec -it app_B6 sh

# Check network
docker network inspect kelompok_b6_finalproject_app_network

# Check volumes
docker volume ls
```

---

## 📝 Environment Variables (.env)

```env
# Required
GROUP_NAME=B6
APP_PORT=8080

# Database
DB_HOST=db_service
DB_USER=root
DB_PASS=secret
DB_NAME=final_project_db
DB_ROOT_PASS=rootpassword
```

---

## 🎯 Development Workflow

1. **Make changes** to code
2. **Rebuild**: `docker compose up --build`
3. **Test**: Open http://localhost:8080
4. **Check logs**: `docker compose logs -f`
5. **Debug**: Access container with `docker exec -it app_B6 sh`

---

## 📚 Documentation

- **README.md** - Overview & quick start
- **SETUP.md** - Detailed setup instructions
- **TROUBLESHOOTING.md** - Common issues & solutions
- **CHANGELOG.md** - What's been implemented

---

**Need Help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
