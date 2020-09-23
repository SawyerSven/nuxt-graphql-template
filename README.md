# 布雷博官网-前端


## 基础环境

### 分支

- #### develop - uat环境
- #### release - sandbox环境
- #### master - 生产环境

### 环境

- #### uat
- #### sandbox 
- #### prod
---

## 命令说明

- dev:[env] 启动请求地址为对应环境的开发, dev命令默认执行dev:uat命令
- build:[env] 启构建对应地址的dist文件
- start 启动构建后的项目
- generate 生成项目的静态页面
- lint 通过eslint对项目进行检查
- test jest单元测试(暂未使用)

---

## 开发流程

### 分支

> 远程分支在无特殊情况下，只保留master/release/develop用于发布的分支。

**开发仅从develop分支拉取开发分支，开发完毕后发布遵守"上游优先[1]"原则**

分支按照由上游到下游的顺序依次为：develop/release/master 三个分支

按照仅能从上游->下游的方式进行变动和发布。添加新的feature或fixbug按照: feature/fix done -> 合并至develop分支发布测试通过 -> 合并release分支发布测试通过 -> 合并发布master分支


```bash
# 依赖安装
cd brembo-front && yarn install

# 启动开发环境
yarn dev

# port:8081
```


For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

---

## 项目发布

### 发布uat

- 本地代码合并到develop分支
- push代码
- 登陆[小蜜蜂](http://bee.baozun.com)
- 【蜜蜂自动化发布平台】>【应用管理】>【应用服务】> 【项目：brembo，应用服务名：front】 >【构建任务：develop 分支】>【立即构建】
- 构建成功后：【快速发布】> 【容器发布，uat】> 【确定】> 【详情，执行】
- 访问地址:[https://brembo-uat.baozun.com/](https://brembo-uat.baozun.com/)

### 发布sandbox

- cherry-pick或合并代码到release分支
- push代码
- 【蜜蜂自动化发布平台】>【应用管理】>【应用服务】> 【项目：brembo，应用服务名：front】 >【构建任务：release 分支】>【立即构建】
- 构建成功后：【快速发布】> 【容器发布，sandbox】> 填写发布原因 > 【确定】> 【等待工单审批后】 > 【发布任务】 > 【环境:sandbox】 > 【详情，执行】
- 访问地址:[https://brembo-sandbox.baozun.com/](https://brembo-sandbox.baozun.com/
  

---
## 附录

### [1] - 上游优先原则 upstream first

参考：[gitlab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html#production-branch-with-gitlab-flow)


### devtools

[Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)