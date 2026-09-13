---
title: "TUIC v5 node setup: QUIC, BBR congestion control, self-signed certificates (sing-box / mihomo)"
description: Set up a TUIC v5 node with PSM - a UDP proxy protocol over QUIC with low latency and multiplexing, bbr / cubic / new_reno congestion control, self-signed certificates and ECH.
keywords: TUIC setup, TUIC v5, TUIC guide, QUIC proxy, sing-box TUIC, mihomo TUIC
---

# TUIC v5

TUIC is another proxy protocol over QUIC, with low latency and multiplexing: a good spare UDP line next to [Hysteria2](/en/protocols/hysteria2).

| | |
| --- | --- |
| Transport | UDP (QUIC) |
| Cores | sing-box, mihomo |
| Domain and certificate | a certificate is needed; a self-signed one works |
| Common clients | sing-box, Clash Verge Rev, NekoBox |

## From the menu

- sing-box: main menu **2** → **4 (Nodes)** → **10 (TUIC)**
- mihomo: main menu **3** → **4** → **10**

The menu can generate a self-signed certificate for you.

![sing-box TUIC node menu](/images/pm-tuic.en.png){.shot}

## From the command line

```bash
psm node add sing-box tuic --tag my-tuic --port 9443 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key
```

| Option | Meaning |
| --- | --- |
| `--uuid`, `--password` | TUIC credentials; generated when left out |
| `--congestion-control bbr\|cubic\|new_reno` | congestion control algorithm |
| `--insecure 1` | for a self-signed certificate |
| `--ech true` | add ECH |

TUIC runs over UDP: allow this **UDP** port in your cloud provider's security group.

## Export for clients

```bash
psm node export sing-box tuic my-tuic
```

![TUIC share link](/images/export-hk-tuic.en.png){.shot}
