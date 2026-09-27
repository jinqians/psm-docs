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

Traps on ports where the server runs nothing, such as RDP, MSSQL and Telnet. A connection there can only be a scan: the IP is banned for 7 days (every port, SSH included), longer for each repeat up to 4 weeks, and a Telegram alert goes out. Never for good: scanning your own server with nmap or a monitor would otherwise lock you out permanently, and enabling the honeypot puts the address you are connected over SSH from on the allow-list. Ports in use by SSH, your proxy nodes and Docker services are left alone. The trap rules go first in the firewall, so they work with ufw or firewalld enabled.

## Built into PSM

- **The proxy cores run as the unprivileged user `psm-core`**, with only two capabilities: low ports and the routing mark.
- With [port 443 sharing](/en/features/port-443), connections for unknown names are dropped, so scanners find no node.
- PSM warns when a REALITY camouflage target sits behind a CDN, which would turn your server into a free relay.
- Config changes are backed up first and rolled back if the core rejects them.

## What PSM downloads

| What | From | Checked by |
| --- | --- | --- |
| PSM itself (install, update) | the installer at `psm.jinqians.com`, then a clone of the GitHub repository | HTTPS: you trust that site and the repository. An update saves your own edits to the scripts as a patch before resetting them |
| psm-agent | its GitHub release | the release's `SHA256SUMS` (integrity; a tampered release page is not caught — there is no separate signature) |
| acme.sh | a pinned release on GitHub (3.1.6) | the SHA-256 written in PSM; a mismatch installs nothing — no more `curl … \| sh` |
| geoip / geosite rule files | the rule project's releases | the `.sha256sum` published beside each; a mismatch or a failed download keeps the files in use |
| Xray, sing-box, mihomo, realm, gost | each project's official GitHub releases | HTTPS only, no checksum of its own; the version and a config check once installed |
| Docker (only for features that use it) | Docker's installer, `get.docker.com` | HTTPS; Docker's own recommended way, the script itself is not signed |

The installer's environment variables (`PSM_REPO`, `PSM_AGENT_BASE_URL` and the like) exist for tests and self-hosted mirrors: if someone asks you to run the install command with unfamiliar ones set, do not.

[Migration bundles](/en/features/migrate) are encrypted with a passphrase by default; the `SHA256SUMS` inside catches damage in transit, not tampering — the encryption, and moving bundles over SSH only, is what protects them.
