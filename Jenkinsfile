def appName='nodejs-docker-app'
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
    
     
      
    
     options {
        
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    

      tools {nodejs "NodeJS"}
    


    stages {
        
       
        stage('Clone the repository') {
            steps {
                echo sh(script: 'env|sort', returnStdout: true)
                echo 'cloning the respository..'
                echo " build version: ${MAJOR_VERSION}.${env.BUILD_ID}"
                  echo "APPName:${appName}"
              checkout scm
               // echo 'branch_nem'
            }
            
            
        }
         stage('NPM install') { 
            steps {
                sh 'npm install' 
                sh 'npm install dotenv' 
            }
        }

        stage('Test') {
      steps {
          echo 'Testing..'
         sh 'npm test'
      }
      stage('Build Docker Image') 
                    {
                            steps {
      
                        echo "docker build...."
                        sh   "docker build -t ${appName}:V2 . "
                
                         //** Below line will be used while tag with versioning and been used while uploading  image to docker repository and while deploying the same.
                        //  sh "docker tag ${appName}:latest ${IMAGE_REPO}/${appName}:${VERSION}"
            
                   }
        }
        
                 stage('data Loading'){
            steps{
                script{
                    if("${env.BRANCH_NAME}"=='release')
                    {
                        
                         echo "This is release branch"
                       stage('Docker run') {
                     steps {
                      s cript{
                    
                         sudo "docker container run -itd --name ${appName} -p 3000 "
                         //sudo "docker container run -itd --name ${appName}:$env.BUILD_TAG -p 3000 "
                        // sudo  docker container run -itd --name  nodejs-docker:$env.BUILD_NUMBER  -p 3000 
                       // docker run ("-p 8096:3000 --rm --name nodejs-docker")
                       //  docker run -p 8096:3000 nodejs-docker
                }
                echo 'Docker running....'
            }
        }
                        
                       }
                    if("${env.BRANCH_NAME}"=='main'){
                            echo "This is release branch"
                         //   env.DATA_FILE= "Questions-test.json"
                        
                    }
                    
                  //  echo "DATA_FILE_VALUE=${env.DATA_FILE}"
                    echo "BRANCH_NAME=${env.BRANCH_NAME}"
                }
            }
        }
     
       
        
        
        //*** The below piece of code will be  used to push the image to docker hub
        
      // stage('Push Docker Image'){
       // withCredentials([string(credentialsId: 'DOKCER_HUB_PASSWORD', variable: 'DOKCER_HUB_PASSWORD')]) {
        //  sh "docker login -u {dockerId} -p ${DOKCER_HUB_PASSWORD}"
        //}
       // sh 'docker push {dockerId}/{projectName}:${BUILD_NUMBER}'
      //}
  
       
    }
}
