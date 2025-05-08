#!/bin/bash
# Docker development helper script for ClassConnect

# Make the script exit on any errors
set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Print help message
function show_help {
  echo -e "${GREEN}ClassConnect Docker Development Script${NC}"
  echo -e "Usage: ./docker-dev.sh [command]"
  echo ""
  echo "Commands:"
  echo "  build      - Build Docker image"
  echo "  run        - Run container in development mode"
  echo "  up         - Start services with docker-compose"
  echo "  down       - Stop and remove docker-compose services"
  echo "  deploy     - Build and push the image for deployment"
  echo "  test       - Run tests inside Docker container"
  echo "  clean      - Clean Docker resources (images, containers)"
  echo "  help       - Show this help message"
}

# Build Docker image
function build_image {
  echo -e "${GREEN}Building Docker image...${NC}"
  docker build -t classconnect:dev .
  echo -e "${GREEN}Done building image.${NC}"
}

# Run the container in development mode
function run_container {
  echo -e "${GREEN}Running ClassConnect in development mode...${NC}"
  docker run -it --rm -p 5000:5000 \
    -v "$(pwd):/app" \
    -v /app/node_modules \
    -e NODE_ENV=development \
    classconnect:dev
}

# Start services with docker-compose
function start_services {
  echo -e "${GREEN}Starting services with docker-compose...${NC}"
  docker-compose up -d
  echo -e "${GREEN}Services started. App is available at http://localhost:5000${NC}"
}

# Stop and remove docker-compose services
function stop_services {
  echo -e "${YELLOW}Stopping services...${NC}"
  docker-compose down
  echo -e "${GREEN}Services stopped.${NC}"
}

# Build and push the image for deployment
function deploy_image {
  echo -e "${GREEN}Building and pushing image for deployment...${NC}"
  
  # Prompt for version tag
  read -p "Enter version tag (e.g., v1.0.0): " VERSION_TAG
  
  # Check if version tag was provided
  if [ -z "$VERSION_TAG" ]; then
    echo -e "${RED}Error: Version tag is required.${NC}"
    exit 1
  fi
  
  # Build the image with the provided tag
  docker build -t classconnect:$VERSION_TAG .
  
  # Prompt for Docker registry
  read -p "Enter Docker registry URL (e.g., username or organization on Docker Hub): " DOCKER_REGISTRY
  
  # Check if Docker registry was provided
  if [ -z "$DOCKER_REGISTRY" ]; then
    echo -e "${RED}Error: Docker registry is required.${NC}"
    exit 1
  fi
  
  # Tag the image for the registry
  docker tag classconnect:$VERSION_TAG $DOCKER_REGISTRY/classconnect:$VERSION_TAG
  docker tag classconnect:$VERSION_TAG $DOCKER_REGISTRY/classconnect:latest
  
  # Push the images
  echo -e "${GREEN}Pushing images to $DOCKER_REGISTRY...${NC}"
  docker push $DOCKER_REGISTRY/classconnect:$VERSION_TAG
  docker push $DOCKER_REGISTRY/classconnect:latest
  
  echo -e "${GREEN}Deployment build complete!${NC}"
}

# Run tests inside Docker container
function run_tests {
  echo -e "${GREEN}Running tests in Docker container...${NC}"
  docker run --rm -v "$(pwd):/app" -w /app classconnect:dev npm test
}

# Clean Docker resources
function clean_resources {
  echo -e "${YELLOW}Cleaning Docker resources...${NC}"
  read -p "This will remove ClassConnect containers and images. Continue? (y/n): " CONFIRM
  
  if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    # Remove containers
    echo "Removing containers..."
    docker ps -a | grep classconnect | awk '{print $1}' | xargs docker rm -f 2>/dev/null || true
    
    # Remove images
    echo "Removing images..."
    docker images | grep classconnect | awk '{print $3}' | xargs docker rmi -f 2>/dev/null || true
    
    echo -e "${GREEN}Clean complete.${NC}"
  else
    echo "Clean operation cancelled."
  fi
}

# Main case statement to process commands
case "$1" in
  build)
    build_image
    ;;
  run)
    run_container
    ;;
  up)
    start_services
    ;;
  down)
    stop_services
    ;;
  deploy)
    deploy_image
    ;;
  test)
    run_tests
    ;;
  clean)
    clean_resources
    ;;
  help|*)
    show_help
    ;;
esac