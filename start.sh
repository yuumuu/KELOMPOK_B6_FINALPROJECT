#!/bin/bash

echo "🚀 Starting Express Docker Application..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  File .env tidak ditemukan!"
    echo "📋 Membuat .env dari .env.example..."
    cp .env.example .env
    echo "✅ File .env berhasil dibuat. Silakan edit file .env sesuai kebutuhan."
    echo ""
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker tidak berjalan!"
    echo "Pastikan Docker Desktop sudah terinstall dan running."
    exit 1
fi

echo "🐳 Building and starting containers..."
docker compose up --build

echo ""
echo "✅ Application is ready!"
echo "🌐 Access at: http://localhost:8080"
