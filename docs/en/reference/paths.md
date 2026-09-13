---
title: "PSM files and install paths"
description: PSM installs to /opt/psm. The system paths it writes to, for Xray, sing-box, mihomo, Hysteria2, Nginx, acme.sh certificates, systemd services, cron jobs and firewall rules.
---

# Files and paths

PSM keeps its own files in `/opt/psm` where it can, but some features have to write to system directories.

| Path | What |
| --- | --- |
| `/opt/psm` | PSM itself, configuration, node records, backups |
| `/opt/psm/config` | nodes, users, subscriptions, traffic state (the heart of a migration bundle) |
| `/usr/local/bin/psm` | the `psm` command |
| `/usr/local/etc/xray`, `/usr/local/bin/xray` | Xray config and binary |
| `/etc/sing-box`, `/usr/local/bin/sing-box` | sing-box config and binary |
| `/etc/mihomo`, `/usr/local/bin/mihomo` | mihomo config and binary |
| `/etc/hysteria`, `/usr/local/bin/hysteria` | standalone Hysteria2 |
| `/etc/realm`, `/usr/local/bin/realm` | realm relay |
| `/etc/nginx` | Nginx sites, the port 443 routing table (`stream.d`) and certificates (`ssl`) |
| `/root/.acme.sh` | acme.sh account and certificate cache |
| `/etc/systemd/system/psm-*` | PSM's services and timers (`/etc/init.d` on OpenRC) |
| `/etc/cron.d/psm-*` | backup, DDNS and other cron jobs |
| `/var/log/psm` | service logs on OpenRC systems |

The proxy cores run as the system user `psm-core`, which can read only the core configs, their own state directories and the certificates their configs use.

Before using PSM on a server that already runs important websites, back up `/etc/nginx` or take a snapshot of the VPS.
