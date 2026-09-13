---
title: Install PSM
description: Install PSM on a VPS with one command. Debian, Ubuntu, Alpine and RHEL / Rocky / AlmaLinux on x86_64 and arm64. Requirements, Alpine, manual install, updating and uninstalling.
keywords: install PSM, one-command install, install Xray, install sing-box, install mihomo
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"HowTo","name":"Install PSM on a VPS","description":"Install the PSM proxy server manager on a VPS with one command","tool":[{"@type":"HowToTool","name":"A Linux VPS with root access"}],"step":[{"@type":"HowToStep","name":"Log in as root","text":"Log in to your VPS over SSH as root."},{"@type":"HowToStep","name":"Run the installer","text":"bash <(curl -fsSL https://psm.jinqians.com)"},{"@type":"HowToStep","name":"Open the menu","text":"When the installer finishes, run psm."}]}'
---

# Install

## Before you start

- A Linux VPS you can log in to as **root**. PSM installs system services, certificates and firewall rules, so it needs root.
- Architecture: x86_64 or arm64.
- System: Debian, Ubuntu, Alpine or the Red Hat family (Rocky Linux, AlmaLinux, …). Versions and test coverage: [Supported systems](/en/reference/systems).
- Only `bash` and `curl` (or `wget`) need to be there already; everything else is installed the first time it is needed.

## Install

As root, run one of these:

```bash
# with curl (recommended)
bash <(curl -fsSL https://psm.jinqians.com)

# with wget, if curl is missing
bash <(wget -qO- https://psm.jinqians.com)
```

The installer asks for the interface language, installs what PSM needs and registers the `psm` command. Then run:

```bash
psm
```

to open the menu, and continue with the [quick start](/en/guide/quick-start).

### Alpine

A fresh Alpine has no bash; use this line instead (it installs bash with apk first):

```bash
wget -qO- https://psm.jinqians.com | sh
```

### Manual install

```bash
git clone https://github.com/jinqians/proxy-stack.git /opt/psm
bash /opt/psm/install.sh
```

## Update

Run the install command again, or choose "Update PSM" in the menu. Local edits to PSM's own files are saved as a patch file first, not thrown away.

## Uninstall

```bash
bash /opt/psm/uninstall.sh
```

The uninstaller removes the commands, services and scheduled jobs PSM created. Components other things may share, such as Nginx, certificates and Docker apps, are removed only after asking you one by one.
