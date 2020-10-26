# next-tpl

1. 需要实现 requestRoot，baseUrl 设置为后端地址。

需要替换这里的 axios

> plugin/withAxios

> pages/api

2. 需要实现 requestApi，baseUrl 设置为前端 next 地址 /api

在 withPage 里用，即 ajax 时用 requestApi
