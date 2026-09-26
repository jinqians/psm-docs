---
title: "Hysteria2 node setup: port hopping, Salamander / Gecko obfuscation, self-signed certificates (Xray / sing-box / mihomo)"
description: Set up a Hysteria2 node with PSM - a UDP (QUIC) protocol that is faster on lossy and congested routes, with port hopping, Salamander and Gecko obfuscation, self-signed certificates and ECH, on Xray, sing-box, mihomo or the official standalone server.
keywords: Hysteria2 setup, Hysteria2 port hopping, Hysteria2 obfuscation, salamander, hy2 script, Hysteria2 self-signed certificate
---

# Hysteria2

Hysteria2 runs over QUIC (UDP) with aggressive congestion control, and is usually far faster than TCP protocols on lossy or congested evening-peak routes. Pair it with [REALITY](/en/protocols/reality): one TCP line and one UDP line, each a backup for the other.

| | |
| --- | --- |
| Transport | UDP (QUIC) |
| Cores | sing-box, mihomo, Xray (v26.3.27 or later); plus the official standalone server |
| Domain and certificate | a certificate is needed; a self-signed one works |
| Common clients | v2rayN, v2rayNG, Shadowrocket, Clash Verge Rev, sing-box, NekoBox |

## From the menu

- sing-box: main menu **2** → **4 (Nodes)** → **3 (Hysteria2)**
- mihomo: main menu **3** → **4** → **3**
- Xray: main menu **4** → **4** → **8**
- Official standalone server: main menu **7 (Hysteria2)** → **1 (Install / reconfigure)**; afterwards you can change the password, bandwidth limit and certificate, and "Show share link" exports it

The sing-box and mihomo menus can generate a self-signed certificate for you.

![sing-box Hysteria2 node menu](/images/pm-hysteria2.en.png){.shot}

## From the command line

```bash
psm node add sing-box hysteria2 --tag my-hy2 --port 8443 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key \
  --obfs-pass OBFS_PASSWORD --hop-ports 20000-20999
```

| Option | Meaning |
| --- | --- |
| `--sni`, `--cert-path`, `--key-path` | the certificate; add `--insecure 1` for a self-signed one (leave all three out and PSM signs one; the link carries its fingerprint, `pinSHA256`) |
| `--password` | the authentication password; generated when left out |
| `--obfs-pass` | turn obfuscation on with this password |
| `--obfs-type salamander\|gecko` | obfuscation type, Salamander by default; Gecko needs sing-box 1.14+, mihomo 1.19.26+ or Xray v26.3.27+ |
| `--hop-ports START-END` | port hopping: forward this UDP range to the node's port |
| `--bbr-profile conservative\|standard\|aggressive` | how hard the server's BBR congestion control sends (without a bandwidth limit); unset keeps the core's default, standard — try aggressive on lossy cross-border lines. Needs sing-box 1.14+, mihomo 1.19.24+ or Xray v26.4.13+ (Xray's stable v26.3.27 has not got it; its preview has) |
| `--ech true` | add ECH (sing-box / mihomo) |

## Port hopping

Some providers throttle or block a single UDP port. With port hopping, the client keeps changing its port within a range, and the server's firewall rules forward the whole range to the same node. PSM writes the forwarding rules and restores them after a reboot; see [Port hopping](/en/features/port-443#port-hopping).

Allow the node's port **and the whole hopping range** (both UDP) in your cloud provider's security group.

## Export for clients

```bash
psm node export sing-box hysteria2 my-hy2
```

prints a `hysteria2://` link that already carries the port hopping and obfuscation settings:

![Hysteria2 share link](/images/export-hk-hy2.en.png){.shot}

![Hysteria2 node settings from psm node show](/images/show-hk-hy2.en.png){.shot}
