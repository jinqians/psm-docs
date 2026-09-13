---
title: "Move your proxy server to a new VPS in one command"
description: psm migrate push moves a whole proxy server to a new VPS, with nodes, keys, UUIDs, certificates, acme.sh, Nginx port 443 routing, subscriptions and user accounts unchanged, so clients keep working. Encrypted export and import work too.
keywords: migrate VPS, move proxy server, server migration
---

# Moving to a new server

When you change VPS, you do not rebuild your nodes. PSM moves the whole server as it is: keys, UUIDs and passwords stay the same, so clients need no changes.

## One command

On the **old server**:

```bash
psm migrate push root@NEW-SERVER-IP
```

The new server only needs SSH access; nothing has to be installed there. PSM:

1. bundles every configuration on the old server;
2. copies PSM and the bundle over SSH (installing bash first on a bare Alpine);
3. installs the same core versions on the new server, restores the configuration, and recreates services, firewall rules and certificate renewal for the new system;
4. finishes with `psm doctor` and shows the result.

A different SSH port or a key:

```bash
psm migrate push root@NEW-SERVER-IP --port 2222 --identity ~/.ssh/id_ed25519
```

## Export, then import

If the old server cannot reach the new one directly, do it in two steps:

```bash
# old server: write an encrypted bundle (asks for a passphrase)
psm migrate export --encrypt

# copy the file over, install PSM on the new server, then
psm migrate import /root/psm-migrate-xxxx.tgz
```

::: danger The bundle holds every private key and password
Move it over SSH only and delete it after importing. Always use `--encrypt`.
:::

## What moves

| What | Notes |
| --- | --- |
| All nodes and keys | Xray, sing-box and mihomo configs and PSM's node records |
| Certificates and the acme.sh account | renewal is pointed at the new server |
| Nginx port 443 routing and camouflage sites | Nginx is reinstalled on the new server |
| Online subscriptions and user accounts | same subscription URLs, with the new server's IP inside |
| Port hopping, traffic accounting, scheduled jobs | registered again on the new system |

Standalone Hysteria2, ss-rust, Snell and realm move their configs only; install the programs again from the menu on the new server.

## Afterwards

- **Nodes reached by domain**: point the domain at the new server's IP, and clients carry on.
- **Nodes reached by IP**: the IP in the share links changed; send the links again, or let clients refresh their subscription.

An import onto a server that already has nodes is refused unless you add `--force` (the existing setup is backed up first). Moving between Debian and Alpine in either direction has been tested.
