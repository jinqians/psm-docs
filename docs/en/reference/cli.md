---
title: "PSM CLI reference: psm node, relay, core, standalone, traffic, agent, user, migrate, doctor"
description: Every PSM command-line command. psm node to list, add, update, delete and export nodes (REALITY, Hysteria2, TUIC, AnyTLS options, port 443 sharing, port hopping), psm relay for relays (realm port forwarding, with the hop optionally wrapped in TLS), psm core to install a core without questions, psm standalone for standalone Snell v4/v5/v6 and ss-rust, psm traffic for metering and limits, psm agent to join a PSM Panel, psm user for accounts, psm migrate, psm doctor, and the scheduled-job entry points.
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
psm node export CORE PROTO TAG [--server HOST] [--format uri|json|surge|singbox|clash]
```

`CORE` is `xray`, `sing-box` (or `singbox`) or `mihomo`. `--format singbox` prints the node as a sing-box client outbound (JSON); `--format clash` prints the node as one complete mihomo proxy (JSON): the TLS protocols (Hysteria2, TUIC, AnyTLS, VLESS + TLS, Trojan, VMess), REALITY, Vision, SS2022, SOCKS5 and Xray's XHTTP nodes (not mKCP: mihomo's VLESS has no mKCP).

`psm node add` asks no questions, so:

- **Certificates**: the TLS protocols of sing-box / mihomo and Xray's Hysteria2 need no `--cert-path` / `--key-path`. When `/etc/nginx/ssl/<domain>/` holds a certificate for the `--sni` domain, it is used; otherwise PSM makes a self-signed one (for `www.bing.com` when there is no `--sni`), records `insecure = 1`, and every export carries that certificate's fingerprint so clients verify it rather than skip: `pcs` (vless/trojan/vmess) or `pinSHA256` (hysteria2) in the links, next to `allowInsecure=1` / `insecure=1` for clients that do not read a fingerprint; `fingerprint` in `--format clash`; `certificate_public_key_sha256` instead of `insecure` in `--format singbox` (sing-box 1.13+). Xray refuses `allowInsecure` since 2026-06-01, and Xray-based clients such as v2rayN read only `pcs`. Xray's vision / xhttp / trojan / vmess need a certificate for `--domain` already; without one the node is refused with the reason (instead of Xray refusing its whole config).
- **Exits**: `--exit warp|vpngate [--exit-sites all|ai|streaming|GEOSITE,…] [--exit-country CC]` sends this node's traffic — all of it, or only those sites (ai = OpenAI, Anthropic, Gemini; streaming = Netflix, Disney+, HBO, Prime Video, Spotify) — out through Cloudflare WARP or the free residential line (VPNGate; the first time, a residential line in country CC, default JP); the rest goes out directly. `--exit none`, or deleting the node, removes the rule. `psm exit status|warp|vpngate [--core CORE] [--json]` shows or prepares the two exits.
- **REALITY camouflage targets**: `psm sni find [--engine netlas|quake|zoomeye|fofa] [--key-stdin] [--json]` asks a cyberspace-mapping engine for hosts with certificates in this server's own ASN, checks each with a TLS handshake and lists the usable SNI and dest by latency; `--key-stdin` reads the engine's API key from stdin for that search only.
- **Firewall**: when ufw, firewalld or a default-deny iptables is enforcing, the node's port is opened (UDP for Hysteria2 / TUIC / WireGuard / mKCP, TCP and UDP for SS2022 / Snell / SOCKS), and the rule PSM added is removed when the node is deleted or moves to another port; a port that was already open is left alone. Nodes listening on 127.0.0.1 are not opened.

## psm relay: relays (realm)

```bash
psm relay list [--json]
psm relay show TAG [--json]
psm relay add --tag TAG --listen-port PORT --remote-host HOST --remote-port PORT
              [--udp] [--tls] [--tls-sni NAME] [--tls-cert FILE] [--tls-key FILE]
              [--tls-insecure] [--no-firewall] [--json]
psm relay update TAG [--listen-port PORT] [--remote-host HOST] [--remote-port PORT]
              [--udp true|false] [--tls true|false] [--tls-sni NAME] [--json]
