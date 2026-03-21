# Gut Guide — Deployment Guide

This guide covers deploying Gut Guide on an Ubuntu Server using Docker Compose with a Cloudflare Tunnel.

## Prerequisites

- **Ubuntu Server 24.04 LTS** (or similar Linux host)
- **Docker** and **Docker Compose** (v2) installed
- **Cloudflare account** with a domain configured
- **Git** installed on the server

### Install Docker (if needed)

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in for group changes to take effect
```

## 1. Set Up Cloudflare Tunnel

1. Log in to the [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com/)
2. Go to **Networks → Tunnels** and click **Create a tunnel**
3. Choose **Cloudflared** as the connector type
4. Name your tunnel (e.g., `gut-guide`)
5. Copy the **tunnel token** — you'll need this for the `.env` file
6. Under **Public Hostnames**, add a route:
   - **Subdomain**: your chosen subdomain (e.g., `recipes`)
   - **Domain**: your domain
   - **Service**: `http://caddy:80`
   - **Note**: Since Caddy runs inside Docker, set the service URL to `http://localhost:80` — Cloudflare Tunnel will route to the `cloudflared` container which connects to Caddy on the Docker network

## 2. Clone and Configure

```bash
git clone <your-repo-url> gut-guide
cd gut-guide

# Create environment file from template
cp .env.example .env
```

Edit `.env` with your values:

```bash
nano .env
```

```env
POSTGRES_DB=gutguide
POSTGRES_USER=gutguide
POSTGRES_PASSWORD=<a-strong-random-password>
TUNNEL_TOKEN=<your-cloudflare-tunnel-token>
```

## 3. Build and Start

```bash
docker compose up -d --build
```

This starts all five services:
- **db** — PostgreSQL database (data persisted in a Docker volume)
- **backend** — Spring Boot API (runs Flyway migrations on first start, then seeds recipe data)
- **frontend** — Angular app served by Nginx
- **caddy** — Reverse proxy routing `/api/*` to backend, everything else to frontend
- **cloudflared** — Cloudflare Tunnel connector exposing the app to your domain

## 4. Verify

Check that all containers are running:

```bash
docker compose ps
```

Watch the logs:

```bash
docker compose logs -f
```

Check a specific service:

```bash
docker compose logs -f backend
```

The app should be accessible at your configured Cloudflare subdomain within a minute or two.

## Backup & Restore

### Create a backup

```bash
docker compose exec db pg_dump -U gutguide gutguide > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore from backup

```bash
# Stop the backend first to avoid conflicts
docker compose stop backend

# Restore
cat backup_YYYYMMDD_HHMMSS.sql | docker compose exec -T db psql -U gutguide gutguide

# Restart the backend
docker compose start backend
```

## Updating the App

```bash
cd gut-guide

# Pull latest changes
git pull

# Rebuild and restart (only rebuilds changed images)
docker compose up -d --build
```

## Troubleshooting

### Check container status
```bash
docker compose ps
```

### View logs for a specific service
```bash
docker compose logs -f backend
docker compose logs -f db
```

### Restart a single service
```bash
docker compose restart backend
```

### Full reset (destroys database data!)
```bash
docker compose down -v
docker compose up -d --build
```

### Connect to the database directly
```bash
docker compose exec db psql -U gutguide gutguide
```
