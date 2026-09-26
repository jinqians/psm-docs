---
title: VLESS XHTTP 节点搭建教程：XHTTP、WebSocket、gRPC、HTTPUpgrade、REALITY 层、mKCP（Xray）
description: 用 PSM 搭建 Xray 的 XHTTP 类节点，七种传输任选：XHTTP/SplitHTTP、WebSocket、gRPC、HTTPUpgrade、HTTP/2 可以走 CDN，REALITY 层不需要域名，mKCP 走 UDP 抗丢包。
keywords: XHTTP 搭建, SplitHTTP, VLESS WebSocket TLS, VLESS gRPC, HTTPUpgrade, mKCP, Xray CDN 节点
---

# VLESS XHTTP

这是 Xray 上一组"VLESS + 某种传输"的节点。基于 HTTP 的几种传输（XHTTP、WebSocket、gRPC、HTTPUpgrade）可以经过 CDN 转发，VPS 的 IP 被封后还能借 CDN 继续用。

| | |
| --- | --- |
| 支持的内核 | Xray |
| 域名和证书 | 大多数模式需要，REALITY 层和 mKCP 不需要 |
| 共用 443 | 基于 TLS 的模式可以（`--mount-443`），mKCP 不行 |
| 常用客户端 | 较新的 Xray 内核客户端，例如 v2rayN、v2rayNG |

## 七种模式

| `--mode` | 菜单里的名字 | 需要域名和证书 | 说明 |
| --- | --- | --- | --- |
| `xhttp` | XHTTP/SplitHTTP | 需要 | Xray 新一代 HTTP 传输，可走 CDN |
| `ws` | WebSocket | 需要 | 兼容性最好，可走 CDN |
| `grpc` | gRPC | 需要 | 多路复用，可走 CDN |
| `httpupgrade` | HTTPUpgrade | 需要 | 比 WebSocket 少一层帧开销 |
| `h2` | HTTP/2 | 需要 | 由 XHTTP stream-one 承载（Xray 已移除旧的 HTTP 传输） |
| `reality-layer` | Reality layer | 不需要 | 用 REALITY 伪装，配合 `--reality-transport xhttp\|grpc` |
| `mkcp` | mKCP | 不需要 | UDP，不套 TLS，靠 seed 和伪装头混淆；抗丢包但流量消耗明显更高 |

需要域名的模式，证书的准备方法和 [Vision](/protocols/vision#_1-准备域名和证书) 一样：域名解析到 VPS，在主菜单 **10. SSL 证书管理** 签发。

## 在菜单里创建

主菜单 **4** → **4. 节点管理** → **3. XHTTP**，进入后选择模式。

![Xray 的 XHTTP 节点菜单](/images/pm-xhttp.zh.png){.shot}

## 用命令创建

```bash
# XHTTP（WebSocket、gRPC 等把 xhttp 换成 ws、grpc、httpupgrade、h2）
psm node add xray xhttp --tag my-xhttp --port 2087 \
  --domain hk.example.com --mode xhttp

# REALITY 层，不需要域名
psm node add xray xhttp --tag my-xhttp-reality --port 8443 \
  --mode reality-layer --reality-transport xhttp

# mKCP（UDP）
psm node add xray xhttp --tag my-kcp --port 9000 --mode mkcp
```

mKCP 可以用 `--kcp-seed` 设置混淆种子、`--kcp-header` 选择伪装头。它走 UDP，没法挂到 443 复用上；按流量计费的机器请谨慎使用。

mKCP 不套 TLS，而 Xray v26.7.7 起的客户端拒绝向公网地址发送不加密的 VLESS，所以新建的 mKCP 节点默认开启 VLESS Encryption（X25519），链接里的 `encryption=` 就是客户端要用的密钥。只给旧版客户端用时可以加 `--vless-enc none` 关掉。

## 导出给客户端

```bash
psm node export xray xhttp my-xhttp
```

![XHTTP 节点的分享链接](/images/export-hk-xhttp.zh.png){.shot}
