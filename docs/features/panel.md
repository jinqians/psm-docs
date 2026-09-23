---
title: PSM Panel：多台 VPS 的网页管理面板（Cloudflare 一键部署）
description: PSM Panel 是 PSM 的网页管理面板，一键部署到 Cloudflare Workers，VPS 一条命令接入（没装过 PSM 也可以），不开放任何端口；在网页上管理所有服务器的节点、流量和限额，汇总成一个订阅。
keywords: PSM Panel, 代理面板, 多服务器管理, Cloudflare Workers 面板, 节点管理面板, 汇总订阅, Xboard, Xboard 替代, 类 Xboard 面板, 机场面板, 节点订阅管理
---

# PSM Panel

PSM Panel 是 PSM 的网页管理面板，用来在一个网页里管理多台 VPS：

- **一键部署**到你自己的 Cloudflare 账号（Workers + D1，免费额度够用），只需要填一个管理员密码；
- **一条命令接入 VPS**：没装过 PSM 的服务器也行，命令会先装好 PSM；节点用到的内核自动安装；
- 服务器上的 **psm-agent 不监听任何端口**，只主动用 HTTPS 连面板；
- 在网页上**新建、修改、删除节点**，Snell 和 SS2022 可以用独立的 snell-server（v4 / v5 / v6）、ss-rust；
- **流量**：每个节点本月用量、每日图表、流量上限（超额自动暂停）；
- **汇总订阅**：所有服务器的节点一个地址，通用链接、Clash / mihomo、Stash、sing-box、Surge、Quantumult X、Loon 自动识别；每种格式都有带基础分流的内置模板，也可以自己写模板；
- **出口分流**：建节点时可以让这个节点的 AI、流媒体或全部流量走 Cloudflare WARP 或免费家宽线路（VPNGate），其余照常直连；
- **REALITY 伪装目标自动选择**：填一个网络测绘引擎（Netlas / Quake / ZoomEye / FOFA）的 API Key，面板让服务器查同 ASN 里有证书的网站并逐个握手检查，一键填入；
- **诊断**：一键查看服务器的 PSM 版本、内核和 `psm doctor` 结果。

接入面板后，服务器上的 PSM 照常可以用菜单和命令行管理，互不影响。

<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/jinqians/psm-panel" target="_blank" rel="noopener"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare"></a>

## 管理员密码

部署表单里填的 `ADMIN_PASSWORD` 就是后台登录密码（至少 8 位）。只需要设置这一次：面板第一次读到它时，会把它的加盐哈希存进自己的 D1，之后重新部署即使机密没了也照样能登录。

::: warning 要加「机密」，不要加「变量」
之后在 Cloudflare 控制台补设或修改时，请在 Worker 的「设置 → 变量和机密」里添加**机密（Secret）**。明文**变量**会在每次重新部署时被清掉——部署配置里没有声明任何变量，而 `wrangler deploy` 只保留机密——这正是「重新部署后又提示还没有设置管理员密码」的原因。
:::

机密还在时以机密为准：改了机密就等于改了密码，所有已登录的会话随之失效。

## 接入服务器

在面板的"服务器"页添加服务器，复制给出的命令，在 VPS 上以 root 执行：

```bash
bash <(curl -fsSL https://psm.jinqians.com) --panel https://<你的面板地址> --join <一次性令牌>
```

它会安装（或更新）PSM，再用 [`psm agent join`](/reference/cli#psm-agent-接入-psm-panel) 接入面板。

以后 psm-agent 有新版本时，在面板"服务器"页点 **升级 agent** 即可（服务器自己更新 PSM 并换上新版），不必再登录 VPS。

## 完整文档

部署、接入、节点、流量、订阅、安全和常见问题：**[PSM Panel 文档](https://psm-panel-docs.pages.dev/)**；源码在 [jinqians/psm-panel](https://github.com/jinqians/psm-panel)。
