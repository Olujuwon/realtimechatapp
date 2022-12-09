pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
      }
      environment {
        IMAGE_NAME = 'olujuwon/real-time-chat-app'
        IMAGE_TAG = 'latest'
        APP_NAME = 'real-time-chat-app'
      }

    stages {
        stage('Env info') {
            steps {
                sh 'git --version'
                echo "Branch: ${env.BRANCH_NAME}"
                sh 'docker -v'
                sh 'printenv'
            }
        }
        stage('Build docker image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG  --no-cache .'
            }
        }
        stage('Test docker image') {
            steps {
                sh 'docker run --rm $IMAGE_NAME'
            }
        }
        stage('Clean up docker image') {
            steps {
                sh 'docker rmi $IMAGE_NAME'
            }
        }
        stage('Deploy to registry') {
            steps {
                sh 'docker build -t $APP_NAME --no-cache .'
                sh 'docker tag $APP_NAME localhost:5000/$APP_NAME'
                sh 'docker push localhost:5000/$APP_NAME'
                sh 'docker rmi -f $APP_NAME localhost:5000/$APP_NAME'
            }
        }
        stage('Cypress test') {
            steps {
                echo 'Testing... with cypress'
            }
        }
        stage('Release') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}