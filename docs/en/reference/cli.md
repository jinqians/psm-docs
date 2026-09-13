---
title: "PSM CLI reference: psm node, user, migrate, doctor"
description: Every PSM command-line command. psm node to list, add, update, delete and export nodes (REALITY, Hysteria2, TUIC, AnyTLS options, port 443 sharing, port hopping), psm user for accounts, psm migrate, psm doctor, and the scheduled-job entry points.
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
psm node export CORE PROTO TAG [--server HOST] [--format uri|json|surge]
```

`CORE` is `xray`, `sing-box` (or `singbox`) or `mihomo`.

| Core | Protocols |
| --- | --- |
| xray | reality, vision, xhttp, ss2022, trojan, vmess, socks, hysteria2 |
| sing-box | reality, ss2022, hysteria2, anytls, snell, trojan, vmess, socks, vless, tuic, wireguard |
| mihomo | reality, ss2022, hysteria2, anytls, snell, trojan, vmess, socks, vless, tuic |

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
