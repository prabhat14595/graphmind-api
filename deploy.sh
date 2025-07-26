#!/bin/bash

# GraphMind AI Chat - Production Deployment Script
set -e

echo "🚀 GraphMind AI Chat - Production Deployment"
echo "=============================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your OPENROUTER_API_KEY"
    echo "Example:"
    echo "OPENROUTER_API_KEY=your_api_key_here"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "Please start Docker and try again."
    exit 1
fi

# Build and start the application
echo "🔨 Building Docker image..."
docker compose build --no-cache

echo "🚀 Starting GraphMind AI Chat..."
docker compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if the application is healthy
echo "🔍 Checking application health..."
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Application is healthy!"
    echo ""
    echo "🎉 GraphMind AI Chat is now running!"
    echo "📱 Frontend: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo "🔍 Health Check: http://localhost:8000/health"
    echo ""
    echo "To stop the application:"
    echo "docker compose down"
    echo ""
    echo "To view logs:"
    echo "docker compose logs -f"
else
    echo "❌ Application health check failed!"
    echo "Check the logs with: docker compose logs"
    exit 1
fi
