---
title: VLESS Vision 节点搭建教程：VLESS + TCP + TLS + xtls-rprx-vision（Xray）
description: 用 PSM 搭建 VLESS Vision 节点：域名解析到 VPS，用 acme.sh 一键签发证书，一条命令创建节点、可挂到 443 复用，导出 vless:// 链接。
keywords: VLESS Vision 搭建, xtls-rprx-vision, VLESS TCP TLS, Xray Vision 教程, 域名证书节点
---

# VLESS Vision

VLESS + TCP + TLS，加上 Xray 的 Vision 流控（xtls-rprx-vision），消除"TLS 里再套 TLS"的特征。它用你自己的域名和真实证书，适合已经有域名、想要标准 TLS 外观的场景；没有域名就用 [REALITY](/protocols/reality)。

| | |
| --- | --- |
| 传输 | TCP + TLS |
| 支持的内核 | Xray |
| 域名和证书 | 需要：域名解析到 VPS，并有这个域名的证书 |
| 共用 443 | 可以（`--mount-443`） |
| 常用客户端 | v2rayN、v2rayNG、Shadowrocket、Clash Verge Rev、sing-box |

## 1. 准备域名和证书

1. 把域名（例如 `hk.example.com`）的 A 记录指向 VPS 的 IP。
2. 主菜单选 **10. SSL 证书管理**，用 acme.sh 签发证书：HTTP-01 需要 80 端口可访问；DNS-01 支持通配符证书。证书保存在 `/etc/nginx/ssl/域名/`，到期自动续期。

![SSL 证书管理菜单](/images/cert.zh.png){.shot}

## 2. 创建节点

菜单：主菜单 **4** → **4. 节点管理** → **2. Vision**。

![Xray 的 Vision 节点菜单](/images/pm-vision.zh.png){.shot}

命令行：

```bash
psm node add xray vision --tag my-vision --port 8443 --domain hk.example.com
```

| 参数 | 说明 |
| --- | --- |
| `--domain` | 节点的域名，PSM 用这个域名在 `/etc/nginx/ssl/` 下的证书 |
| `--mount-443` | 挂到 443 复用上，和其他节点共用 443 |
| `--vless-enc x25519\|mlkem768` | 再加一层 VLESS Encryption |

## 3. 导出给客户端

```bash
psm node export xray vision my-vision
```

![Vision 节点的分享链接](/images/export-hk-vision.zh.png){.shot}
