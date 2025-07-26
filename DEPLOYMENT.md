# 🚀 GraphMind AI Chat - Production Deployment Guide

This guide covers deploying GraphMind AI Chat to production using Docker and Docker Compose.

## 📋 Prerequisites

- Docker & Docker Compose installed
- OpenRouter API key
- 2GB+ RAM available
- Port 8000 (and optionally 80/443) available

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │    │  GraphMind App  │    │   React Frontend│
│   (Optional)    │────│   (FastAPI)     │────│   (Built-in)    │
│   Port 80/443   │    │   Port 8000     │    │   Static Files  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <your-repo>
cd graphmind-api
```

### 2. Configure Environment
```bash
# Create .env file
cp .env.example .env

# Edit .env with your API key
OPENROUTER_API_KEY=your_api_key_here
```

### 3. Deploy
```bash
# Run the deployment script
./deploy.sh

# Or manually:
docker-compose up -d
```

### 4. Access Application
- **Frontend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🐳 Docker Configuration

### Single Container Deployment
The application uses a multi-stage Docker build:

1. **Stage 1**: Builds React frontend (`node:18-alpine`)
2. **Stage 2**: Python backend + serves static files (`python:3.11-slim`)

### Services
- **graphmind-app**: Main application container
- **nginx** (optional): Reverse proxy for production

## 📁 File Structure

```
graphmind-api/
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # Service orchestration
├── nginx.conf             # Production proxy config
├── deploy.sh              # Deployment script
├── .dockerignore          # Docker build optimization
├── .env                   # Environment variables
├── requirements.txt       # Python dependencies
├── main.py               # FastAPI app + static serving
├── app/                  # Backend application
└── frontend/             # React application
```

## ⚙️ Configuration Options

### Environment Variables
```bash
# Required
OPENROUTER_API_KEY=your_api_key_here

# Optional
ENVIRONMENT=production
LOG_LEVEL=info
```

### Docker Compose Profiles
```bash
# Basic deployment (app only)
docker-compose up -d

# Production with Nginx
docker-compose --profile production up -d
```

## 🔧 Production Optimizations

### Security Features
- ✅ Non-root user in container
- ✅ Security headers (X-Frame-Options, etc.)
- ✅ Rate limiting (10 req/s per IP)
- ✅ CORS properly configured
- ✅ Health checks enabled

### Performance Features
- ✅ Gzip compression
- ✅ Static file caching (1 year)
- ✅ Multi-stage build (smaller image)
- ✅ Optimized Docker layers
- ✅ Connection pooling

## 📊 Monitoring & Logs

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f graphmind-app

# Last 100 lines
docker-compose logs --tail=100 graphmind-app
```

### Health Monitoring
```bash
# Check health
curl http://localhost:8000/health

# Response:
{
  "status": "healthy",
  "service": "GraphMind AI Chat"
}
```

## 🔄 Management Commands

### Start/Stop
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart
```

### Updates
```bash
# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Cleanup
```bash
# Remove containers and volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

## 🌐 Production Deployment

### With Custom Domain
1. Update `nginx.conf` with your domain
2. Add SSL certificates to `./ssl/` directory
3. Uncomment HTTPS section in nginx.conf
4. Deploy with production profile:
```bash
docker-compose --profile production up -d
```

### Environment-Specific Configs
```bash
# Development
docker-compose -f docker-compose.yml up -d

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port 8000
lsof -i :8000
# Kill process or change port in docker-compose.yml
```

**API Key Issues**
```bash
# Check environment variables
docker-compose exec graphmind-app env | grep OPENROUTER
```

**Frontend Not Loading**
```bash
# Check if static files were built
docker-compose exec graphmind-app ls -la static/
```

### Debug Mode
```bash
# Run with debug output
docker-compose up --verbose

# Access container shell
docker-compose exec graphmind-app bash
```

## 📈 Scaling

### Horizontal Scaling
```yaml
# In docker-compose.yml
services:
  graphmind-app:
    deploy:
      replicas: 3
```

### Load Balancing
Use the included Nginx configuration for load balancing multiple app instances.

## 🔐 Security Checklist

- [ ] API keys stored in `.env` (not committed)
- [ ] Non-root user in containers
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] HTTPS configured (production)
- [ ] Regular security updates
- [ ] Log monitoring setup

## 📞 Support

For issues or questions:
1. Check logs: `docker-compose logs -f`
2. Verify health: `curl http://localhost:8000/health`
3. Review this documentation
4. Open an issue on GitHub

---

**Happy Deploying! 🚀**
