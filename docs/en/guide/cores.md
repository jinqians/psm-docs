---
title: "Xray vs sing-box vs mihomo: which core to use"
description: PSM supports three proxy cores, Xray, sing-box and mihomo (Clash.Meta). Server protocols, special features and who each suits, to decide which one to install, or all three.
keywords: Xray vs sing-box, mihomo server, Clash.Meta, proxy core comparison
---

# Xray, sing-box or mihomo

PSM can run Xray, sing-box and mihomo on the same server at the same time. The three cores stay out of each other's way, each with its own nodes and ports. One core is plenty; all three is fine too.

## Which nodes each can serve

| Protocol | Xray | sing-box | mihomo |
| --- | :---: | :---: | :---: |
| VLESS REALITY | ✅ | ✅ | ✅ |
| VLESS Vision / XHTTP | ✅ | — | — |
| VLESS (TCP / WS / gRPC / HTTP/2 / HTTPUpgrade) | partly (XHTTP modes) | ✅ | ✅ |
| Hysteria2 | ✅ | ✅ | ✅ |
| TUIC v5 | — | ✅ | ✅ |
| AnyTLS | — | ✅ | ✅ |
| Shadowsocks 2022 | ✅ | ✅ | ✅ |
| Trojan / VMess | ✅ | ✅ | ✅ |
| Snell | — | ✅ | ✅ |
| SOCKS5 | ✅ | ✅ | ✅ |
| WireGuard server | — | ✅ | — |

## What each is best at

**Xray** — the most complete REALITY support: camouflage targets that are health-checked and switched automatically, targets discovered in your own datacenter, plus Vision and XHTTP. It also **counts traffic per user**, which is why [per-user monthly quotas](/en/features/users) apply to Xray nodes.

**sing-box** — the widest protocol range: TUIC, AnyTLS, Snell and a WireGuard server. Rule sets reload without a restart, and TLS nodes can turn on ECH.

**mihomo (Clash.Meta)** — for people used to Clash rules: `proxies`, `proxy-groups`, `rules` and rule providers, managed directly. It also has TUIC, AnyTLS, Snell and ECH.

## Which to pick

- **One reliable node**: install Xray and create a REALITY node.
- **TUIC, AnyTLS or WireGuard**: install sing-box.
- **You think in Clash rules**: install mihomo.
- **You hand out accounts with traffic limits**: put those nodes on Xray. sing-box and mihomo have no per-user traffic counters, only per-node quotas.

All three cores support [port 443 sharing](/en/features/port-443), share links and subscriptions, WARP and residential exits, rule sets, traffic accounting, [diagnose-and-repair](/en/features/doctor) and [migration](/en/features/migrate).
