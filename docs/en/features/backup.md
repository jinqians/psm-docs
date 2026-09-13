---
title: "Backup and restore: full backups, selective backups, daily automatic backups"
description: PSM backs up the configuration of every component in one step, or just the ones you choose, with daily automatic backups and one-step restore; it also takes a quick backup before updating itself.
keywords: VPS backup, proxy config backup, PSM restore, automatic backup
---

# Backup and restore

Keep a backup before changing things, and restore it in one step if something goes wrong. PSM also takes a quick backup before it updates itself.

Everything is in main menu **17 (Backup)**:

![Backup and restore menu](/images/backup.en.png){.shot}

| Option | What it does |
| --- | --- |
| Full backup (all components) | backs up the configuration of everything PSM manages |
| Selective backup | only the components you choose |
| Restore from backup | pick a backup to restore (main menu **18 (Restore)** goes straight there) |
| List backups | see the backups you have |
| Enable / disable automatic backups | a full backup every day |

Backups are `.tar.gz` files in `/opt/psm/backup/`. A full backup from the command line:

```bash
psm --backup-full
```

## Moving to another server

Backups are for going back on **the same server**. To move your nodes to **another server**, use [migration](/en/features/migrate): it installs what the new server needs, rebuilds the services and rewrites subscription addresses, which is far less work than restoring a backup by hand.
