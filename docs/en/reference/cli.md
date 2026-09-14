---
title: "PSM CLI reference: psm node, core, standalone, traffic, agent, user, migrate, doctor"
description: Every PSM command-line command. psm node to list, add, update, delete and export nodes (REALITY, Hysteria2, TUIC, AnyTLS options, port 443 sharing, port hopping), psm core to install a core without questions, psm standalone for standalone Snell v4/v5/v6 and ss-rust, psm traffic for metering and limits, psm agent to join a PSM Panel, psm user for accounts, psm migrate, psm doctor, and the scheduled-job entry points.
---

# CLI reference

`psm` with no arguments opens the interactive menu. The commands below are for scripts and automation; add `help` or `--help` to any of them for the complete options.

## psm node: nodes

```bash
psm node list [--core CORE] [--protocol PROTO] [--json] [--show-secrets]
psm node show CORE PROTO TAG [--json] [--show-secrets]
psm node add CORE PROTO [--tag TAG] [--port PORT] [protocol options…] [--json]
psm node update CORE PROTO TAG [options to change…] [--json]
psm node delete CORE PROTO TAG --yes
psm node export CORE PROTO TAG [--server HOST] [--format uri|json|surge|singbox]
```

`CORE` is `xray`, `sing-box` (or `singbox`) or `mihomo`. `--format singbox` prints the node as a sing-box client outbound (JSON).

| Core | Protocols |
| --- | --- |
| xray | reality, vision, xhttp, ss2022, trojan, vmess, socks, hysteria2 |
| sing-box | reality, ss2022, hysteria2, anytls, snell, trojan, vmess, socks, vless, tuic, wireguard |
| mihomo | reality, ss2022, hysteria2, anytls, snell, trojan, vmess, socks, vless, tuic |

A full guide for each protocol (menu path, options, export, screenshots) is in [Protocol guides](/en/protocols/).

Common protocol options:

| Protocol | Options |
| --- | --- |
| reality | `--port`, with `--server-name` and `--dest` for the camouflage target |
| vision | `--port --domain` |
| xhttp | `--port --domain [--mode xhttp\|upgrade\|ws\|grpc\|httpupgrade\|h2\|mkcp\|reality-layer]` |
| hysteria2 | `--port --sni --cert-path --key-path [--password] [--obfs-pass [--obfs-type salamander\|gecko]] [--hop-ports START-END]` |
| tuic | `--port --sni --cert-path --key-path [--uuid] [--password] [--congestion-control bbr\|cubic\|new_reno]` |
| anytls | `--port --sni --cert-path --key-path [--password]` |
| vless (sing-box / mihomo) | `--port --sni --cert-path --key-path [--transport tcp\|ws\|grpc\|…] [--path]` |
| trojan / vmess | `--port --domain` |
| ss2022 | `--port [--method] [--password]` |
| socks | `--port [--listen-addr 127.0.0.1\|0.0.0.0] [--username] [--password]` (public listeners require credentials) |
| snell | `--port [--version] [--psk]` |
| wireguard | `--port [--peer-count N]` (export prints a wg-quick file per client) |

Other options:

- `--mount-443`: mount the node on [shared port 443](/en/features/port-443); port, domain and deletion changes keep the routing table in step.
- `--vless-enc x25519|mlkem768`: VLESS Encryption (post-quantum).
- `--skip-dest-probe`: skip the real handshake test of a REALITY target before creating the node.
- Queries hide keys and passwords unless `--show-secrets` is given; `export` includes the credentials clients need.
- A change the core rejects is rolled back, node record and live config alike.

## psm core: installing a core

```bash
psm core list [--json]
psm core install xray|sing-box|mihomo [--if-missing] [--json]
```

Installs a core without questions (the latest stable release and its service), skipping the menu's wizard. `--if-missing` does nothing when it is installed. [PSM Panel](/en/features/panel) uses it before a server's first node on that core.

## psm standalone: standalone Snell and ss-rust

