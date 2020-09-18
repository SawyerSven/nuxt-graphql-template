FROM  node:9-alpine
RUN mkdir /opt/project -p
WORKDIR  /opt/project
ADD  ./ /opt/project 
RUN  cd /opt/project/ && npm config set @baozun:registry http://npm.baozun.com:7001
RUN  cd /opt/project/ && rm -rf node_modules && rm -rf package-lock.json && npm install 
RUN  cd /opt/project/staff/  &&   rm -rf node_modules && rm -rf package-lock.json && npm install 
RUN  cd /opt/project/staff/ && npm run publish && npm run alioss
RUN  cd /opt/project/resource/sites/88000204/latest/ && npm install --only=prod --no-package-lock
EXPOSE 8080

