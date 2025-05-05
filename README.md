# Html proxy by Service Worker

通过 Service Worker 改写 html 入口文件来做到一些可能的效果:

1. A/B test, 也许可以根据一些字段(cookie, storage)来进行用户灰度测试
2. 测试环境多版本同路径复用, 如同一环境, A, B feature 的测试

## Reference link

- Service worker, https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API
- Fetch event, https://developer.mozilla.org/zh-CN/docs/Web/API/FetchEvent

## How to use

通过 build 命令, 构建出两个版本的 SPA 应用代码。

```sh
pnpm i

# this would require input a version string
pnpm build

# 模拟服务端预览
pnpm preview
```

例如, 输入 `abc` 和 不输版本, 会在预览目录创建默认版本和 `abc` 版本:

![alt text](./assets/1.png)

在预览模式下, 输入两个 url (这里做区分, 是通过浏览器请求 url search 中的 `version` 关键字);

![alt text](./assets/2.png)

## How it work

通过 service worker 将 html 的请求按特定的规则去转发; 同时，在 build 的
时候注入环境变量, 以此来识别构建产物(目录、路径等)