psm relay delete TAG --yes [--if-exists] [--json]
psm relay probe [TAG] [--samples N] [--json]
psm relay install [--json]
```

The non-interactive side of [relays](/en/features/relay). The rules share the menu's own store (`config/realm/rules.json`), from which realm's `config.toml` is generated, so a relay made from the menu and one made here are the same thing. Only the **entry** machine needs a rule; the landing machine's nodes stay as they are. realm is installed on first use (`psm relay add` does it, or run `psm relay install` first).

**Encrypting the hop**: add `--tls` and realm wraps the forwarded stream in TLS, so what travels between the two machines no longer looks like the node's own protocol. Which side a rule is follows from where it forwards — to this machine (`127.0.0.1`, or any of its own addresses) it is the **landing** side, which terminates TLS and holds the certificate (`--tls-cert`/`--tls-key`, else a self-signed pair made for `--tls-sni`); to another host it is the **entry** side, which dials it (`--tls-sni` is required, with `--tls-insecure` when the other end is self-signed).

```bash
# landing: terminate TLS, hand it to the node on port 443 here
psm relay add --tag out --listen-port 8443 \
    --remote-host 127.0.0.1 --remote-port 443 --tls

# entry: dial TLS to the landing machine
psm relay add --tag in --listen-port 443 \
    --remote-host LANDING_IP --remote-port 8443 \
    --tls --tls-sni relay.example.com --tls-insecure
```

- **`--tls` covers TCP only**: realm's TLS wraps TCP streams, so with `--udp` the UDP half keeps going as plain UDP. Protocols that matter over UDP (Hysteria2, TUIC, WireGuard) are not hidden by it.
- **Firewall**: the listening port is opened as a node's is (TCP and UDP with `--udp`), and changing the port or deleting the rule closes **only what PSM opened** (recorded in `config/firewall-ports`) — a port you opened yourself is left alone. `--no-firewall` leaves the firewall untouched.
- **Link quality and traffic**: `psm relay probe` reports the round trip to the landing machine, the jitter, the loss, and the bytes this relay has carried. The round trip is measured with plain TCP connects rather than with ping: ICMP is filtered often enough on these networks that ping would report loss that is not there, and a relay carries TCP anyway, so a connect is what the traffic actually experiences. Jitter is the mean absolute difference between consecutive round trips. A landing side that never answers gives `rtt_ms: null` and 100% loss instead of a made-up number. Traffic is counted on the listening port through `PSM_TRF`, the same accounting chain the nodes use (tagged `relay-<TAG>`, so it cannot collide with a node's), and the rules follow the relay as it is created, moved to another port and deleted. On a server that joined a panel, psm-agent measures every 60 seconds and sends the readings with its sync; the panel keeps 7 days of them for its charts.

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
| hysteria2 | `--port [--sni] [--cert-path --key-path] [--password] [--obfs-pass [--obfs-type salamander\|gecko]] [--hop-ports START-END]` |
| tuic | `--port [--sni] [--cert-path --key-path] [--uuid] [--password] [--congestion-control bbr\|cubic\|new_reno]` |
| anytls | `--port [--sni] [--cert-path --key-path] [--password]` |
| vless (sing-box / mihomo) | `--port [--sni] [--cert-path --key-path] [--transport tcp\|ws\|grpc\|…] [--path]` |
| trojan / vmess | Xray: `--port --domain`; sing-box / mihomo: `--port [--sni] [--cert-path --key-path]` |
| ss2022 | `--port [--method] [--password]` |
| socks | `--port [--listen-addr 127.0.0.1\|0.0.0.0] [--username] [--password]` (public listeners require credentials) |
| snell | `--port [--version] [--psk]` |
| wireguard | `--port [--peer-count N]` (export prints a wg-quick file per client) |

Other options:

- `--mount-443`: mount the node on [shared port 443](/en/features/port-443); port, domain and deletion changes keep the routing table in step.
- `--vless-enc x25519|mlkem768|none`: VLESS Encryption (post-quantum); on `update` it turns it on, switches the kind or turns it off (`none`). Xray's mKCP nodes have it by default (new Xray clients refuse unencrypted VLESS).
- `--bbr-profile conservative|standard|aggressive`: the BBR profile of a Hysteria2 server (sing-box 1.14+, mihomo 1.19.24+, Xray v26.4.13+).
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
psm agent upgrade
psm agent remove --yes
```

`join` downloads psm-agent (checked against the release's SHA256SUMS), joins the panel with its one-time token and runs it as a service. psm-agent listens on no port. Usually you run the install command the panel gives you (it installs or updates PSM first, then calls `psm agent join`); see [PSM Panel](/en/features/panel). `remove` disconnects from the panel and deletes psm-agent; the nodes stay.

`upgrade` updates PSM first and then replaces psm-agent with the release that the updated PSM names, restarting the service. The order matters: the version to install lives in PSM's own `lib/agent.sh`. The panel's **升级 agent** button on the servers page makes psm-agent run this command, so no SSH is needed. Nodes, relays and traffic accounting are left alone.

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
