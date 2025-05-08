# ClassConnect CI/CD Pipeline

This repository contains the CI/CD pipeline configuration for the ClassConnect application using Docker and Jenkins.

## Overview

The CI/CD pipeline automates the following process:
- Code quality checks
- Testing
- Building
- Containerization
- Deployment to staging and production environments

## Repository Structure

- `Dockerfile`: Defines the container image for the application
- `docker-compose.yml`: Configuration for local development with Docker Compose
- `Jenkinsfile`: Defines the CI/CD pipeline for Jenkins
- `jenkins-setup.md`: Detailed instructions for setting up Jenkins
- `docker-dev.sh`: Helper script for Docker operations
- `.dockerignore`: Specifies files to exclude from Docker images

## Getting Started

### Local Development with Docker

1. **Build the Docker image**:
   ```
   ./docker-dev.sh build
   ```

2. **Run the application in development mode**:
   ```
   ./docker-dev.sh run
   ```

3. **Start all services with Docker Compose**:
   ```
   ./docker-dev.sh up
   ```

4. **Stop all services**:
   ```
   ./docker-dev.sh down
   ```

### CI/CD Pipeline Setup

1. Follow the instructions in `jenkins-setup.md` to set up Jenkins.
2. Configure Jenkins credentials for Docker registry and deployment servers.
3. Create a Jenkins pipeline job pointing to the repository.

## Pipeline Workflow

The CI/CD pipeline consists of the following stages:

1. **Install**: Install Node.js dependencies
2. **Lint**: Check code quality
3. **Test**: Run automated tests
4. **Build**: Build the application
5. **Docker Build**: Create a Docker image
6. **Docker Push**: Push the image to the registry (main branch only)
7. **Deploy to Staging**: Automatically deploy to staging (main branch only)
8. **Deploy to Production**: Deploy to production after manual approval (main branch only)

## Deployment

### Staging Deployment

Staging deployment happens automatically when changes are pushed to the main branch.

### Production Deployment

Production deployment requires manual approval in the Jenkins interface:

1. Navigate to the running pipeline in Jenkins
2. When prompted, click "Deploy" to approve the production deployment

## Best Practices

- Always write and run tests before pushing code
- Follow the GitFlow workflow (feature branches, pull requests)
- Add proper documentation for new features
- Update the Jenkinsfile when the build process changes

## Troubleshooting

If you encounter issues with the pipeline:

- Check Jenkins logs for detailed error messages
- Verify Docker is running correctly
- Ensure SSH keys are properly configured for deployment
- Check network connectivity between Jenkins and deployment servers

## Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)