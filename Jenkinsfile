def appName='nodejs-public-app'
def versiontag
def dockerImageName
def MAJOR_VERSION="1"
def ARTIFACT_VERSION="${MAJOR_VERSION}.${BUILD_NUMBER}"
def getGitCommitHash(){
    def result =sh(returnStdout:true,script:'git rev-parse--short HEAD'.trim())
    return result
}
def generateVersionTag(){
    def gitCommitHash=getGitCommitHash() 
    versionTag=env.BUILD_NUMBER + "-"+gitCommitHash
    return versionTag
    
    
}
                       

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
        
        stage(' node build') {   
      steps {
          
          echo 'build..'
      
         sh 'npm --version'
         
      }
    }   
        stage('docker build') {
            steps {
                echo 'docker build....'
            }
        }
    }
}
