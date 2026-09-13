---
title: "Every protocol PSM supports: REALITY, Hysteria2, TUIC, AnyTLS, Snell, Shadowsocks 2022 guides"
description: All proxy protocols PSM supports - VLESS REALITY, Vision, XHTTP, VLESS + TLS, Hysteria2, TUIC, AnyTLS, Shadowsocks 2022, Trojan, VMess, Snell, SOCKS5, WireGuard - which cores run each, whether it needs a domain and certificate, and a setup guide for each.
keywords: proxy protocols, proxy node setup guide, REALITY guide, Hysteria2 guide, TUIC guide, AnyTLS guide, Snell guide, Shadowsocks 2022 guide
---

# Protocol guides

One page per protocol: how to create it from the menu and the command line, its options, and how to export it for clients. Not sure which one to use? Start with [Choosing a protocol](/en/guide/choose-protocol).

| Protocol | Transport | Domain and certificate | Xray | sing-box | mihomo |
| --- | --- | --- | :-: | :-: | :-: |
| [VLESS REALITY](/en/protocols/reality) | TCP | not needed | ✓ | ✓ | ✓ |
| [VLESS Vision](/en/protocols/vision) | TCP + TLS | needed | ✓ | | |
| [VLESS XHTTP](/en/protocols/xhttp) | HTTP / UDP | depends on the mode | ✓ | | |
| [VLESS + TLS](/en/protocols/vless) | TCP / WS / gRPC … | needed (self-signed works) | | ✓ | ✓ |
| [Hysteria2](/en/protocols/hysteria2) | UDP (QUIC) | needed (self-signed works) | ✓ | ✓ | ✓ |
| [TUIC v5](/en/protocols/tuic) | UDP (QUIC) | needed (self-signed works) | | ✓ | ✓ |
| [AnyTLS](/en/protocols/anytls) | TCP + TLS | needed (self-signed works) | | ✓ | ✓ |
| [Shadowsocks 2022](/en/protocols/ss2022) | TCP / UDP | not needed | ✓ | ✓ | ✓ |
| [Trojan, VMess](/en/protocols/trojan-vmess) | TCP + TLS | needed | ✓ | ✓ | ✓ |
| [Snell](/en/protocols/snell) | TCP | not needed | | ✓ | ✓ |
| [SOCKS5](/en/protocols/socks5) | TCP | not needed | ✓ | ✓ | ✓ |
| [WireGuard](/en/protocols/wireguard) | UDP | not needed | | ✓ | |

There are also three **standalone programs** that do not depend on a core: main menu **5 (Snell)** for the official snell-server, **6 (ss-rust)** for Shadowsocks 2022, and **7 (Hysteria2)** for the official Hysteria2 server.

## Each core's node menu

Choose **4 (Nodes)** in a core's menu to see every protocol it supports; pick one to create, view or delete nodes.

**Xray** (main menu 4 → 4):

![Xray protocol list](/images/xray-protocols.en.png){.shot}

**sing-box** (main menu 2 → 4):

![sing-box protocol list](/images/sb-protocols.en.png){.shot}

**mihomo** (main menu 3 → 4):

![mihomo protocol list](/images/mh-protocols.en.png){.shot}

## The command line, for every protocol

Every protocol uses the same commands; all options are in the [CLI reference](/en/reference/cli):

```bash
psm node add    CORE PROTO --tag NAME --port PORT [protocol options]
psm node show   CORE PROTO NAME
psm node export CORE PROTO NAME [--server HOST] [--format uri|json|surge]
psm node delete CORE PROTO NAME --yes
psm node list
```

Switches that work across protocols:

- `--mount-443`: put the node on [shared port 443](/en/features/port-443) next to other nodes. Available for Xray REALITY, Vision, XHTTP, Trojan and VMess, and for sing-box / mihomo REALITY, AnyTLS, Trojan, VMess and VLESS.
- `--ech true`: add ECH (Encrypted Client Hello) to sing-box / mihomo VLESS, Trojan, AnyTLS, Hysteria2 and TUIC; older clients without ECH still connect.
- `--json`: machine-readable output for scripts.

UUIDs, passwords and keys are generated when you leave them out. Queries hide credentials by default; `export` prints everything a client needs.
