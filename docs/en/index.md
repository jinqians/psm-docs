---
layout: home
title: "PSM: one-command proxy server setup on a VPS (Xray, sing-box, mihomo)"
titleTemplate: false
description: PSM is an open-source script that installs Xray, sing-box and mihomo on a VPS in one command. REALITY, Hysteria2, Snell, Shadowsocks 2022, AnyTLS and TUIC nodes ready to use, with WARP routing, a free residential exit, custom routing, traffic monitoring and multi-user management.

hero:
  name: PSM
  text: Your own proxy server on a VPS, in one command
  tagline: One-command install of Xray / sing-box / mihomo. REALITY, Hysteria2, Snell, Shadowsocks 2022, AnyTLS and TUIC nodes ready to use, with WARP routing, a free residential exit, custom routing, traffic monitoring and multi-user management.
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
  - icon: 🏠
    title: Free residential exit
    details: Picks genuine home-broadband IPs as an exit, so Netflix and ChatGPT see a residential IP; fails over within the same country.
    link: /en/features/residential
  - icon: 🎬
    title: WARP and custom routing
    details: Cloudflare WARP as an exit, and routing by domain, GeoSite or subscribed rule set; everything else stays direct.
    link: /en/features/unlock
  - icon: 🔒
    title: Share port 443
    details: Many nodes behind one port 443, routed by domain; unknown names are dropped, so scanners find nothing.
    link: /en/features/port-443
  - icon: 📱
    title: Links, QR codes, subscriptions
    details: Standard share links, QR codes and subscriptions for v2rayN, Clash Verge Rev, Shadowrocket, sing-box and other clients.
    link: /en/features/subscription
  - icon: 👥
    title: Multi-user management
    details: Each person gets their own UUID / password, expiry date and subscription URL; accounts pause when they expire or run out.
    link: /en/features/users
  - icon: 📊
    title: Traffic monitoring
    details: Per-node traffic counted every minute, monthly quotas, a Telegram warning at 90% and an automatic pause when used up.
    link: /en/features/traffic
  - icon: 📦
    title: Move to a new server
    details: psm migrate push root@new-server carries nodes, keys and certificates over; clients keep working.
    link: /en/features/migrate
  - icon: 🩺
    title: Diagnose and repair
    details: psm doctor --fix checks services, certificates, boot start and firewall rules, and repairs what it can.
    link: /en/features/doctor
  - icon: 🔐
    title: Server hardening
    details: SSH key login with automatic rollback, Fail2ban, honeypots, and proxy cores that run unprivileged.
    link: /en/features/security
---
