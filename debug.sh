#!/bin/bash

echo "🔍 Checking container logs for errors..."
echo ""

echo "=== DATABASE LOGS ==="
docker-compose logs --tail=30 db_service
echo ""

echo "=== APP LOGS ==="
docker-compose logs --tail=30 app_service
echo ""

echo "=== CONTAINER STATUS ==="
docker-compose ps
echo ""

echo "=== CHECKING APP CONTAINER ==="
if docker ps -a | grep -q "app_B6"; then
    echo "App container exists. Checking if it's running..."
    docker exec app_B6 ps aux 2>/dev/null || echo "Cannot exec into container (might be stopped)"
else
    echo "App container not found"
fi

echo ""
echo "=== CHECKING DATABASE ==="
if docker ps | grep -q "db_B6"; then
    echo "Database container is running. Checking databases..."
    docker exec db_B6 mysql -u root -p1234 -e "SHOW DATABASES;" 2>/dev/null || echo "Cannot connect to MySQL"
else
    echo "Database container not running"
fi
