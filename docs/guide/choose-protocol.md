---
title: 科学上网协议怎么选：REALITY、Hysteria2、TUIC、AnyTLS 对比
description: 自建节点该用什么协议？对比 VLESS REALITY、Vision、XHTTP、Hysteria2、TUIC、AnyTLS、Shadowsocks 2022、Trojan、Snell、WireGuard 的传输方式、是否需要域名证书、抗封锁能力和适用场景，给出按网络环境的推荐组合。
---

# 协议怎么选

**一句话建议：** 先建一个 **VLESS REALITY** 节点作为主力；如果晚高峰或移动网络丢包严重，再加一个 **Hysteria2**；想多一条备用线路，就加 **TUIC** 或 **AnyTLS**。PSM 允许这些协议同时开，客户端里按需切换即可。

## 对比

| 协议 | 传输 | 需要域名和证书 | 优点 | 需要注意 | PSM 支持的内核 |
| --- | --- | --- | --- | --- | --- |
| VLESS REALITY | TCP | 不需要 | 借用真实网站的 TLS 握手，主动探测看到的是真网站；只有 IP 也能用 | 伪装目标要选好，不要选 CDN 后面的站点 | Xray、sing-box、mihomo |
| VLESS Vision | TCP + TLS | 需要 | 真实证书，可以挂伪装网站 | 要有自己的域名 | Xray |
| VLESS XHTTP | TCP（HTTP） | 视模式而定 | 可以走 CDN，也有 REALITY 模式 | 配置选项多 | Xray |
| Hysteria2 | UDP（QUIC） | 需要（可自签） | 弱网、丢包环境下速度优势明显；可开端口跳跃 | 部分运营商会限速或屏蔽 UDP | Xray、sing-box、mihomo |
| TUIC v5 | UDP（QUIC） | 需要（可自签） | 延迟低，多路复用 | 同样依赖 UDP 质量 | sing-box、mihomo |
| AnyTLS | TCP + TLS | 需要（可自签） | 专门处理 TLS-in-TLS 的流量特征 | 客户端支持相对少 | sing-box、mihomo |
| Shadowsocks 2022 | TCP / UDP | 不需要 | 简单、快、资源占用小 | 没有伪装层，更适合中转或网络宽松的环境 | Xray、sing-box、mihomo |
| Trojan / VMess | TCP + TLS | 需要（可自签） | 客户端兼容性最好 | 抗封锁能力不如 REALITY | Xray、sing-box、mihomo |
| Snell | TCP | 不需要 | Surge 原生支持 | 只适合 Surge 用户 | sing-box、mihomo |
| WireGuard | UDP | 不需要 | 全局 VPN 式连接 | 特征明显，不适合用来过墙 | sing-box |

## 按场景选

**只有一个 IP、没有域名** — 用 VLESS REALITY。它不需要证书，客户端连的是你的 IP，但 TLS 握手借用的是一个真实网站。

**家用宽带晚高峰卡顿、移动网络丢包高** — 加一个 Hysteria2。它走 UDP，带自己的拥塞控制，丢包环境下通常比 TCP 协议快得多。如果某个 UDP 端口被运营商限速，打开 [端口跳跃](/features/port-443#port-hopping)，让客户端在一段端口范围里轮换。

**想要多条线路互为备份** — REALITY（TCP）加 Hysteria2 或 TUIC（UDP），一个被干扰时还能用另一个。

**多个节点只想对外开一个 443 端口** — REALITY、Vision、XHTTP、AnyTLS 都能挂到 [443 端口复用](/features/port-443) 上。Hysteria2、TUIC 走 UDP 443，和 TCP 443 互不冲突。

**用 Surge** — Snell 或 VLESS REALITY 都可以；Snell 是 Surge 原生协议。

## 伪装目标怎么选（REALITY） {#reality-target}

REALITY 需要一个"伪装目标"：一个支持 TLS 1.3 的真实网站。选择原则：

- **不要选 Cloudflare、Akamai 这类 CDN 后面的站点**。否则别人可以借你的服务器访问整个 CDN，流量算你的。PSM 配置时会检测并提醒。
- 优先选和你的 VPS **同一个机房、同一个网络** 的站点。PSM 的 Xray 可以用网络测绘引擎自动帮你找。
- 避开被教程用烂的大厂域名。
- PSM 会在创建节点前用真实内核做一次握手测试，测不通的目标不会被采用。

## 加一层 ECH

sing-box 和 mihomo 上的 TLS 类节点（VLESS、Trojan、AnyTLS、Hysteria2、TUIC）可以一键开启 ECH（加密 Client Hello），让握手里的域名也被加密。开了 ECH 以后，不支持 ECH 的旧客户端仍然能连。

下一步：[5 分钟快速开始](/guide/quick-start)。
