---
title: VLESS + TLS 节点搭建教程：TCP、WebSocket、gRPC、QUIC 等传输（sing-box / mihomo）
description: 用 PSM 在 sing-box 或 mihomo 上搭建 VLESS + TLS 节点，传输方式任选：sing-box 支持 tcp、ws、grpc、http、httpupgrade、quic，mihomo 支持 tcp、ws、grpc、xhttp；可挂 443、可加 ECH。
keywords: VLESS TLS 搭建, sing-box VLESS, mihomo VLESS, VLESS WebSocket, VLESS gRPC, ECH
---

# VLESS + TLS

sing-box 和 mihomo 上的 VLESS 节点：VLESS 加 TLS，传输方式可选。适合想用自己的证书、又想在 sing-box 或 mihomo 上统一管理的场景；Xray 上对应的是 [Vision](/protocols/vision) 和 [XHTTP](/protocols/xhttp)。

| | |
| --- | --- |
| 支持的内核 | sing-box、mihomo |
| 传输方式 | sing-box：tcp、ws、grpc、http、httpupgrade、quic；mihomo：tcp、ws、grpc、xhttp |
| 域名和证书 | 需要证书；用自签证书时加 `--insecure 1` |
| 共用 443 | 可以（`--mount-443`） |
| 常用客户端 | v2rayN、Shadowrocket、Clash Verge Rev、sing-box、NekoBox |

## 在菜单里创建

- sing-box：主菜单 **2** → **4. 节点管理** → **9. VLESS + TLS**
- mihomo：主菜单 **3** → **4** → **9**

![sing-box 的 VLESS + TLS 节点菜单](/images/pm-vless.zh.png){.shot}

## 用命令创建

```bash
psm node add sing-box vless --tag my-vless --port 11443 \
  --sni hk.example.com \
  --cert-path /etc/nginx/ssl/hk.example.com/fullchain.pem \
  --key-path  /etc/nginx/ssl/hk.example.com/privkey.pem \
  --transport ws --path /ws
```

| 参数 | 说明 |
| --- | --- |
| `--sni` | 证书对应的域名 |
| `--cert-path`、`--key-path` | 证书和私钥；主菜单 **10. SSL 证书管理** 签发的证书在 `/etc/nginx/ssl/域名/` |
| `--transport` | 传输方式，见上表；`--path` 设置 ws 等的路径 |
| `--insecure 1` | 自签证书时加上，导出的链接会让客户端跳过证书校验 |
| `--mount-443` | 挂到 443 复用上 |
| `--ech true` | 加上 ECH（加密 Client Hello） |
| `--vless-enc x25519\|mlkem768` | 仅 mihomo：再加一层 VLESS Encryption |

## 导出给客户端

```bash
psm node export sing-box vless my-vless
```

![VLESS + TLS 节点的分享链接](/images/export-hk-vless-ws.zh.png){.shot}
