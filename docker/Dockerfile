FROM ic-harbor.baozun.com/ic/alpine-node10:v1.1

ENV HOST 0.0.0.0

ENV NODE_ENV=production

RUN mkdir /opt/project -p

WORKDIR /opt/project

ADD  .nuxt /opt/project/.nuxt

ADD package.json /opt/project

ADD yarn.lock /opt/project

ADD src/static /opt/project/static

RUN yarn config set registry https://registry.npm.taobao.org

RUN yarn install

EXPOSE 8081

RUN ls

RUN chown -R vmuser. /opt
USER vmuser

CMD ["yarn", "start"]