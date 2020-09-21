def private_npm = 'https://registry.npm.taobao.org'
def baozun_npm = 'http://npm.baozun.com:7001'
def image_tag = "${BRANCH_NAME}"

pipeline {
     agent {
        node {
          label "slave-node02"
        }
     }

  environment {
    USER_EMAIL = "siyuan.sun1@baozun.com"  //发送邮件的地址（一般为项目owner，按实际修改）
    USER = "siyuan.sun"  //发送邮件的邮箱前缀（一般为项目owner，按实际修改）
    SFTP_SECRET_ACCESS_KEY = credentials('jenkins-sftp-secret-access-key')  //SFTP的秘钥（发包使用，无需修改）
    SFTP_SERVER = "10.101.6.87"  //SFTP的地址（发包使用，无需修改）
    VALIDATE_URL = "http://bee-backend.baozun.com/ci_validate/"  //SFTP的地址（发包使用，无需修改）
    REMOTE_DIR = "/upload"  //SFTP的目录（发包使用，无需修改）
    LOCAL_DIR= "$WORKSPACE/	brembo-frontend"  //生成包的位置，其中$WORKSPACE不需要修改，ecs-ofa-service-impl/target按照实际的应用目录填写
    PACKAGE_NAME = "brembo-frontend-web"  //需要发布的包名，按实际修改，dubbo包名写.tar.gz包，tomcat包名写war包，springboot包名写jar包
    PROJECT_NAME = "brembo" //项目名，按实际修改
    APP_NAME = "frontend"  //应用名，按实际修改，如有多个，在括号内添加，以空格间隔(例如"ofa-service-a ofa-service-b ofa-service-c")
    ENV_NAME = "prod"  //发布的环境，根据自己有几个环境进行删减，但是环境名就这四个
    HARBOR_ADDR = "ic-harbor.baozun.com"  //Harbor地址，无需修改
    DOCKER_NAME = "./docker/Dockerfile"  //Dockerfile文件位置，如有多个，在括号内添加，以空格间隔，顺序按照APP_NAME一样(例如"ecs-ofa-service-impl-a/docker/Dockerfile-ecs ecs-ofa-service-impl-a/docker/Dockerfile-ecs ecs-ofa-service-impl-c/docker/Dockerfile-ecs")
    JDK_VERSION="jdk1.8" //默认mvn 编译会使用jdk1.8进行编译,如果使用jdk1.7请将此项修改为：jdk1.7
    COVERAGE = "0"  //单元测试覆盖率，标准为50,新接入应用可适当降低
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))  //保留历史记录，无需修改
  }

  //pipeline运行结果通知给触发者，无需修改
  post {
    success {
      script {
        wrap([$class: 'BuildUser']) {
          emailext body: '$DEFAULT_CONTENT', recipientProviders: [developers()], mimeType: 'text/html', subject: '$DEFAULT_SUBJECT', to: "$USER_EMAIL"
        }
      }
    }
    failure {
      script {
        wrap([$class: 'BuildUser']) {
          emailext body: '$DEFAULT_CONTENT', recipientProviders: [developers()], mimeType: 'text/html', subject: '$DEFAULT_SUBJECT', to: "$USER_EMAIL"
        }
      }

    }
    unstable {
      script {
        wrap([$class: 'BuildUser']) {
          emailext body: '$DEFAULT_CONTENT', recipientProviders: [developers()], mimeType: 'text/html', subject: '$DEFAULT_SUBJECT', to: "$USER_EMAIL"
        }
      }
    }
    aborted {
      script {
        wrap([$class: 'BuildUser']) {
          emailext body: '$DEFAULT_CONTENT', recipientProviders: [developers()], mimeType: 'text/html', subject: '$DEFAULT_SUBJECT', to: "$USER_EMAIL"
        }
      }
    }
  }

	stages {
    stage('静态检查') {
      steps {
        checkout scm
        sh """

        """
      }
    }
    stage('Prepare Dependencies') {
      steps {
        checkout scm
        sh """
          yarn config set registry ${private_npm}
          yarn config set @baozun:registry ${baozun_npm}
          export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
          yarn install
          yarn build
        """
      }
    }
		stage('上传镜像') {
      when { anyOf{branch 'develop';branch 'master'; branch 'release'} }
      steps {
        timeout(time: 20, unit: 'MINUTES') {
          sh '''
          appname=()
          dockername=()
          envname=()
          for app in $APP_NAME;do
              appname=(${appname[@]} $app)
          done
          for docker in $DOCKER_NAME;do
              dockername=(${dockername[@]} $docker)
          done
          for e_name in $ENV_NAME;do
              envname=(${envname[@]} $e_name)
          done
          appname_len=${#appname[@]}
          envname_len=${#envname[@]}
          echo " ${dockername[0]}"
          for ((i = 0; i < appname_len; i++));do
            for ((j = 0; j < envname_len; j++));do
              docker images  --filter="reference=${HARBOR_ADDR}/${envname[$j]}/${PROJECT_NAME}_${appname[$i]}:*" -q | xargs --no-run-if-empty docker rmi --force
              docker build --no-cache -t ${HARBOR_ADDR}/${envname[$j]}/${PROJECT_NAME}_${appname[$i]}:${GIT_COMMIT:0:7} -f  ${dockername[$i]} ./
              docker tag ${HARBOR_ADDR}/${envname[$j]}/${PROJECT_NAME}_${appname[$i]}:${GIT_COMMIT:0:7} ${HARBOR_ADDR}/${envname[$j]}/${PROJECT_NAME}_${appname[$i]}:${GIT_COMMIT:0:7}
              docker push ${HARBOR_ADDR}/${envname[$j]}/${PROJECT_NAME}_${appname[$i]}:${GIT_COMMIT:0:7}
            done
          done
          '''
        }
      }
    }
  }
}
