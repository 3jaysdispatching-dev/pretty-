# DispatchOS - Documentation Index

## Start Here

1. **COMPLETE.md** - Verification that everything is built
2. **SUMMARY.md** - Project overview & what's included
3. **README.md** - Full documentation & features
4. **SETUP.md** - Setup guide & troubleshooting

## Quick Reference

- **COMMANDS.md** - Docker & development commands
- **DEPLOYMENT_CHECKLIST.md** - Verification checklist
- **start.sh** - Automated startup script

## Core Files

### Frontend (in `public/`)
- `index3jay.html` - Main UI
- `style.css` - All styling
- `app.js` - Frontend logic

### Backend (in `routes/`)
- `drivers.js` - Driver endpoints
- `loads.js` - Load endpoints
- `invoices.js` - Invoice endpoints
- `compliance.js` - Compliance endpoints
- `notifications.js` - Notification endpoints
- `settings.js` - Settings endpoints

### Configuration
- `server.js` - Express entry point
- `db.js` - Database connection
- `schema.sql` - Database schema
- `package.json` - Dependencies
- `docker-compose.yml` - Orchestration
- `Dockerfile` - Container image
- `.env.example` - Environment template

---

## Usage Guide

### First Time?
```bash
# 1. Read COMPLETE.md (2 min)
# 2. Read SUMMARY.md (3 min)
# 3. Run: docker-compose up -d
# 4. Open: http://localhost:3000
```

### Need Setup Help?
```bash
# Read SETUP.md
# Reference COMMANDS.md
# Check README.md for detailed info
```

### Need API Documentation?
```bash
# Check routes/*.js files
# Read README.md API section
```

### Need to Deploy?
```bash
# Read README.md → Deployment section
# Reference COMMANDS.md → Deployment commands
```

### Need Database Info?
```bash
# Read schema.sql
# Reference COMMANDS.md → Database commands
```

---

## File Organization

### Documentation (5 files)
- COMPLETE.md - What's built
- SUMMARY.md - Overview
- README.md - Full docs
- SETUP.md - Setup guide
- COMMANDS.md - Commands

### Frontend (3 files in `public/`)
- index3jay.html
- style.css
- app.js

### Backend (7 files)
- server.js
- db.js
- routes/ (6 files)

### Configuration (7 files)
- docker-compose.yml
- Dockerfile
- package.json
- schema.sql
- .env.example
- .gitignore
- start.sh

---

## Quick Links

### To Get Started
1. `docker-compose up -d` → Start system
2. `http://localhost:3000` → Open app
3. Settings → Configure APIs (optional)

### To View Logs
```bash
docker-compose logs -f app
```

### To Access Database
```bash
docker exec -it dispatchos-db psql -U dispatchos -d dispatchos
```

### To Update Code
1. Edit files in `public/` or `routes/`
2. For frontend: refresh browser
3. For backend: `docker-compose restart app`

---

## Common Tasks

### View API Status
```bash
curl http://localhost:3000/api/health
```

### View Drivers
```bash
curl http://localhost:3000/api/drivers
```

### View Loads
```bash
curl http://localhost:3000/api/loads
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Everything
```bash
docker-compose down
```

### Delete All Data
```bash
docker-compose down -v
```

### Reset System
```bash
docker-compose down -v
docker-compose up -d
```

---

## Documentation by Role

### For Users/Managers
- SUMMARY.md - What the system does
- README.md - Features & capabilities

### For Developers
- README.md - Full API reference
- routes/*.js - Endpoint code
- COMMANDS.md - Dev commands
- schema.sql - Database schema

### For DevOps/Deployment
- README.md → Deployment section
- docker-compose.yml - Configuration
- Dockerfile - Image definition
- COMMANDS.md → Deployment commands

### For Support/Troubleshooting
- SETUP.md - Troubleshooting section
- COMMANDS.md - Useful commands
- README.md - FAQ section

---

## File Sizes

```
Total Size: ~150 KB
Frontend: 67.1 KB (HTML + CSS + JS)
Backend: ~15 KB (routes + core)
Config: ~5 KB (Docker + env)
Docs: ~27 KB (markdown files)
```

---

## Database Tables

See `schema.sql` for full details:
- companies
- drivers
- loads
- invoices
- compliance_logs
- notifications
- rate_engine
- settings

---

## API Endpoints

40+ endpoints covering:
- Drivers (CRUD + location)
- Loads (CRUD + status)
- Invoices (CRUD + revenue)
- Compliance (HOS, rates, violations)
- Notifications (CRUD + unread)
- Settings (config + company)

See README.md for complete reference.

---

## Getting Help

### Error While Starting?
1. Check SETUP.md → Troubleshooting
2. Run `docker-compose logs`
3. Check COMMANDS.md for solutions

### API not working?
1. Verify: `curl http://localhost:3000/api/health`
2. Check: `docker-compose logs app`
3. Check: `docker-compose logs postgres`

### Database issue?
1. Check: `docker-compose logs postgres`
2. Connect: `docker exec -it dispatchos-db psql -U dispatchos -d dispatchos`
3. Check: `schema.sql` for table structure

### Want to customize?
1. Read README.md → Development section
2. Edit files in routes/ or public/
3. Follow COMMANDS.md for restart commands

---

## Next Steps

1. Read COMPLETE.md (verify everything is here)
2. Read SUMMARY.md (understand what you have)
3. Run `docker-compose up -d`
4. Visit http://localhost:3000
5. Explore the app!

---

**Everything you need is in these files.**

**Start with:** docker-compose up -d

**Then visit:** http://localhost:3000

**Questions?** Check SETUP.md or COMMANDS.md
