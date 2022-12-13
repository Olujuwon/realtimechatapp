pipeline {
    agent {
        node {
            label 'docker-agent-alpine'
            }
      }
      environment {
              IMAGE_NAME = 'olujuwon/real-time-chat-app'
              IMAGE_TAG = 'latest'
              APP_NAME = 'real-time-chat-app'
            }
    stages {
        stage('Environment info') {
            steps {
               sh 'git --version'
               echo "Branch: ${env.BRANCH_NAME}"
               script {
                  dockerVersion = docker.version
                  }
               echo "Docker Version: ${env.dockerVersion}"
               sh 'printenv'
            }
            }
        stage('Build') {
            steps {
                echo "Building Docker image now ..."
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG  --no-cache .'
                echo "Docker image built."
            }
        }
        stage('Test') {
            steps {
                echo "Testing docker image now ..."
                sh 'docker run --rm $IMAGE_NAME'
                echo "Docker images test completed successfully."
                echo 'Cleaning up docker test build now ...'
                sh 'docker rmi $IMAGE_NAME'
                echo "Testing successful."
                echo 'Deploying to docker registry now ...'
                sh 'docker build -t $APP_NAME --no-cache .'
                sh 'docker tag $APP_NAME localhost:5000/$APP_NAME'
                sh 'docker push localhost:5000/$APP_NAME'
                sh 'docker rmi -f $APP_NAME localhost:5000/$APP_NAME'
                echo 'Cypress testing happens here...'
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}