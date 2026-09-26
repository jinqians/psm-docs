---
title: Trojan 与 VMess 节点搭建教程：TLS 证书、WebSocket、443 复用（Xray / sing-box / mihomo）
description: 用 PSM 搭建 Trojan 和 VMess（WS + TLS）节点：客户端兼容性最好的两个协议。Xray 用自己的域名证书，sing-box 和 mihomo 可以用真实证书或自签证书，都能挂到 443 复用。
keywords: Trojan 搭建, VMess 搭建, VMess WebSocket TLS, Trojan 一键脚本, Xray Trojan, sing-box Trojan
---

# Trojan 与 VMess

这两个是客户端兼容性最好的老牌协议：Trojan 把代理流量伪装成普通 HTTPS；VMess 在 PSM 里是 WebSocket + TLS。抗封锁能力不如 REALITY，适合照顾老客户端，或者作为备用。

| | Trojan | VMess |
| --- | --- | --- |
| 传输 | TCP + TLS | WebSocket + TLS |
| 支持的内核 | Xray、sing-box、mihomo | Xray、sing-box、mihomo |
| 证书 | Xray 用域名证书；sing-box / mihomo 可以用自签证书 | 同左 |
| 共用 443 | 可以（`--mount-443`） | 可以（`--mount-443`） |
| 常用客户端 | 几乎所有客户端 | 几乎所有客户端 |

## 在菜单里创建

| 内核 | Trojan | VMess |
| --- | --- | --- |
| Xray | 主菜单 **4** → **4** → **5** | 主菜单 **4** → **4** → **6** |
| sing-box | 主菜单 **2** → **4** → **6** | 主菜单 **2** → **4** → **7** |
| mihomo | 主菜单 **3** → **4** → **6** | 主菜单 **3** → **4** → **7** |

![Xray 的 Trojan 节点菜单](/images/pm-trojan.zh.png){.shot}

## 用命令创建

**Xray**：和 [Vision](/protocols/vision#_1-准备域名和证书) 一样，先把域名解析到 VPS，在主菜单 **10. SSL 证书管理** 签发证书，然后：

```bash
psm node add xray trojan --tag my-trojan --port 2096 --domain hk.example.com
psm node add xray vmess  --tag my-vmess  --port 2053 --domain hk.example.com
```

**sing-box / mihomo**：直接指定证书文件，自签证书时加 `--insecure 1`（证书都不填则 PSM 自动签一张）。自签节点导出的链接带上证书指纹（`pcs`），v2rayN 等 Xray 内核的客户端据此校验证书——Xray 从 2026-06-01 起不再接受"跳过证书校验"：

```bash
psm node add sing-box trojan --tag my-trojan --port 2096 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key
```

| 参数 | 说明 |
| --- | --- |
| `--password` | Trojan 的密码，不填自动生成 |
| `--uuid`、`--path` | VMess 的 UUID 和 WebSocket 路径，不填自动生成 |
| `--mount-443` | 挂到 443 复用上 |
| `--ech true` | sing-box / mihomo 的 Trojan 可以加 ECH |

## 导出给客户端

```bash
psm node export xray trojan my-trojan    # trojan:// 链接
psm node export xray vmess  my-vmess     # vmess:// 链接
```

![Trojan 节点的分享链接](/images/export-hk-trojan.zh.png){.shot}

![VMess 节点的分享链接](/images/export-hk-vmess.zh.png){.shot}
