# Jenkins CI/CD Setup Guide for ClassConnect

This guide explains how to set up Jenkins CI/CD pipeline for the ClassConnect application.

## Prerequisites

- Jenkins server installed and running
- Docker installed on the Jenkins server
- Access to a Docker registry (Docker Hub, AWS ECR, etc.)
- SSH access to staging and production servers

## Jenkins Setup

1. **Install Required Plugins**:
   - Docker Pipeline
   - Docker
   - Pipeline
   - Git
   - Credentials Binding

2. **Configure Credentials**:
   - Add Docker registry credentials
   - Add SSH credentials for deployment servers

3. **Create a New Pipeline Job**:
   - Go to Jenkins Dashboard
   - Click "New Item"
   - Enter a name (e.g., "ClassConnect-Pipeline")
   - Select "Pipeline" and click "OK"

4. **Configure Pipeline**:
   - Under Pipeline section, select "Pipeline script from SCM"
   - Select "Git" as SCM
   - Enter the repository URL
   - Set the branch to build (e.g., "*/main")
   - Set Script Path to "Jenkinsfile"

5. **Set Pipeline Parameters**:
   - Add a boolean parameter named "DEPLOY_TO_PRODUCTION" with default value set to false

## Docker Registry Setup

1. Create an account on Docker Hub or set up a private registry
2. Create a repository for ClassConnect
3. Add the registry credentials to Jenkins

## Deployment Servers Configuration

### Staging Server

1. Install Docker
2. Set up SSH access for Jenkins
3. Create a deployment directory

### Production Server

1. Install Docker
2. Set up SSH access for Jenkins
3. Create a deployment directory

## Pipeline Workflow

The CI/CD pipeline performs the following steps:

1. **Install**: Install Node.js dependencies
2. **Lint**: Run code quality checks
3. **Test**: Run automated tests
4. **Build**: Build the application
5. **Docker Build**: Create a Docker image
6. **Docker Push**: Push the image to the registry (main branch only)
7. **Deploy to Staging**: Deploy to staging environment (main branch only)
8. **Deploy to Production**: Deploy to production after manual approval (main branch only)

## Customizing the Pipeline

To customize the pipeline for your specific needs:

1. Edit the Jenkinsfile
2. Update environment variables for your Docker registry
3. Modify deployment steps for your server configuration
4. Add additional stages as needed (e.g., security scanning, performance testing)

## Troubleshooting

If you encounter issues with the pipeline:

1. Check Jenkins console output for error messages
2. Verify credentials are correctly configured
3. Ensure Jenkins has proper permissions to access Docker
4. Check network connectivity between Jenkins and deployment servers