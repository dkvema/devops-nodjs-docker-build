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
    }    stage('Build Docker Image') 
                    {
                            steps {
      
                        echo "docker build...."
                        sh   "docker build -t ${appName}:V2 . "
                
                         //** Below line will be used while tag with versioning and been used while uploading  image to docker repository and while deploying the same.
                        //  sh "docker tag ${appName}:latest ${IMAGE_REPO}/${appName}:${VERSION}"
            
                   }
        }
        
     stage('Docker run'){
       steps{
           
              if("${env.BRANCH_NAME}"=='release'){
                        echo "This is release branch"

                   script{
                          
                        sudo "docker container run -e environment=dev -itd --name ${appName} -p 3000 "
                    }
                             echo 'Docker running....'
                }
               if("${env.BRANCH_NAME}"=='master'){
                        echo "This is release branch"

                   script{
                          
                        sudo "docker container run -e environment=dev -itd --name ${appName} -p 3000 "
                    }
                             echo 'Docker running....'
                }
              
             }
                        
           }
      
       
        
        
        //***** The below piece of code will be  used to push the image to docker hub
        
      // stage('Push Docker Image'){
       // withCredentials([string(credentialsId: 'DOKCER_HUB_PASSWORD', variable: 'DOKCER_HUB_PASSWORD')]) {
        //  sh "docker login -u {dockerId} -p ${DOKCER_HUB_PASSWORD}"
        //}
       // sh 'docker push {dockerId}/{projectName}:${BUILD_NUMBER}'
      //}
  
       
    }
}
