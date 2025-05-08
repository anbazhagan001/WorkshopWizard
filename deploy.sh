#!/bin/bash
# Deployment script for ClassConnect application

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Make the script exit on any errors
set -e

# Get command-line arguments
ENVIRONMENT="$1"
VERSION_TAG="$2"

# Validate arguments
if [ -z "$ENVIRONMENT" ] || [ -z "$VERSION_TAG" ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo -e "Usage: ./deploy.sh <environment> <version_tag>"
    echo -e "  environment: staging|production"
    echo -e "  version_tag: The version to deploy (e.g., v1.0.0)"
    exit 1
fi

# Validate environment
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo -e "${RED}Error: Invalid environment${NC}"
    echo -e "Environment must be 'staging' or 'production'"
    exit 1
fi

# Docker image details
DOCKER_REGISTRY="your-docker-registry" # Replace with your Docker registry
DOCKER_IMAGE="classconnect"
FULL_IMAGE_NAME="$DOCKER_REGISTRY/$DOCKER_IMAGE:$VERSION_TAG"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}Deploying ClassConnect to $ENVIRONMENT environment...${NC}"
echo -e "Image: $FULL_IMAGE_NAME"

# Pull the Docker image
echo -e "${YELLOW}Pulling Docker image...${NC}"
docker pull $FULL_IMAGE_NAME

# Stop and remove existing container
echo -e "${YELLOW}Stopping existing container...${NC}"
docker stop classconnect-app || true
docker rm classconnect-app || true

# Set environment-specific variables
if [ "$ENVIRONMENT" == "production" ]; then
    PORT=5000
    ENV_FILE="production.env"
else
    PORT=5001
    ENV_FILE="staging.env"
fi

# Run the new container
echo -e "${YELLOW}Starting new container...${NC}"
docker run -d \
    --name classconnect-app \
    -p $PORT:5000 \
    --restart unless-stopped \
    --env-file $ENV_FILE \
    $FULL_IMAGE_NAME

# Verify deployment
echo -e "${YELLOW}Verifying deployment...${NC}"
sleep 5
HEALTH_CHECK=$(curl -s http://localhost:$PORT/health)

if [[ $HEALTH_CHECK == *"status\":\"ok"* ]]; then
    echo -e "${GREEN}Deployment successful!${NC}"
    echo -e "Application is running at http://localhost:$PORT"
else
    echo -e "${RED}Deployment verification failed!${NC}"
    echo -e "Health check did not return expected status"
    echo -e "Response: $HEALTH_CHECK"
    exit 1
fi

# Cleanup
echo -e "${YELLOW}Cleaning up old images...${NC}"
docker image prune -f

echo -e "${GREEN}Deployment to $ENVIRONMENT completed successfully.${NC}"