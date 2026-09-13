---
layout: home
title: PSM：VPS 科学上网一键脚本，Xray / sing-box / mihomo 三内核
titleTemplate: false
description: PSM 是开源的 VPS 科学上网一键管理脚本。一条命令搭建 VLESS REALITY、Hysteria2、TUIC、AnyTLS、Snell 节点，Xray、sing-box、mihomo 三内核，支持 443 端口复用、订阅、多用户、流量配额和一键迁移服务器。

hero:
  name: PSM
  text: VPS 科学上网一键管理脚本
  tagline: 一条命令装好 Xray / sing-box / mihomo。REALITY、Hysteria2、TUIC 节点即建即用，还能分账号、限流量、一键搬家。
  image:
    src: /logo.svg
    alt: PSM 科学上网一键脚本
  actions:
    - theme: brand
      text: 5 分钟快速开始
      link: /guide/quick-start
    - theme: alt
      text: 一键安装
      link: /guide/install
    - theme: alt
      text: GitHub
      link: https://github.com/jinqians/proxy-stack

features:
  - icon: 🚀
    title: 一条命令，装好即用
    details: 在 VPS 上以 root 执行一行命令，之后只要输入 psm，所有功能都在一个菜单里。
    link: /guide/install
  - icon: 🛡️
    title: 主流抗封锁协议全覆盖
    details: VLESS REALITY / Vision / XHTTP、Hysteria2（端口跳跃）、TUIC v5、AnyTLS、Snell、Shadowsocks 2022、Trojan、VMess、WireGuard。
    link: /guide/choose-protocol
  - icon: 🧩
    title: Xray、sing-box、mihomo 三内核
    details: 三个内核可以装在同一台机器上，各管各的节点，按协议和习惯挑选。
    link: /guide/cores
  - icon: 🔒
    title: 443 端口复用
    details: 多个节点共用一个 443 端口，靠域名分流；不认识的域名直接断开，扫描器探测不到。
    link: /features/port-443
  - icon: 📱
    title: 分享链接、二维码、订阅
    details: 一键导出标准分享链接、二维码和订阅，v2rayN、Clash Verge Rev、Shadowrocket、sing-box 等客户端直接导入。
    link: /features/subscription
  - icon: 👥
    title: 多用户与流量配额
    details: 每人一套独立的 UUID / 密码、到期时间和订阅链接；到期或超额自动停用，随时一键恢复。
    link: /features/users
  - icon: 🎬
    title: 解锁 Netflix、ChatGPT
    details: 接入 Cloudflare WARP 或住宅宽带出口，按规则把流媒体和 AI 服务的流量分到专门的出口。
    link: /features/unlock
  - icon: 📦
    title: 一键迁移服务器
    details: psm migrate push root@新服务器，节点、密钥、证书原样搬过去，客户端不用改配置。
    link: /features/migrate
  - icon: 🩺
    title: 自动诊断和修复
    details: psm doctor --fix 检查服务、证书、开机自启和防火墙规则，能修的直接修好。
    link: /features/doctor
---

## 一键安装

在 VPS 上以 root 执行：

```bash
bash <(curl -fsSL https://psm.jinqians.com)
```

装好以后输入 `psm` 进入管理菜单。系统要求、Alpine 的装法和卸载方法见 [一键安装](/guide/install)。

## 适合谁

- **有一台 VPS，想自建科学上网节点**：不想依赖机场，要独享带宽和 IP。
- **想要稳定、抗封锁的协议**：REALITY、Hysteria2、TUIC、AnyTLS 都能一键搭好，还能多个协议同时开。
- **要给家人朋友分账号**：每人独立凭据和订阅，可以设到期时间和每月流量。
- **需要看 Netflix、用 ChatGPT**：机房 IP 被拦时，通过 WARP 或家宽出口按规则分流。
- **不想每次换机器都重来一遍**：一条命令把整台服务器搬到新 VPS。

## 常见问题

- [VPS 怎么搭建科学上网节点？](/faq#how-to-build)
- [REALITY、Hysteria2、TUIC 该选哪个？](/guide/choose-protocol)
- [支持哪些系统？](/reference/systems)
- [更多问题](/faq)
