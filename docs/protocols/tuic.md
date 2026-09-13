---
title: TUIC v5 节点搭建教程：QUIC、BBR 拥塞控制、自签证书（sing-box / mihomo）
description: 用 PSM 搭建 TUIC v5 节点：基于 QUIC 的 UDP 代理协议，低延迟、多路复用，可选 bbr / cubic / new_reno 拥塞控制，支持自签证书和 ECH。
keywords: TUIC 搭建, TUIC v5, TUIC 教程, QUIC 代理, sing-box TUIC, mihomo TUIC
---

# TUIC v5

TUIC 是另一个基于 QUIC 的代理协议，延迟低、多路复用。适合在 [Hysteria2](/protocols/hysteria2) 之外再备一条 UDP 线路。

| | |
| --- | --- |
| 传输 | UDP（QUIC） |
| 支持的内核 | sing-box、mihomo |
| 域名和证书 | 需要证书，自签证书也可以 |
| 常用客户端 | sing-box、Clash Verge Rev、NekoBox |

## 在菜单里创建

- sing-box：主菜单 **2** → **4. 节点管理** → **10. TUIC**
- mihomo：主菜单 **3** → **4** → **10**

菜单可以直接生成自签证书。

![sing-box 的 TUIC 节点菜单](/images/pm-tuic.zh.png){.shot}

## 用命令创建

```bash
psm node add sing-box tuic --tag my-tuic --port 9443 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key
```

| 参数 | 说明 |
| --- | --- |
| `--uuid`、`--password` | TUIC 的认证信息，不填自动生成 |
| `--congestion-control bbr\|cubic\|new_reno` | 拥塞控制算法 |
| `--insecure 1` | 用自签证书时加上 |
| `--ech true` | 加上 ECH |

TUIC 走 UDP，记得在云服务商的安全组里放行这个 **UDP** 端口。

## 导出给客户端

```bash
psm node export sing-box tuic my-tuic
```

![TUIC 节点的分享链接](/images/export-hk-tuic.zh.png){.shot}