```bash
psm standalone install snell  --port PORT [--psk PSK] [--version 4|5|6] [--json]
psm standalone install ss2022 --port PORT [--password KEY] [--method METHOD] [--json]
psm standalone show    snell|ss2022 [--json]
psm standalone export  snell|ss2022 [--server HOST] [--name NAME] [--format uri|surge|singbox]
psm standalone remove  snell|ss2022 --yes [--json]
```

Installs the official snell-server (v4, v5 or v6: the newest official build of that major version; v6 is still a beta upstream, so its newest beta or release candidate) or ss-rust without questions, on systemd and OpenRC, into the same config files the menus use, so the menus, traffic metering and subscription exports see them as before. Running `install` again replaces what is running (a new port or key).

- ss2022 `--method`: `2022-blake3-aes-128-gcm` (default), `2022-blake3-aes-256-gcm`, `2022-blake3-chacha20-poly1305`; `--password` is the base64 key (16 bytes for aes-128, 32 for the others). The PSK and key are generated when not given.
- `export`: a Surge line for Snell; an `ss://` link for ss2022 (`--format surge` for a Surge line, `singbox` for a sing-box outbound).
- The official snell-server does not run on musl (Alpine): it is refused there with that reason; run Snell on sing-box or mihomo on Alpine.

## psm traffic: metering and limits

```bash
psm traffic list [--json]
psm traffic set TAG [--limit-bytes N | --limit-gb N] [--reset-day 1-28] [--json]
psm traffic reset TAG [--json]
psm traffic unset TAG [--json]
```

`TAG` is a node's name, or `snell` / `ss2022` for the standalone servers (as in the traffic menu: both work on the same state).

- `set` enrols a node and sets its limit; a limit of 0 meters without limiting. The first `set` installs the every-minute check.
- A node over its limit is paused until the monthly reset day or `psm traffic reset`; raising the limit also lifts the pause.
- `list` brings the counters up to date first.

## psm agent: joining a PSM Panel

```bash
psm agent join --panel URL --token TOKEN
psm agent status [--json]
psm agent remove --yes
```

`join` downloads psm-agent (checked against the release's SHA256SUMS), joins the panel with its one-time token and runs it as a service. psm-agent listens on no port. Usually you run the install command the panel gives you (it installs or updates PSM first, then calls `psm agent join`); see [PSM Panel](/en/features/panel). `remove` disconnects from the panel and deletes psm-agent; the nodes stay.

## psm version

Prints PSM's version (the date and commit of the checkout).

## psm user: accounts

```bash
psm user add NAME [--nodes all|TAG,TAG] [--days N | --expires YYYY-MM-DD] [--quota SIZE] [--json]
psm user list [--json]
psm user show NAME [--json] [--show-secrets]
psm user update NAME [--nodes …] [--days N | --expires DATE | --no-expiry]
                     [--quota SIZE | --no-quota] [--reset-usage] [--enable | --disable] [--json]
psm user delete NAME [--json]
psm user links NAME [--server ADDR]
psm user token NAME [--json]
```

`SIZE` is bytes or a number with K, M, G or T (1G = 1024³). A quota counts the user's traffic through Xray nodes per calendar month. See [Per-user accounts](/en/features/users).

## psm migrate: moving servers

```bash
psm migrate export [--output FILE] [--encrypt]
psm migrate import FILE [--yes] [--force]
psm migrate push [USER@]HOST [--port N] [--identity KEY] [--force]
```

See [Moving to a new server](/en/features/migrate).

## psm doctor: diagnosis

```bash
psm doctor [--human|--json] [--fix]
```

Exit code `0` healthy, `1` something critical, `2` usage error. See [Diagnose and repair](/en/features/doctor).

## Scheduled-job entry points

"Enable scheduled job" in the menu registers these for you; you rarely call them by hand:

```bash
psm --traffic-check        # traffic accounting, quotas and account checks
psm --backup-full          # full backup
psm --ruleset-update       # refresh subscribed rule sets
psm --reality-watchdog     # health-check REALITY camouflage targets
psm --vpngate-watchdog     # check the residential exit tunnel
psm --health-report        # send the daily health report
psm --ddns-update          # Cloudflare DDNS update
psm --update               # update PSM
```
