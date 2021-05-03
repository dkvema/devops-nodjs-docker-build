pipeline {
    agent any
    
      tools {nodejs "node"}

    stages {
        stage('clone the repository') {
            steps {
                echo 'cloning the respository..'
              checkout scm
            }
        }
         stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
