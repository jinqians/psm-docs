---
title: Cloudflare：DDNS 动态解析、DNS 记录、通配符证书、Tunnel 与 Access
description: PSM 集成 Cloudflare API：在服务器上管理 DNS 记录，DDNS 每 5 分钟自动更新 IP，用 DNS-01 一键签发通配符证书，用 Cloudflare Tunnel 免开端口暴露服务，用 Access 给管理面板加门禁。
keywords: Cloudflare DDNS, 动态域名解析, Cloudflare API, 通配符证书, Cloudflare Tunnel, Cloudflare Access
---

# Cloudflare

域名托管在 Cloudflare 的话，PSM 可以直接调用 Cloudflare API，免去登录网页后台。在主菜单 **13. Cloudflare DDNS** 里操作：

![Cloudflare 管理菜单](/images/ddns.zh.png){.shot}

先选 **设置 API 凭据**，填入 Cloudflare 的 API Token（或全局 API Key），之后就可以使用下面的功能。

## DNS 记录

**列出 / 添加 / 删除 DNS 记录**：给节点、订阅、伪装网站加解析，不用打开 Cloudflare 后台。

## DDNS

服务器的公网 IP 会变（比如家用宽带、会换 IP 的 VPS）时：

- **DDNS：立即更新**：把域名解析改成当前 IP。
- **DDNS：安装定时任务**：每 5 分钟检查一次，IP 变了自动更新。

## 通配符证书

**自动签发证书（DNS-01 通配符）**：通过 Cloudflare 的 DNS 验证签发 `*.example.com` 通配符证书，不需要开放 80 端口。证书的用法见 [SSL 证书](/features/cert)。

## Tunnel 和 Access

- **Cloudflare Tunnel**：不开放任何端口，把本机的服务（比如一个网页面板）通过 Cloudflare 暴露到一个域名上。
- **Cloudflare Access**：给这类管理面板加一道 Cloudflare 的登录门禁，只有你授权的人能打开。

::: tip 代理节点不要走 Tunnel
Tunnel 适合网页面板这类 HTTP 服务。代理节点请直接连服务器，或者用 [XHTTP](/protocols/xhttp) 这类可以走 CDN 的传输。
:::
