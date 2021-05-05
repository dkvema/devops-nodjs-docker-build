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
        registry='devendravemadevops/nodejs-docker'
        BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
        
    }
    
     options {
        
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    

      tools {nodejs "NodeJS"}
    


    stages {
        
        stage('data Loading'){
            steps{
                script{
                    if("${GIT_BRANCH}"=='release'){
                        echo "This is release branch"
                        env.DATA_FILE='question.json'
                        
                       }
                    if("${GIT_BRANCH}"=='main'){
                            echo "This is release branch"
                            env.DATA_FILE='Questions-test.json'
                        
                    }
                    
                    echo "DATA_FILE_VALUE=${env.DATA_FILE}"
                }
            }
        }
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
      
                echo "docker build...."
                sh   'docker build -t nodejs-docker . '
                
            
            }
        }
        
        stage('Docker stop container') {
            steps {
                
                 echo 'docker stop container'
                //  sh   'docker stop $(docker ps -aq)'
                
               sh   'docker ps -f name=nodejs-docker -q |xargs --no-run-if-empty docker container stop'
              sh 'docker container ls -a -fname=nodejs-docker -q | xargs -r docker container rm'
            
            }
        }
        
        stage('Docker run') {
            steps {
                script{
                    docker run("-p 8096:3000 --rm --name nodejs-docker")
                }
                echo 'Docker running....'
            }
        }
    }
}
