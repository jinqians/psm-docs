---
title: SOCKS5 入站搭建教程：本机代理入口与带认证的公网监听（Xray / sing-box / mihomo）
description: 用 PSM 创建 SOCKS5 入站：默认只在本机监听，给服务器上的其他程序或中转使用；公网监听必须设置用户名和密码。支持 Xray、sing-box、mihomo。
keywords: SOCKS5 搭建, socks5 代理, socks5 用户名密码, Xray socks, sing-box socks
---

# SOCKS5

SOCKS5 是最通用的代理协议，几乎所有程序都认识它。它**不加密**，不适合直接用来科学上网；在 PSM 里它的用途是给服务器上的其他程序、或者别的机器转发流量时，提供一个代理入口。

| | |
| --- | --- |
| 传输 | TCP |
| 支持的内核 | Xray、sing-box、mihomo |
| 默认监听 | 仅本机（127.0.0.1） |
| 公网监听 | 必须设置用户名和密码 |

## 在菜单里创建

- Xray：主菜单 **4** → **4. 节点管理** → **7. SOCKS5**
- sing-box：主菜单 **2** → **4** → **8**
- mihomo：主菜单 **3** → **4** → **8**

![Xray 的 SOCKS5 节点菜单](/images/pm-socks.zh.png){.shot}

## 用命令创建

只给本机用（默认）：

```bash
psm node add xray socks --tag my-socks --port 1080
```

对外开放时必须带认证：

```bash
psm node add xray socks --tag my-socks --port 1080 \
  --listen-addr 0.0.0.0 --username 用户名 --password 密码
```

`socks5` 是 `socks` 的别名，两种写法都可以。

## 导出

```bash
psm node export xray socks my-socks
```

![SOCKS5 节点的链接](/images/export-hk-socks.zh.png){.shot}
