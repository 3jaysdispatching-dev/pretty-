# DispatchOS - Complete Setup Guide

## Project Structure

```
dispatchos/
├── public/
│   ├── index3jay.html       # Main app
│   ├── style.css            # Styling
│   └── app.js               # Frontend logic
├── routes/
│   ├── drivers.js           # Driver API endpoints
│   ├── loads.js             # Load API endpoints
│   ├── invoices.js          # Invoice API endpoints
│   ├── compliance.js        # Compliance API endpoints
│   ├── notifications.js     # Notifications API endpoints
│   └── settings.js          # Settings API endpoints
├── server.js                # Express app
├── db.js                    # PostgreSQL pool
├── schema.sql               # Database schema
├── package.json             # Dependencies
├── docker-compose.yml       # Multi-container setup
├── Dockerfile               # App container
├── .env.example             # Environment template
├── .gitignore               # Git ignore file
├── README.md                # Full documentation
└── SETUP.md                 # This file

## Quick Start (Docker - 2 minutes)

```bash
# Clone/download project
cd dispatchos

# Start everything
docker-compose up -d

# Wait for containers (30 seconds)
sleep 30

# Open in browser
open http://localhost:3000
```

Running:
- Frontend (port 3000)
- Node.js API (port 3000)
- PostgreSQL database (port 5432)
- All mock data initialized

## Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15
- npm or yarn

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Start PostgreSQL (if not running)
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=dispatchos123 \
  -e POSTGRES_DB=dispatchos \
  -p 5432:5432 \
  postgres:15-alpine

# 4. Initialize database
npm run db:init

# 5. Start development server
npm run dev
# Server runs on http://localhost:3000
```

## Default Credentials

Demo Company:
- Name: DispatchOS Demo
- MC: MC-123456
- DOT: USDOT-123456
- Email: dispatch@dispatchos.demo

Sample Data:
- 6 Drivers
- 12 Loads
- 6 Invoices
- 3 Notifications

## Docker Compose Commands

```bash
# Start
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build

# Remove all data
docker-compose down -v
```

## API Health Check

```bash
curl http://localhost:3000/api/health
# Response: {"status":"ok","timestamp":"..."}
```

## Database Access

```bash
# Connect to database
docker exec -it dispatchos-db psql -U dispatchos -d dispatchos

# View drivers
SELECT * FROM drivers;

# View loads
SELECT * FROM loads;
```

## Troubleshooting

### Port already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Database connection error
```bash
docker-compose logs postgres
```

### Containers won't start
```bash
docker-compose down
docker-compose up -d --build
```

## Production Deployment

### Heroku
```bash
heroku create dispatchos
heroku addons:create heroku-postgresql:standard-0
git push heroku main
```

### AWS EC2
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
docker-compose up -d
```

## Next Steps

Add authentication, real-time updates, payment processing, SMS integration, CI/CD, monitoring.

---

Ready to deploy? Run: `docker-compose up -d`
