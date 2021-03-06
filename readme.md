# next-tpl

开箱即用的 nextjs 模板，集成 antd 按需加载、集成 axios 接口、集成 react-redux、集成 docker。

> 企业版包含部分授权业务代码未开源

# docker

```bash
# 发布
sh /home/saber2pr/next-tpl/scripts/publish.sh testing

# 运行指定镜像
sh /home/saber2pr/next-tpl/scripts/run.sh <tag>

# 打包镜像
sh /home/saber2pr/next-tpl/scripts/build.sh testing
```

# config 配置/定制项

## API/IP 配置

1. api/apiConfig

> 配置后端 api 地址、CDN 地址、代理 api

---

2. api/apiUrls

> 配置 api 列表

---

3. api/getToken

> 配置 token 获取、鉴权策略

---

4. api/utils::(origin,domain)

> 配置 cookie domain、cors

## Redux 配置

1. store/IState

> 配置全局 state

## 其他配置

1. utils/analytics-google

> 配置谷歌分析

---

2. utils/console

> 配置控制台 console 信息

---

3. utils/constants

> 配置 token-key 等常量

## 脚本配置

1. scripts/build

> 配置 docker 打包脚本

---

2. scripts/run

> 配置 docker 镜像运行脚本

---

3. scripts/publish

> 配置 docker 打包/发布/运行脚本

# 分支管理

1. dev 更改，dev 合并到 testing，testing 发布到测试服测试，测试通过后 testing 合并到 master。

2. 推送 master，测试服测试 master，测试通过后发布 master。

> master 发布后，执行 yarn reset:branch 重置 dev 和 testing 分支。

> 每当 master 分支发布后，如果 dev 和 testing 都已合并且落后就需要 reset 重置。

> 重置后的状态为 master/origin、dev/origin、testing/origin、origin/HEAD 在一个点上

> 分支发布推荐使用 yarn push

### 多人开发

1. 从 testing 分支检出 feat-xxx 分支，开发完成后合并到 testing 分支，testing 分支测试通过后合并到 master 发布。

### 版本管理

1. fix-xxx 分支作为临时 bug 修复，合并到 testing 分支测试通过后可以直接合并到 master 发布

2. feat-xxx 分支作为功能分支，合并到 testing 分支测试通过后，如果需要发布版本，需要当前 HEAD 打上 tag 再合并到 master 发布。

> master 和 testing 分支需要保留且只读，其他分支被合并后需要被删除。

# vscode 必装插件

1. 暗色主题：After Dark

2. 自动闭合：Auto Close Tag

3. 自动导入：Auto Import

4. html 标签快速命名：Auto Rename Tag

5. Git 分支图形化：Git Graph

6. 路径自动补全：Path Autocomplete、Path Intellisense

7. 代码格式化：Prettier

8. 导入格式化：TypeScript Import Sorter

# vscode 设置

1. 文件>首选项>设置>搜索 terminal.integrated.shell.windows，替换为 git:bash 的绝对路径。

# 项目前必读

[ssr 项目架构注意与优化](https://saber2pr.top/#/blog/Nextjs%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/ssr%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84%E6%B3%A8%E6%84%8F%E4%B8%8E%E4%BC%98%E5%8C%96)

[Nextjs 首屏渲染速度优化](https://saber2pr.top/#/blog/Nextjs%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/Nextjs%E9%A6%96%E5%B1%8F%E6%B8%B2%E6%9F%93%E9%80%9F%E5%BA%A6%E4%BC%98%E5%8C%96)

[学习 antd 组件设计](https://saber2pr.top/#/blog/Ant-Design%E7%BB%84%E4%BB%B6/%E5%AD%A6%E4%B9%A0antd%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)

[react16 以后不需要的一些操作](https://saber2pr.top/#/blog/React%E7%94%9F%E6%80%81/react16%E4%BB%A5%E5%90%8E%E4%B8%8D%E9%9C%80%E8%A6%81%E7%9A%84%E4%B8%80%E4%BA%9B%E6%93%8D%E4%BD%9C)
