#!/bin/bash

echo "🧹 Cleaning up old containers and volumes..."
docker-compose down -v

echo ""
echo "🏗️  Building and starting fresh containers..."
docker-compose up --build

echo ""
echo "✅ Done!"
