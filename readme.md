# next-tpl

开箱即用的 nextjs 模板，集成 antd 按需加载、集成 axios 接口、集成 react-redux、集成 docker。

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

---

5. store/IState

> 配置全局 state

---

6. utils/analytics-google

> 配置谷歌分析

---

7. utils/console

> 配置控制台 console 信息

---

8. utils/constants

> 配置 token-key 等常量

# 分支管理

1. dev 更改，dev 合并到 testing，testing 发布到测试服测试，测试通过后 testing 合并到 master。

2. 推送 master，测试服测试 master，测试通过后发布 master。

3. master 发布后，执行 yarn reset:branch 重置 dev 和 testing 分支。

> 每当 master 分支发布后，如果 dev 和 testing 落后就需要 reset 重置。
