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
    versionTag=${env.BUILD_NUMBER} + "-"+gitCommitHash
    return versionTag
    
    
}
pipeline {
    agent any
    
    environment{
       dockerImage=''
        registry='devendravemadevops/nodejs'
        
    }
    
     options {
        
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    

      tools {nodejs "NodeJS"}

    stages {
        stage('Clone the repository') {
            steps {
                echo 'cloning the respository..'
                echo " build version: ${MAJOR_VERSION}.${env.BUILD_ID}"
                  echo "APPName:${appName}"
                 
             
              checkout scm
            }
        }
         stage('NPM install') { 
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
     
        stage('Docker build') {
            steps {
                echo 'docker build....'
                dockerImage=docker.build registry
               // docker image 
            //  sh   'docker build -t nodejs-docker . '
              //  dockerImageName=buildDockerImage(app:appName,tag:versionTag)
               // echo "Image Name returned to Jenkins File :${dockerImageName}"
            }
        }
        
        stage('Docker run') {
            steps {
                script{
                    dockerImage.run("-p 8096:3000 --rm --name nodejs-docker")
                }
                echo 'Docker running....'
            }
        }
    }
}
