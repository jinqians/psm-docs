---
title: Xray、sing-box、mihomo 有什么区别，该用哪个
description: PSM 同时支持 Xray、sing-box、mihomo（Clash.Meta）三个代理内核。对比三者支持的服务端协议、特色功能和适用人群，帮你决定装哪一个，或三个都装。
---

# Xray、sing-box、mihomo 怎么选

PSM 可以在同一台服务器上同时装 Xray、sing-box 和 mihomo。三个内核互不干扰，各自管理自己的节点和端口。只装一个完全够用；三个都装也没问题。

## 能建哪些节点

| 协议 | Xray | sing-box | mihomo |
| --- | :---: | :---: | :---: |
| VLESS REALITY | ✅ | ✅ | ✅ |
| VLESS Vision / XHTTP | ✅ | — | — |
| VLESS（TCP / WS / gRPC / HTTP/2 / HTTPUpgrade） | 部分（XHTTP 各模式） | ✅ | ✅ |
| Hysteria2 | ✅ | ✅ | ✅ |
| TUIC v5 | — | ✅ | ✅ |
| AnyTLS | — | ✅ | ✅ |
| Shadowsocks 2022 | ✅ | ✅ | ✅ |
| Trojan / VMess | ✅ | ✅ | ✅ |
| Snell | — | ✅ | ✅ |
| SOCKS5 | ✅ | ✅ | ✅ |
| WireGuard 服务端 | — | ✅ | — |

## 各自擅长什么

**Xray** — REALITY 功能最全：伪装目标自动测活和切换、按机房自动发现伪装域名、Vision 和 XHTTP。它还能**按用户统计流量**，所以[多用户的月流量配额](/features/users)只在 Xray 节点上生效。

**sing-box** — 协议覆盖最广：TUIC、AnyTLS、Snell 和 WireGuard 服务端都有。规则集分流不需要重启，TLS 节点可以一键开 ECH。

**mihomo（Clash.Meta）** — 适合习惯 Clash 规则的人：直接管理 `proxies`、`proxy-groups`、`rules` 和规则集。也支持 TUIC、AnyTLS、Snell 和 ECH。

## 怎么选

- **只想要一个稳定节点**：装 Xray，建一个 REALITY。
- **想要 TUIC、AnyTLS、WireGuard**：装 sing-box。
- **习惯 Clash 规则写法**：装 mihomo。
- **要给别人分账号并限流量**：节点建在 Xray 上。sing-box 和 mihomo 没有按用户的流量计数，只能按节点限额。

三个内核都支持：[443 端口复用](/features/port-443)、分享链接和订阅、WARP 与家宽出口、规则集分流、流量统计、[诊断修复](/features/doctor) 和 [迁移](/features/migrate)。
