pipeline {
    agent any

    environment {
        APP_IMAGE_NAME = 'campusfix-web:latest'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('1. Checkout Source') {
            steps {
                echo 'Pulling latest code from Git repository...'
                checkout scm
            }
        }

        stage('2. Build Test Container & Execute Pytests') {
            steps {
                echo 'Building test container and executing 10 unit tests...'
                sh 'docker build --target tester -t campusfix-tester .'
                sh 'docker run --rm -v $(pwd):/app/reports campusfix-tester pytest -v --junitxml=/app/reports/junit-report.xml'
            }
            post {
                always {
                    junit 'junit-report.xml'
                }
            }
        }

        stage('3. Build Production Multi-Stage Image') {
            steps {
                echo 'Building lightweight, hardened production image...'
                sh 'docker build --target runner -t ${APP_IMAGE_NAME} .'
            }
        }

        stage('4. Deploy via Docker Compose') {
            steps {
                echo 'Deploying CampusFix multi-container stack (Flask + PostgreSQL)...'
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build db web'
            }
        }

        stage('5. Automated Smoke Test (/health)') {
            steps {
                echo 'Waiting for application to warm up and verifying /health endpoint...'
                sh '''
                    for i in 1 2 3 4 5; do
                        STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health || true)
                        if [ "$STATUS" = "200" ]; then
                            echo "Application healthy and smoke test passed with HTTP 200!"
                            exit 0
                        fi
                        echo "Waiting for service to become healthy... attempt $i"
                        sleep 3
                    done
                    echo "Smoke test failed: /health did not return HTTP 200"
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 CampusFix CI/CD Pipeline executed successfully! Deployment verified.'
        }
        failure {
            echo '❌ Pipeline failed! Please inspect logs and test reports.'
        }
    }
}
