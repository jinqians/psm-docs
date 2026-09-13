---
title: 什么是 PSM
description: PSM（Proxy Stack Manager）是开源免费的 VPS 科学上网一键管理脚本，把 Xray、sing-box、mihomo 三个内核和 REALITY、Hysteria2、TUIC 等协议放进一个菜单，适合自建节点、给家人朋友分账号和长期维护服务器。
---

# 什么是 PSM

PSM（Proxy Stack Manager）是一个开源、免费的 Bash 工具。它把一台 Linux VPS 变成你自己的科学上网服务器：一条命令安装，之后所有操作都在 `psm` 菜单里完成。

## 它帮你做什么

- **装内核**：Xray、sing-box、mihomo（Clash.Meta）三个代理内核，按需装一个或全部。
- **建节点**：VLESS REALITY / Vision / XHTTP、Hysteria2、TUIC v5、AnyTLS、Snell、Shadowsocks 2022、Trojan、VMess、SOCKS5、WireGuard。密钥、UUID、密码自动生成。
- **给客户端**：导出标准分享链接、二维码和订阅，手机和电脑客户端扫码或粘贴就能用。
- **管服务器**：Nginx、SSL 证书（自动续期）、防火墙、BBR、SSH 加固、流量统计、Telegram 通知、备份和迁移。

## 和一次性安装脚本有什么不同

很多脚本装完一个协议就结束了，之后改端口、换伪装域名、续证书、迁移服务器都得自己动手。PSM 是给**长期维护的服务器**设计的：

- 所有节点记在一个地方，改动前自动备份，配置校验失败自动回滚。
- 多个协议和多个内核可以同时运行，也可以[共用一个 443 端口](/features/port-443)。
- 可以[分账号](/features/users)、[限流量和到期时间](/features/traffic)、[一键搬家](/features/migrate)、[自动诊断修复](/features/doctor)。
- 代理内核以非 root 用户运行，默认只开必要的权限。

## 适合谁

- 有一台海外 VPS，想自建节点，不依赖机场。
- 想用 REALITY、Hysteria2 这类抗封锁能力强的协议。
- 要给家人、朋友或小团队分发账号。
- 需要解锁 Netflix、ChatGPT 等对机房 IP 有限制的服务。

## 不适合谁

- 没有 VPS、也不打算买的用户：PSM 不提供服务器或节点。
- 需要集中管理很多台服务器的场景：PSM 以单台服务器为主，没有多机面板。

## 开源许可

PSM 以 [AGPL-3.0](https://github.com/jinqians/proxy-stack/blob/main/LICENSE) 协议开源，代码全部是 Bash，可以自己审阅。请在当地法律允许的范围内使用。

下一步：[一键安装](/guide/install)。
