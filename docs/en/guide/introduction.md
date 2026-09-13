---
title: What is PSM
description: PSM (Proxy Stack Manager) is a free, open-source tool that turns a VPS into your own proxy server. Xray, sing-box and mihomo, REALITY, Hysteria2 and TUIC nodes, accounts, quotas and migration, all behind one menu.
---

# What is PSM

PSM (Proxy Stack Manager) is a free, open-source Bash tool that turns a Linux VPS into your own proxy server. One command installs it; everything after that happens in the `psm` menu.

## What it does for you

- **Installs the cores**: Xray, sing-box and mihomo (Clash.Meta); one of them or all three.
- **Builds nodes**: VLESS REALITY / Vision / XHTTP, Hysteria2, TUIC v5, AnyTLS, Snell, Shadowsocks 2022, Trojan, VMess, SOCKS5 and WireGuard, with keys, UUIDs and passwords generated for you.
- **Hands them to clients**: standard share links, QR codes and subscriptions that phone and desktop clients import directly.
- **Runs the server**: Nginx, SSL certificates with automatic renewal, firewall, BBR, SSH hardening, traffic accounting, Telegram notifications, backups and migration.

## How it differs from a one-off install script

Many scripts stop once a protocol is installed; changing a port, the camouflage domain, renewing a certificate or moving servers is then up to you. PSM is built for **a server you keep running**:

- Every node is recorded in one place; changes are backed up first and rolled back if the core rejects the new config.
- Several protocols and cores run side by side, and can [share port 443](/en/features/port-443).
- [Per-user accounts](/en/features/users), [quotas and expiry dates](/en/features/traffic), [server migration](/en/features/migrate) and [diagnose-and-repair](/en/features/doctor) are built in.
- The proxy cores run as an unprivileged user with only the capabilities they need.

## Who it is for

- You have a VPS abroad and want your own proxy rather than a shared VPN or proxy service.
- You want protocols that hold up against censorship, such as REALITY and Hysteria2.
- You hand out access to family, friends or a small team.
- You need Netflix, ChatGPT and other services that block datacenter IPs.

## Who it is not for

- If you have no VPS and do not plan to rent one: PSM provides no servers or nodes.
- If you manage many servers centrally: PSM manages one server at a time and has no multi-server panel.

## License

PSM is open source under [AGPL-3.0](https://github.com/jinqians/proxy-stack/blob/main/LICENSE), written entirely in Bash, so you can read what it does. Use it within the law where you live.

Next: [Install](/en/guide/install).
