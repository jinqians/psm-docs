---
title: "Trojan and VMess node setup: TLS certificates, WebSocket, shared port 443 (Xray / sing-box / mihomo)"
description: Set up Trojan and VMess (WS + TLS) nodes with PSM, the two most widely supported protocols. Xray uses your domain's certificate; sing-box and mihomo take a real or self-signed certificate; all of them can share port 443.
keywords: Trojan setup, VMess setup, VMess WebSocket TLS, Trojan script, Xray Trojan, sing-box Trojan
---

# Trojan and VMess

The two long-established protocols with the widest client support: Trojan dresses proxy traffic as ordinary HTTPS; VMess in PSM is WebSocket + TLS. They resist censorship less well than REALITY, so use them for older clients or as a spare.

| | Trojan | VMess |
| --- | --- | --- |
| Transport | TCP + TLS | WebSocket + TLS |
| Cores | Xray, sing-box, mihomo | Xray, sing-box, mihomo |
| Certificate | Xray uses the domain's certificate; sing-box / mihomo accept a self-signed one | same |
| Shared port 443 | yes (`--mount-443`) | yes (`--mount-443`) |
| Common clients | nearly every client | nearly every client |

## From the menu

| Core | Trojan | VMess |
| --- | --- | --- |
| Xray | main menu **4** → **4** → **5** | main menu **4** → **4** → **6** |
| sing-box | main menu **2** → **4** → **6** | main menu **2** → **4** → **7** |
| mihomo | main menu **3** → **4** → **6** | main menu **3** → **4** → **7** |

![Xray Trojan node menu](/images/pm-trojan.en.png){.shot}

## From the command line

**Xray**: as for [Vision](/en/protocols/vision#_1-domain-and-certificate), point the domain at the VPS and issue its certificate in main menu **10 (SSL certificates)**, then:

```bash
psm node add xray trojan --tag my-trojan --port 2096 --domain hk.example.com
psm node add xray vmess  --tag my-vmess  --port 2053 --domain hk.example.com
```

**sing-box / mihomo**: name the certificate files directly, adding `--insecure 1` for a self-signed one (leave them out and PSM signs one). A self-signed node's link carries the certificate's fingerprint (`pcs`), which Xray-based clients such as v2rayN verify — Xray refuses to skip verification since 2026-06-01:

```bash
psm node add sing-box trojan --tag my-trojan --port 2096 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key
```

| Option | Meaning |
| --- | --- |
| `--password` | Trojan password; generated when left out |
| `--uuid`, `--path` | VMess UUID and WebSocket path; generated when left out |
| `--mount-443` | put the node on shared port 443 |
| `--ech true` | ECH for sing-box / mihomo Trojan |

## Export for clients

```bash
psm node export xray trojan my-trojan    # trojan:// link
psm node export xray vmess  my-vmess     # vmess:// link
```

![Trojan share link](/images/export-hk-trojan.en.png){.shot}

![VMess share link](/images/export-hk-vmess.en.png){.shot}
