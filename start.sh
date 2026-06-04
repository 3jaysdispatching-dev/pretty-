#!/bin/bash
# DispatchOS - Start Script

echo "================================"
echo "DispatchOS - Fleet Management"
echo "================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed"
    echo "Download from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker Compose is available
if ! docker-compose --version &> /dev/null; then
    echo "ERROR: Docker Compose is not available"
    exit 1
fi

echo "✓ Docker is installed"
echo ""

# Start services
echo "Starting DispatchOS..."
echo ""

docker-compose down --quiet 2>/dev/null

echo "Starting PostgreSQL database..."
docker-compose up -d postgres

# Wait for database
echo "Waiting for database to be ready..."
sleep 10

echo "Starting Node.js API server..."
docker-compose up -d app

# Wait for app
sleep 5

echo ""
echo "================================"
echo "DispatchOS is RUNNING"
echo "================================"
echo ""
echo "Frontend:    http://localhost:3000"
echo "API Health:  http://localhost:3000/api/health"
echo ""
echo "Database:    postgresql://localhost:5432/dispatchos"
echo "DB User:     dispatchos"
echo "DB Password: dispatchos123"
echo ""
echo "View logs:"
echo "  docker-compose logs -f app"
echo "  docker-compose logs -f postgres"
echo ""
echo "Stop services:"
echo "  docker-compose down"
echo ""
echo "Full reset (loses all data):"
echo "  docker-compose down -v"
echo ""
echo "================================"
echo "Opening browser in 3 seconds..."
echo "================================"
echo ""

sleep 3

# Try to open browser
if command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
elif command -v start &> /dev/null; then
    start http://localhost:3000
fi

echo "Ready! Check http://localhost:3000"
