---
title: "Hardening your proxy VPS: SSH keys, Fail2ban and honeypots"
description: PSM hardens your VPS. SSH key login and a new port with a 5-minute automatic rollback so you cannot lock yourself out, Fail2ban against brute force, honeypot ports that catch scanners, proxy cores running unprivileged, unknown names dropped on port 443.
---

# Server hardening

Everything here is in main menu **20 (Security)**:

![Security menu](/images/security.en.png){.shot}

## SSH

- Switch to **key login**, turn off password login and change the SSH port, each in one step.
- Risky changes are applied with a reload, so your current session stays connected.
- Every change has a **5-minute confirmation window**: if you do not confirm (say, the new settings lock you out), it is undone automatically.

## Fail2ban

- Bans IPs after too many failed SSH logins.
- Repeat offenders are banned for longer.
- An IP allow-list is supported.

## Honeypot

Traps on ports where the server runs nothing, such as RDP, MSSQL and Telnet. A connection there can only be a scan, so the IP is banned permanently and a Telegram alert goes out. Ports in use by SSH, your proxy nodes and Docker services are left alone.

## Built into PSM

- **The proxy cores run as the unprivileged user `psm-core`**, with only two capabilities: low ports and the routing mark.
- With [port 443 sharing](/en/features/port-443), connections for unknown names are dropped, so scanners find no node.
- PSM warns when a REALITY camouflage target sits behind a CDN, which would turn your server into a free relay.
- Config changes are backed up first and rolled back if the core rejects them.
