# 🔧 Fix: Container Restart Loop

## Masalah
Container `db_B6` terus restart dengan error:
```
Container is restarting, wait until the container is running
```

## Penyebab
Database name tidak konsisten:
- `.env` menggunakan `DB_NAME=final_project_db` (atau tidak diset)
- `database.js` fallback sekarang `bblog`
- MySQL tidak menemukan database → app crash → restart

## Solusi

### Step 1: Update file `.env`
```bash
# Edit file .env
nano .env

# Atau copy dari .env.example yang sudah diupdate
cp .env.example .env
```

Pastikan isi `.env`:
```env
DB_HOST=db_service
DB_USER=root
DB_PASS=1234
DB_NAME=bblog
DB_ROOT_PASS=1234

GROUP_NAME=B6
APP_PORT=2562
```

### Step 2: Stop semua container
```bash
docker-compose down -v
```

**PENTING:** Flag `-v` akan menghapus volume lama (database lama dengan nama `final_project_db`)

### Step 3: Rebuild dan start
```bash
docker-compose up --build
```

### Step 4: Tunggu sampai healthy
Tunggu ~1-2 menit. Cek status:
```bash
docker-compose ps
```

Semua harus status `Up (healthy)`:
```
NAME       STATUS
db_B6      Up (healthy)
app_B6     Up (healthy)
nginx_B6   Up
```

### Step 5: Verify database
```bash
# Cek database name
docker exec -it db_B6 mysql -u root -p1234 -e "SHOW DATABASES;"

# Harus ada 'bblog' di list
```

```bash
# Cek tables
docker exec -it db_B6 mysql -u root -p1234 bblog -e "SHOW TABLES;"
```

```bash
# Cek data
docker exec -it db_B6 mysql -u root -p1234 bblog -e "SELECT * FROM users;"
```

## Verification Commands

### Cek logs jika masih restart:
```bash
docker-compose logs -f app_service
```

Cari error message:
- ❌ `Unknown database 'bblog'` → Database belum dibuat
- ❌ `Access denied` → Password salah
- ✅ `Connected to MySQL via Pool` → Sukses!

### Manual check database:
```bash
docker exec -it db_B6 mysql -u root -p1234

# Di MySQL prompt:
SHOW DATABASES;
USE bblog;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

## Expected Result

Setelah fix:
1. ✅ Container tidak restart lagi
2. ✅ Database `bblog` terbuat
3. ✅ Tables `users` dan `posts` ada
4. ✅ Sample data ter-insert
5. ✅ App connect ke database
6. ✅ Browser http://localhost:2562 menampilkan data

## Quick Fix Script

Jalankan ini untuk auto-fix:
```bash
# Pastikan .env sudah benar
cat .env | grep DB_NAME
# Harus output: DB_NAME=bblog

# Clean rebuild
docker-compose down -v && docker-compose up --build
```

---

**Status:** Setelah langkah ini, container seharusnya tidak restart lagi.
