# Jenkins Setup for ClassConnect

This document provides instructions for setting up Jenkins to run the ClassConnect CI/CD pipeline.

## Prerequisites

- Jenkins server (version 2.303.3 or newer)
- Docker installed on Jenkins server
- Docker pipeline plugin installed in Jenkins
- Access to GitHub repository
- Access to Docker registry

## Jenkins Installation

If you don't have Jenkins installed yet:

```bash
# Install Java (required for Jenkins)
sudo apt update
sudo apt install openjdk-11-jdk

# Add Jenkins repository
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'

# Install Jenkins
sudo apt update
sudo apt install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

## Required Jenkins Plugins

Install the following plugins via Jenkins Plugin Manager:
- Docker Pipeline
- Pipeline
- Git
- Credentials Binding
- Blue Ocean (optional, for better UI)
- Slack Notification (if using Slack for notifications)

## Jenkins Configuration

### 1. Create Credentials

In Jenkins, navigate to Manage Jenkins > Credentials > System > Global credentials:

1. **Docker Registry Credentials**
   - Kind: Username with password
   - ID: docker-registry-credentials
   - Description: Docker Registry Credentials
   - Username: [your-docker-username]
   - Password: [your-docker-password]

2. **SSH Keys for Deployment**
   - Kind: SSH Username with private key
   - ID: deployment-ssh-key
   - Description: Deployment SSH Key
   - Username: [ssh-username]
   - Private Key: [private-key-contents]

### 2. Create a Jenkins Pipeline

1. From Jenkins dashboard, click "New Item"
2. Enter "ClassConnect-Pipeline" as name
3. Select "Pipeline" as type
4. Click "OK"
5. Configure the pipeline:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: [your-git-repository-url]
   - Credentials: [select appropriate git credentials]
   - Branch Specifier: */main
   - Script Path: Jenkinsfile
6. Under "Build Triggers", select "GitHub hook trigger for GITScm polling"
7. Click "Save"

### 3. Configure Environment Variables

In the pipeline configuration:

1. Click "This project is parameterized"
2. Add the following parameters:
   - DOCKER_REGISTRY (String): [your-docker-registry]
   - DOCKER_IMAGE (String): classconnect
   - DEPLOY_TO_PRODUCTION (Boolean): default false

### 4. Set up GitHub Webhook

In your GitHub repository:

1. Go to Settings > Webhooks
2. Add webhook:
   - Payload URL: https://[jenkins-url]/github-webhook/
   - Content type: application/json
   - Select "Just the push event"
   - Click "Add webhook"

## Testing the Setup

1. Make a small change to the repository
2. Push to GitHub
3. Verify that Jenkins automatically triggers the pipeline
4. Check pipeline logs for any issues

## Troubleshooting

### Pipeline fails to start

- Check GitHub webhook configuration
- Verify Jenkins has network access to GitHub
- Check Jenkins log for errors

### Docker build fails

- Ensure Docker is running on Jenkins server
- Verify Jenkins user has permission to run Docker
- Add Jenkins user to Docker group:
  ```bash
  sudo usermod -aG docker jenkins
  sudo systemctl restart jenkins
  ```

### Deployment fails

- Check SSH key permissions
- Verify target server is accessible
- Check environment variables in Jenkins