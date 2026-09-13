---
title: AnyTLS 节点搭建教程：减少 TLS-in-TLS 特征（sing-box / mihomo）
description: 用 PSM 搭建 AnyTLS 节点：基于 TLS 的代理协议，用填充和连接复用减少 TLS-in-TLS 流量特征；支持自签证书、443 复用和 ECH。需要 sing-box 1.12+ 或 mihomo 1.19.3+。
keywords: AnyTLS 搭建, AnyTLS 教程, sing-box AnyTLS, mihomo AnyTLS, TLS in TLS
---

# AnyTLS

AnyTLS 是基于 TLS 的代理协议，通过填充和连接复用，减少"TLS 里再套 TLS"的特征。适合作为 REALITY 之外的一条 TCP 备用线路。

| | |
| --- | --- |
| 传输 | TCP + TLS |
| 支持的内核 | sing-box（1.12 及以上）、mihomo（1.19.3 及以上） |
| 域名和证书 | 需要证书，自签证书也可以 |
| 共用 443 | 可以（`--mount-443`） |
| 常用客户端 | sing-box 1.12+、mihomo 内核的客户端（如 Clash Verge Rev） |

## 在菜单里创建

- sing-box：主菜单 **2** → **4. 节点管理** → **4. AnyTLS**
- mihomo：主菜单 **3** → **4** → **4**

菜单可以直接生成自签证书。

![sing-box 的 AnyTLS 节点菜单](/images/pm-anytls.zh.png){.shot}

## 用命令创建

```bash
psm node add sing-box anytls --tag my-anytls --port 10443 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key
```

| 参数 | 说明 |
| --- | --- |
| `--password` | 密码，不填自动生成 |
| `--insecure 1` | 用自签证书时加上 |
| `--mount-443` | 挂到 443 复用上 |
| `--ech true` | 加上 ECH |

## 导出给客户端

```bash
psm node export sing-box anytls my-anytls
```

![AnyTLS 节点的分享链接](/images/export-hk-anytls.zh.png){.shot}
