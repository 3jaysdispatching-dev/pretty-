# DispatchOS - Fleet Management System

Fully-loaded production-ready fleet dispatch and management platform with real-time tracking, load management, billing, and compliance.

## Features

✅ **Real-Time Fleet Tracking** - Live GPS updates, driver status monitoring  
✅ **Load Management** - Create, assign, track loads with priority system  
✅ **Driver Management** - Onboard drivers, track HOS, compliance monitoring  
✅ **Route Optimization** - Smart route planning with cost calculations  
✅ **Billing & Invoicing** - Revenue tracking, driver payouts, rate engine  
✅ **Compliance Tracking** - HOS violations, maintenance schedules, license tracking  
✅ **Mobile Responsive** - Works on desktop, tablet, mobile  
✅ **API-First** - RESTful backend, real-time data sync  

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Leaflet Maps
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL 15
- **Maps**: OpenStreetMap (free), Mapbox (optional)
- **SMS**: Twilio (optional)
- **Deployment**: Docker, Docker Compose

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone/setup project
git clone <repo>
cd dispatchos

# Start containers
docker-compose up -d

# Access app
open http://localhost:3000
```

The system initializes with:
- PostgreSQL database (auto-initialized with schema)
- Sample company and data
- Ready-to-use API endpoints

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start PostgreSQL (locally or Docker)
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=dispatchos123 \
  -e POSTGRES_DB=dispatchos \
  -p 5432:5432 \
  postgres:15-alpine

# Initialize database
npm run db:init

# Start server
npm run dev
```

Server runs on http://localhost:3000

## API Endpoints

### Drivers
```
GET    /api/drivers
POST   /api/drivers
PUT    /api/drivers/:id
DELETE /api/drivers/:id
PATCH  /api/drivers/:id/location
```

### Loads
```
GET    /api/loads
GET    /api/loads/:id
GET    /api/loads/status/:status
POST   /api/loads
PUT    /api/loads/:id
DELETE /api/loads/:id
```

### Invoices
```
GET    /api/invoices
GET    /api/invoices/:id
GET    /api/invoices/status/:status
POST   /api/invoices
PUT    /api/invoices/:id
GET    /api/invoices/summary/monthly
```

### Compliance
```
GET    /api/compliance
GET    /api/compliance/hos/violations
POST   /api/compliance
GET    /api/compliance/rates/all
PUT    /api/compliance/rates/:id
```

### Notifications
```
GET    /api/notifications
GET    /api/notifications/unread/count
POST   /api/notifications
PATCH  /api/notifications/:id/read
```

### Settings
```
GET    /api/settings
PUT    /api/settings
GET    /api/settings/company/info
PUT    /api/settings/company/info
```

## Configuration

### Free API Keys Required

1. **Mapbox** (Optional - for premium maps)
   - Visit: https://account.mapbox.com
   - Create free account
   - Copy public token
   - Add to Settings page

2. **Twilio** (Optional - for SMS notifications)
   - Visit: https://www.twilio.com/try-twilio
   - Get $15 free trial credit
   - Verify phone number
   - Copy Account SID, Auth Token, and Twilio phone number
   - Add to Settings page

3. **Samsara** (Optional - for vehicle telematics)
   - Visit: https://cloud.samsara.com
   - Create account or login
   - Generate API key
   - Add to Settings page

## Database Schema

### Tables
- `companies` - Company profiles
- `drivers` - Driver records with HOS tracking
- `loads` - Freight loads with status tracking
- `invoices` - Billing and revenue tracking
- `compliance_logs` - HOS violations and issues
- `notifications` - Driver and system notifications
- `rate_engine` - Pricing configuration
- `settings` - API tokens and company config

## Deployment

### Docker Compose (Single Server)

```bash
docker-compose up -d
```

### Heroku

```bash
heroku create dispatchos
heroku addons:create heroku-postgresql:standard-0
git push heroku main
heroku open
```

### AWS EC2

```bash
# Launch Ubuntu 22.04 instance
ssh -i key.pem ubuntu@your-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Clone and run
git clone <repo>
cd dispatchos
docker-compose up -d
```

### DigitalOcean App Platform

```bash
# Connect GitHub repo
# Set environment variables
# Deploy
```

## Environment Variables

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db

MAPBOX_TOKEN=pk.eyJ1...
TWILIO_ACCOUNT_SID=ACxxx...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_FROM=+15550001234
SAMSARA_API_KEY=samsara_api_...
```

## Development

### Running Tests

```bash
npm test
```

### Database Migrations

```bash
# Connect to database
psql $DATABASE_URL

# Run SQL from schema.sql
\i schema.sql
```

### Hot Reload

```bash
npm run dev
```

Uses Nodemon for automatic server restart on file changes.

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong PostgreSQL password
- [ ] Configure all API keys (Mapbox, Twilio, Samsara)
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring (uptime, logs, errors)
- [ ] Configure backups for PostgreSQL
- [ ] Set up CDN for static assets
- [ ] Configure rate limiting
- [ ] Add authentication/login system
- [ ] Enable CORS for allowed domains
- [ ] Set up error tracking (Sentry)
- [ ] Configure log aggregation (DataDog, New Relic)

## Scaling

### Add Load Balancer
```yaml
nginx:
  image: nginx:alpine
  ports:
    - "80:80"
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf
```

### Multi-Instance Setup
```bash
docker-compose up -d --scale app=3
```

### Separate Databases
```bash
# Primary (writes)
postgresql-primary

# Replicas (reads)
postgresql-replica-1
postgresql-replica-2
```

## Monitoring

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Database Status
```bash
psql $DATABASE_URL -c "SELECT NOW();"
```

### Logs
```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

## Support

### Documentation
- API Docs: `/api/docs` (future)
- Setup Guide: In-app at Settings → Setup Guide
- Database: See `schema.sql`

### Troubleshooting

**Port already in use:**
```bash
lsof -i :3000
kill -9 <PID>
```

**Database connection failed:**
```bash
docker-compose logs postgres
psql $DATABASE_URL
```

**Container won't start:**
```bash
docker-compose logs app
docker-compose down
docker-compose up --build
```

## License

MIT - See LICENSE file

## Contributing

Pull requests welcome! Please follow existing code style.

---

**Ready to deploy?** Run `docker-compose up -d` and visit http://localhost:3000
