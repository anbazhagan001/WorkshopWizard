#!/bin/bash
# Development Docker environment script for ClassConnect

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Make the script exit on any errors
set -e

# Help function
function show_help {
  echo -e "${GREEN}ClassConnect Development Docker Environment${NC}"
  echo -e "Usage: ./docker-dev.sh [command]"
  echo ""
  echo "Commands:"
  echo "  up       - Start development environment"
  echo "  down     - Stop development environment"
  echo "  restart  - Restart development environment"
  echo "  logs     - Show logs"
  echo "  help     - Show this help message"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo -e "${RED}Error: Docker is not installed${NC}"
  exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
  echo -e "${RED}Error: Docker Compose is not installed${NC}"
  exit 1
fi

# Start development environment
function start_env {
  echo -e "${GREEN}Starting ClassConnect development environment...${NC}"
  docker-compose up -d
  
  echo -e "${YELLOW}Waiting for services to start...${NC}"
  sleep 5
  
  echo -e "${GREEN}ClassConnect development environment is ready!${NC}"
  echo -e "Web application: http://localhost:5000"
  echo -e "API endpoints:   http://localhost:5000/api/*"
  echo -e "Health check:    http://localhost:5000/health"
}

# Stop development environment
function stop_env {
  echo -e "${YELLOW}Stopping ClassConnect development environment...${NC}"
  docker-compose down
  echo -e "${GREEN}ClassConnect development environment stopped.${NC}"
}

# Show logs
function show_logs {
  echo -e "${YELLOW}Showing logs for ClassConnect development environment...${NC}"
  docker-compose logs -f
}

# Main case statement to process commands
case "$1" in
  up)
    start_env
    ;;
  down)
    stop_env
    ;;
  restart)
    stop_env
    start_env
    ;;
  logs)
    show_logs
    ;;
  help|*)
    show_help
    ;;
esac