---
title: "Diagnose and repair: psm doctor --fix"
description: psm doctor checks the system, dependencies, config files, core services, boot start, certificates, disk and port-hopping rules; psm doctor --fix restarts stopped cores, re-enables boot start, rebuilds redirect rules, renews certificates and installs missing tools, then checks again.
---

# Diagnose and repair

When a node stops working, or something is off after a reboot, run:

```bash
psm doctor
```

It checks item by item (ok / warning / critical / skipped) and ends by telling you how many problems it can repair.

![psm doctor report](/images/doctor.en.png){.shot}

## Repairing

```bash
psm doctor --fix
```

Everything it knows a safe repair for gets repaired, and then everything is checked again:

| Problem | Repair |
| --- | --- |
| A core service stopped | config checked, then restarted; a missing service definition is written first |
| A core still runs as root | moved to the unprivileged user `psm-core` |
| Not started at boot | re-enabled |
| Port-hopping redirect rules lost | rebuilt from the node records |
| curl, jq or openssl missing | installed; a jq that is too old (1.6) is replaced |
| A certificate about to expire | renewed through acme.sh |
| Disk nearly full | journal, oversized PSM logs and the package cache cleaned |

A config file with errors is only reported, never rewritten, so a repair cannot make things worse. `--fix` needs root.

## For scripts and monitoring

```bash
psm doctor --json
```

Structured JSON; exit code `0` healthy, `1` something critical, `2` usage error. Plug it into your own monitoring or cron jobs.
