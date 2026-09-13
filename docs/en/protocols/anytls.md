---
title: "AnyTLS node setup: less TLS-in-TLS signature (sing-box / mihomo)"
description: Set up an AnyTLS node with PSM - a TLS-based proxy protocol that uses padding and connection reuse to reduce the TLS-in-TLS signature, with self-signed certificates, shared port 443 and ECH. Needs sing-box 1.12+ or mihomo 1.19.3+.
keywords: AnyTLS setup, AnyTLS guide, sing-box AnyTLS, mihomo AnyTLS, TLS in TLS
---

# AnyTLS

AnyTLS is a TLS-based proxy protocol that uses padding and connection reuse to reduce the signature of TLS carried inside TLS: a good spare TCP line next to REALITY.

| | |
| --- | --- |
| Transport | TCP + TLS |
| Cores | sing-box (1.12 or later), mihomo (1.19.3 or later) |
| Domain and certificate | a certificate is needed; a self-signed one works |
| Shared port 443 | yes (`--mount-443`) |
| Common clients | sing-box 1.12+, mihomo-based clients (such as Clash Verge Rev) |

## From the menu

- sing-box: main menu **2** → **4 (Nodes)** → **4 (AnyTLS)**
- mihomo: main menu **3** → **4** → **4**

The menu can generate a self-signed certificate for you.

![sing-box AnyTLS node menu](/images/pm-anytls.en.png){.shot}

## From the command line

```bash
psm node add sing-box anytls --tag my-anytls --port 10443 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key
```

| Option | Meaning |
| --- | --- |
| `--password` | password; generated when left out |
| `--insecure 1` | for a self-signed certificate |
| `--mount-443` | put the node on shared port 443 |
| `--ech true` | add ECH |

## Export for clients

```bash
psm node export sing-box anytls my-anytls
```

![AnyTLS share link](/images/export-hk-anytls.en.png){.shot}
