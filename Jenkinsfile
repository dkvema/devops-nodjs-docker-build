def appName='nodejs-docker'
def app
def versiontag
def dockerImageName
def MAJOR_VERSION="1"
def ARTIFACT_VERSION="${MAJOR_VERSION}.${BUILD_NUMBER}"
 environment { 
     registry = "devendravemadevops/nodejs-docker"
     //registryCredential = 'dockerhubrepository' 
     dockerImage = ''
    }
def getGitCommitHash(){
    def result =sh(returnStdout:true,script:'git rev-parse--short HEAD'.trim())
    return result
}
def generateVersionTag(){
    def gitCommitHash=getGitCommitHash() 
    versionTag= ${env.BRANCH_NAME} + ${env.BUILD_NUMBER} + "-"+gitCommitHash
    return versionTag
    
    
}
pipeline {
    agent any
    
     options {
        
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
      }
     tools {nodejs "NodeJS"}
    
    stages{
        stage('Clone the repository') {
            steps{
                echo sh(script: 'env|sort', returnStdout: true)
                echo 'cloning the respository..'
                echo " build version: ${MAJOR_VERSION}.${env.BUILD_ID}"
                  echo "code commited from repository APPName:${appName}"
              checkout scm
              }
           } 
      stage('NPM install') {
            steps{
                sh 'npm install' 
                sh 'npm install dotenv' 
            }
        }
       stage('test') {
            steps{
               echo 'Testing..'
              sh 'npm test'
            }
        } 
        
        stage('Docker build') {
            steps{
                    echo "docker build...."
             
               script {
             
                  sh "docker build -t ${appName}:v1.0.0  . "
              
            }
            }
        }  
     
     stage('Docker Tagginng') {
            steps{
                    echo "docker Tagging...."
             
               script {
                  // sh "export GIT_COMMIT=$(git log -1 --format=%h)"
                      app  =  sh "docker  tag ${appName}:v1.0.0   devendravemadevops/nodejs-docker:v1.0.0-${env.BUILD_ID} "
              
            }
            }
        }  
     
        stage('upload image to dockerhub') {
            steps{
             script{
               https://hub.docker.com/repository/docker/devendravemadevops/nodejs-docker
                docker.withRegistry('https://hub.docker.com/repository/docker/devendravemadevops/nodejs-docker','dockerhubrepository') 
                          //docker.withRegistry('https://registry.hub.docker.com','dockerhubrepository') 
                        { 
                          sh "docker push devendravemadevops/nodejs-docker:v1.0.0-${env.BUILD_ID} "
                           echo "docker push...."
                        }
             }
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
            steps{
                  script{
                        if("${env.BRANCH_NAME}"=='release'){
                              echo "This is release branch"
                               //sh "docker container run -e environment=dev -itd --name ${appName} -p 3000"
                                sh "docker run --env environment=test -dp 8097:3000 nodejs-docker-app:V2"
                               echo 'Docker running....+${env.BRANCH_NAME}'
                               }
                        if("${env.BRANCH_NAME}"=='main'){
                              echo "This is  master branch"
                            sh "docker run --env environment=dev -dp 8096:3001 nodejs-docker-app:V2"
                              // sh  "docker container run -e environment=test -itd --name ${appName} -p 3000"
                               echo 'Docker running....+${env.BRANCH_NAME}'
                      }
                   }
                 }
               }  
          
      }

    }
    
