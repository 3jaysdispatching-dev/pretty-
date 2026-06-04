# DispatchOS - Command Reference

## Quick Commands

### Start Everything
```bash
docker-compose up -d
```

### Stop Everything
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f app      # App logs
docker-compose logs -f postgres # Database logs
docker-compose logs -f          # All logs
```

### Restart Services
```bash
docker-compose restart
docker-compose restart app
docker-compose restart postgres
```

### Check Status
```bash
docker ps                        # Running containers
docker-compose ps                # Compose services
```

### Full Reset (Loses Data)
```bash
docker-compose down -v
docker-compose up -d
```

---

## Database Commands

### Connect to Database
```bash
docker exec -it dispatchos-db psql -U dispatchos -d dispatchos
```

### Common Queries
```sql
SELECT * FROM drivers;
SELECT * FROM loads;
SELECT * FROM invoices;
SELECT COUNT(*) FROM notifications;
```

### Backup Database
```bash
docker exec dispatchos-db pg_dump -U dispatchos dispatchos > backup.sql
```

### Restore Database
```bash
docker exec -i dispatchos-db psql -U dispatchos -d dispatchos < backup.sql
```

### Reset Database
```bash
docker-compose down -v
docker-compose up -d postgres
sleep 10
docker-compose up -d app
```

---

## Development Commands

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Initialize Database
```bash
npm run db:init
```

### Run Tests
```bash
npm test
```

---

## Docker Commands

### Build Image
```bash
docker build -t dispatchos:latest .
```

### Run Container
```bash
docker run -p 3000:3000 -e DATABASE_URL=... dispatchos:latest
```

### View Images
```bash
docker images
```

### Remove Image
```bash
docker rmi dispatchos:latest
```

### View Volumes
```bash
docker volume ls
```

---

## Troubleshooting Commands

### Port Already in Use
```bash
lsof -i :3000          # Find process on port 3000
kill -9 <PID>          # Kill process
```

### Container Won't Start
```bash
docker-compose logs app            # Check app logs
docker-compose down
docker-compose up -d --build       # Rebuild
```

### Database Connection Failed
```bash
docker-compose logs postgres       # Check database logs
docker exec -it dispatchos-db psql -U postgres # Test connection
```

### Clean Up Everything
```bash
docker system prune -a             # Remove unused images
docker volume prune                # Remove unused volumes
docker-compose down -v             # Remove containers and volumes
```

---

## Deployment Commands

### Heroku Deploy
```bash
heroku create dispatchos
heroku addons:create heroku-postgresql:standard-0
git push heroku main
heroku logs -t
```

### AWS EC2 Deploy
```bash
ssh -i key.pem ubuntu@your-ip
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu
git clone <repo>
cd dispatchos
docker-compose up -d
```

### Scale Services
```bash
docker-compose up -d --scale app=3   # Run 3 app instances
```

---

## Environment Setup

### Copy Environment Template
```bash
cp .env.example .env
```

### Edit Environment
```bash
nano .env                  # Linux/Mac
code .env                  # VS Code
```

### View Environment
```bash
cat .env
```

---

## Health Checks

### API Health
```bash
curl http://localhost:3000/api/health
```

### Database Health
```bash
docker exec dispatchos-db pg_isready -U dispatchos
```

### Container Health
```bash
docker inspect --format='{{.State.Health.Status}}' dispatchos-app
```

---

## Monitoring Commands

### View Resource Usage
```bash
docker stats                       # Live resource monitoring
docker stats --no-stream           # One-time snapshot
```

### View Container Details
```bash
docker inspect dispatchos-app      # App container details
docker inspect dispatchos-db       # Database container details
```

### View Network
```bash
docker network ls
docker network inspect dispatchos_default
```

---

## Development Workflow

### 1. Start Development
```bash
npm run dev
```

### 2. Make Changes
```bash
# Edit files in public/ or routes/
# Server auto-reloads
```

### 3. Test API
```bash
curl http://localhost:3000/api/drivers
```

### 4. Check Logs
```bash
docker-compose logs -f app
```

### 5. Deploy When Ready
```bash
git add .
git commit -m "message"
git push
```

---

## Backup & Restore

### Full Backup
```bash
mkdir backups
docker exec dispatchos-db pg_dump -U dispatchos dispatchos > backups/backup-$(date +%Y%m%d-%H%M%S).sql
```

### Automated Backups (Cron)
```bash
0 2 * * * docker exec dispatchos-db pg_dump -U dispatchos dispatchos > ~/backups/dispatch-$(date +\%Y\%m\%d).sql
```

### Restore from Backup
```bash
docker exec -i dispatchos-db psql -U dispatchos dispatchos < backups/backup.sql
```

---

## Performance Tuning

### View Slow Queries
```bash
docker exec -it dispatchos-db psql -U dispatchos -d dispatchos -c "
SELECT query, calls, mean_time, max_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;"
```

### Optimize Database
```bash
docker exec -it dispatchos-db psql -U dispatchos -d dispatchos -c "ANALYZE;"
docker exec -it dispatchos-db psql -U dispatchos -d dispatchos -c "REINDEX DATABASE dispatchos;"
```

---

## Common Scenarios

### I want to delete all data
```bash
docker-compose down -v
docker-compose up -d
```

### I want to update the API
```bash
# Edit files in routes/
npm run dev  # Auto-reloads
# Or restart:
docker-compose restart app
```

### I want to update the UI
```bash
# Edit files in public/
# Refresh browser (browser caches)
```

### I want to see what's in the database
```bash
docker exec -it dispatchos-db psql -U dispatchos -d dispatchos
```

### I want to add a new API endpoint
```bash
# 1. Create file in routes/
# 2. Add to server.js
# 3. Restart: docker-compose restart app
```

---

## Useful Shortcuts

### Open Shell in Container
```bash
docker exec -it dispatchos-app /bin/sh
docker exec -it dispatchos-db /bin/bash
```

### View Container IP
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' dispatchos-app
```

### Follow Logs in Real-Time
```bash
docker-compose logs -f --tail=50
```

### Exec Command in Container
```bash
docker-compose exec app npm list
docker-compose exec postgres psql --version
```

---

**Save this file for quick reference!**
