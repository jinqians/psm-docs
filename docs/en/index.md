---
layout: home
title: "PSM: one-command proxy server setup on a VPS (Xray, sing-box, mihomo)"
titleTemplate: false
description: PSM is an open-source script that turns a VPS into your own proxy server in one command. VLESS REALITY, Hysteria2, TUIC, AnyTLS and Snell nodes on Xray, sing-box and mihomo, with port 443 sharing, subscriptions, per-user accounts, traffic quotas and server migration.

hero:
  name: PSM
  text: Your own proxy server on a VPS, in one command
  tagline: Installs Xray, sing-box and mihomo. REALITY, Hysteria2 and TUIC nodes in minutes, with accounts, traffic quotas and one-command migration.
  image:
    src: /logo.svg
    alt: PSM proxy server manager
  actions:
    - theme: brand
      text: Quick start
      link: /en/guide/quick-start
    - theme: alt
      text: Install
      link: /en/guide/install
    - theme: alt
      text: GitHub
      link: https://github.com/jinqians/proxy-stack

features:
  - icon: 🚀
    title: One command to install
    details: Run one line as root on your VPS; afterwards, everything is in one menu behind the psm command.
    link: /en/guide/install
  - icon: 🛡️
    title: Censorship-resistant protocols
    details: VLESS REALITY / Vision / XHTTP, Hysteria2 with port hopping, TUIC v5, AnyTLS, Snell, Shadowsocks 2022, Trojan, VMess and WireGuard.
    link: /en/guide/choose-protocol
  - icon: 🧩
    title: Xray, sing-box and mihomo
    details: All three cores can run side by side on one server, each with its own nodes.
    link: /en/guide/cores
  - icon: 🔒
    title: Share port 443
    details: Many nodes behind one port 443, routed by domain; unknown names are dropped, so scanners find nothing.
    link: /en/features/port-443
  - icon: 📱
    title: Links, QR codes, subscriptions
    details: Standard share links, QR codes and subscriptions for v2rayN, Clash Verge Rev, Shadowrocket, sing-box and other clients.
    link: /en/features/subscription
  - icon: 👥
    title: Accounts and traffic quotas
    details: Each person gets their own UUID / password, expiry date and subscription URL; accounts pause when they expire or run out.
    link: /en/features/users
  - icon: 🎬
    title: Unlock Netflix and ChatGPT
    details: Route streaming and AI services through Cloudflare WARP or a residential exit, by rule, while everything else stays direct.
    link: /en/features/unlock
  - icon: 📦
    title: Move to a new server
    details: psm migrate push root@new-server carries nodes, keys and certificates over; clients keep working.
    link: /en/features/migrate
  - icon: 🩺
    title: Diagnose and repair
    details: psm doctor --fix checks services, certificates, boot start and firewall rules, and repairs what it can.
    link: /en/features/doctor
---

## Install

As root on your VPS:

```bash
bash <(curl -fsSL https://psm.jinqians.com)
```

Then run `psm` to open the menu. Requirements, Alpine and uninstalling: [Install](/en/guide/install).

## Who it is for

- **You have a VPS and want your own proxy** instead of a shared VPN or proxy service, with the bandwidth and IP to yourself.
- **You need protocols that survive censorship**: REALITY, Hysteria2, TUIC and AnyTLS, several at once if you like.
- **You share access with family or friends**: separate credentials and subscriptions, with expiry dates and monthly quotas.
- **You want Netflix or ChatGPT to work**: route them through WARP or a residential exit when the datacenter IP is blocked.
- **You move servers now and then**: one command moves the whole setup to a new VPS.

## Common questions

- [How do I set up a proxy server on a VPS?](/en/faq#how-to-build)
- [REALITY, Hysteria2 or TUIC?](/en/guide/choose-protocol)
- [Which systems are supported?](/en/reference/systems)
- [More questions](/en/faq)
