pipeline {
    agent any
    
      tools {nodejs "NodeJS"}

    stages {
        stage('clone the repository') {
            steps {
                echo 'cloning the respository..'
              checkout scm
            }
        }
         stage('npm install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
      steps {
          echo 'Testing..'
         sh 'npm test'
      }
    }   
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
