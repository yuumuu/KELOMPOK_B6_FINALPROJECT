#!/bin/bash

echo "🔧 Fixing container restart loop..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  File .env tidak ditemukan!"
    echo "📋 Membuat .env dari .env.example..."
    cp .env.example .env
    echo "✅ File .env berhasil dibuat."
    echo ""
fi

# Show current DB_NAME
echo "📊 Current database configuration:"
grep "DB_NAME" .env
echo ""

# Ask for confirmation
read -p "⚠️  This will DELETE all existing data. Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled."
    exit 1
fi

echo ""
echo "🧹 Stopping and removing old containers and volumes..."
docker-compose down -v

echo ""
echo "🏗️  Building fresh containers..."
docker-compose up --build -d

echo ""
echo "⏳ Waiting for containers to be healthy..."
sleep 10

echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "✅ Done! Check status above."
echo ""
echo "If all containers are 'Up (healthy)', access:"
echo "  🌐 http://localhost:2562"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
