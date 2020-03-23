pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
  }
    environment { 
        CI = 'true'
    }
  stages {

    stage('Test') {
      steps {
        echo 'Testing..'
        yarn test
      }
    }

    stage('Build') {
      steps {
        echo 'Building....'
        yarn build
      }
    }

  }
}