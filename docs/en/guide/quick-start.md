---
title: "Quick start: your first VLESS REALITY node on a VPS in 5 minutes"
description: Step by step, set up your first proxy node with PSM. Install PSM and Xray, create a VLESS REALITY node, export its share link and QR code, and import it into v2rayN, Shadowrocket, Clash Verge Rev or another client.
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"HowTo","name":"Set up a VLESS REALITY node on a VPS with PSM","totalTime":"PT5M","step":[{"@type":"HowToStep","name":"Install PSM","text":"As root: bash <(curl -fsSL https://psm.jinqians.com)"},{"@type":"HowToStep","name":"Install Xray","text":"Run psm, choose 4. Xray, then 1. Install"},{"@type":"HowToStep","name":"Create a REALITY node","text":"psm node add xray reality --tag my-reality --port 443 --server-name TARGET --dest TARGET:443"},{"@type":"HowToStep","name":"Export the link and QR code","text":"psm node export xray reality my-reality, or 12. View node links and QR codes in the Xray menu"},{"@type":"HowToStep","name":"Import into a client","text":"Paste the link or scan the QR code in v2rayN, Shadowrocket, Clash Verge Rev or another client"}]}'
---

# Quick start

This page gets your first node running: **VLESS REALITY**. It needs no domain and no certificate, and it is currently the least fuss with strong censorship resistance.

## 1. Install PSM

Log in to the VPS as root and run:

```bash
bash <(curl -fsSL https://psm.jinqians.com)
```

Then run `psm` to see the main menu:

![PSM main menu](/images/menu.en.png){.shot}

## 2. Install Xray

In the main menu choose **4 (Xray)**, then **1 (Install)**, and follow the prompts.

![Xray menu](/images/xray.en.png){.shot}

## 3. Create a REALITY node

REALITY needs a camouflage target: a real website that speaks TLS 1.3, and not one behind a CDN (why: [Choosing a protocol](/en/guide/choose-protocol#reality-target)).

In the Xray menu choose **4 (Nodes)** and follow the prompts, or in one command:

```bash
psm node add xray reality --tag my-reality --port 443 \
  --server-name TARGET --dest TARGET:443
```

PSM first tries a real handshake with that target through the core itself; if it fails, you are told, and no broken node gets created.

## 4. Get the share link and QR code

```bash
psm node export xray reality my-reality
```

prints a link starting with `vless://`. In the Xray menu, **12 (View node links and QR codes)** also shows the QR code.

## 5. Import it into a client

| Platform | Common clients | How |
| --- | --- | --- |
| Windows | v2rayN, Clash Verge Rev | copy the link, then "import from clipboard" |
| macOS | Clash Verge Rev, sing-box | same |
| Android | v2rayNG, NekoBox, sing-box | scan the QR code or import from clipboard |
| iOS | Shadowrocket, Stash, sing-box | scan the QR code |

Select the node, turn the proxy on, and open any website to check.

## Next

- Add a [Hysteria2](/en/guide/choose-protocol) node for lossy networks (UDP, faster on bad links).
- Put several nodes on one port: [Sharing port 443](/en/features/port-443).
- Give family and friends their own access: [Per-user accounts](/en/features/users).
- Import every node at once: [Subscriptions](/en/features/subscription).
