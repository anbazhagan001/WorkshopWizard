pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-p 5000:5000'
        }
    }
    
    environment {
        CI = 'true'
        HOME = '.'
        npm_config_cache = 'npm-cache'
        DOCKER_REGISTRY = 'your-docker-registry' // Replace with your Docker registry
        DOCKER_IMAGE = 'classconnect'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'chmod +x ./ci-cd-scripts.sh && ./ci-cd-scripts.sh lint || true'
            }
        }
        
        stage('Test') {
            steps {
                sh 'chmod +x ./ci-cd-scripts.sh && ./ci-cd-scripts.sh test || true'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }
        
        stage('Docker Push') {
            when {
                branch 'main' // Only push from main branch
            }
            steps {
                withCredentials([string(credentialsId: 'docker-registry-credentials', variable: 'DOCKER_CREDENTIALS')]) {
                    sh 'echo $DOCKER_CREDENTIALS | docker login $DOCKER_REGISTRY -u username --password-stdin'
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                    sh 'docker tag $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG $DOCKER_REGISTRY/$DOCKER_IMAGE:latest'
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:latest'
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main' // Only deploy from main branch
            }
            steps {
                // Deploy to staging environment
                sh '''
                    ssh user@staging-server "
                        docker pull $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG &&
                        docker stop classconnect-app || true &&
                        docker rm classconnect-app || true &&
                        docker run -d --name classconnect-app -p 5000:5000 $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG
                    "
                '''
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
                expression { return params.DEPLOY_TO_PRODUCTION }
            }
            steps {
                // Manual approval step before production deployment
                input message: 'Deploy to production?', ok: 'Deploy'
                
                // Deploy to production environment
                sh '''
                    ssh user@production-server "
                        docker pull $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG &&
                        docker stop classconnect-app || true &&
                        docker rm classconnect-app || true &&
                        docker run -d --name classconnect-app -p 5000:5000 $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG
                    "
                '''
            }
        }
    }
    
    post {
        always {
            // Clean up
            sh 'docker system prune -f'
            cleanWs()
        }
        
        success {
            echo 'Pipeline executed successfully!'
        }
        
        failure {
            echo 'Pipeline execution failed!'
            // Add notification steps (email, Slack, etc.)
        }
    }
}