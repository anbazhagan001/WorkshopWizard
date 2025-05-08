# ClassConnect CI/CD Pipeline Documentation

This document provides an overview of the CI/CD pipeline setup for the ClassConnect project. It outlines the tools, configurations, and processes used to automate building, testing, and deploying the application.

## Overview

The ClassConnect CI/CD pipeline automates the following processes:
- Code quality checks (linting)
- Unit and integration testing
- Building the application
- Containerization
- Deployment to staging/production environments
- Health monitoring

## CI/CD Infrastructure

The project supports two CI/CD options:

### 1. Jenkins Pipeline

Located in `Jenkinsfile`, this pipeline:
- Runs on Jenkins server
- Builds and tests the application
- Creates Docker images
- Deploys to staging automatically
- Deploys to production with manual approval

**Requirements:**
- Jenkins server with Docker support
- Docker registry credentials
- SSH access to deployment servers

### 2. GitHub Actions Workflow

Located in `.github/workflows/ci-cd.yml`, this workflow:
- Runs on GitHub's infrastructure
- Builds and tests the application
- Creates Docker images
- Deploys to staging/production based on branch

**Requirements:**
- GitHub repository with Actions enabled
- Docker Hub credentials (stored as GitHub Secrets)
- SSH keys for deployment (stored as GitHub Secrets)

## Local Development Testing

To test the pipeline components locally:

```bash
# Run tests
./ci-cd-scripts.sh test

# Run the full CI sequence
./ci-cd-scripts.sh ci
```

## Deployment Process

The deployment can be triggered:
1. Automatically via CI/CD pipeline
2. Manually using the deployment script

```bash
# Manual deployment to staging
./deploy.sh staging v1.0.0

# Manual deployment to production
./deploy.sh production v1.0.0
```

## Monitoring

Application health is monitored using the configuration in `monitoring-config.yml`:
- Regular health checks on `/health` endpoint
- API endpoint monitoring
- Alert notifications via email and Slack

## Docker Configuration

Docker settings are defined in:
- `Dockerfile`: Application container definition
- `docker-compose.yml`: Multi-container setup for development

## Environment Configuration

Environment-specific settings:
- Development: Local environment variables
- Staging: `staging.env` file (copied from `staging.env.example`)
- Production: `production.env` file (managed securely)

## Security Considerations

- Secrets are never committed to the repository
- Production credentials are managed in CI/CD systems
- Deployment servers use restricted access

## Troubleshooting

If deployments fail:
1. Check application logs: `docker logs classconnect-app`
2. Verify health check endpoint: `curl http://localhost:5000/health`
3. Review CI/CD pipeline logs in Jenkins or GitHub Actions

## Rollback Procedure

To rollback to a previous version:

```bash
# Rollback to previous version
./deploy.sh production v0.9.0
```