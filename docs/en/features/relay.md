---
title: "Relays: plain forwards and encrypted tunnels, realm and gost, load balancing and failover"
description: Turn a VPS into a relay with PSM - realm or gost port forwarding (TCP and UDP), an entry → exit → landing tunnel over TLS or WebSocket with the exit's certificate pinned, several landing servers shared round-robin or with failover and health checks, rate limits, monthly quotas and expiry dates, ports picked for you and batches - from the psm relay command or the PSM panel.
keywords: relay server setup, realm port forwarding, gost tunnel, relay load balancing, failover, relay rate limit, relay quota, landing server, UDP forwarding
---

# Relays

A relay puts another server between the client and the node: the client connects to the **entry server**, which carries the traffic on to the **landing server** (the VPS that actually runs the node). Typical uses: an entry point with a better route, one entry for several landing servers, or switching to another landing server by itself when one goes down.

PSM has two ways to relay and two programs to do it:

| | Forward | Tunnel |
| --- | --- | --- |
| Path | entry → landing | entry → **exit** → landing |
| Between the entry and the next hop | the traffic as it is (realm can wrap it in TLS, TCP only) | gost's relay protocol over TLS or WebSocket, with a password; UDP travels inside |
| Program | realm (the default) or gost | gost |
| For | a route from entry to landing that is fine as it is | an entry-to-exit leg that must be encrypted or disguised, or go through a CDN |

- **realm**: light; forwards TCP and UDP, and shares several landing servers round-robin or by client IP.
- **gost**: can also pick **at random** or **fail over** (the first landing server that answers), checking each one over TCP every 15 seconds and leaving out one that does not answer; can **limit the rate**; tunnels are gost's alone.

Each program is installed the first time it is needed; they do not interfere (gost runs as the `psm-gost` service and leaves a gost of your own alone).

## From the PSM panel (recommended)

Once the servers have joined the [PSM panel](/en/features/panel), open its **中转** page and click **新建中转**: pick the entry server, the way to relay and the program, add the landing servers (several if you like), and leave the listening port empty to have one picked from the server's range. For a tunnel, pick an **exit server** too: the panel sets up the exit first, takes its certificate, then sets up the entry, which accepts that one certificate only. **批量添加** makes many at once, one per line.

The list shows both ends' state, each hop's round trip and loss, the traffic, quota and expiry; a row opens onto charts of the round trip, loss and traffic, and the health of each landing server. The panel documentation has the [whole chapter](https://psm-panel-docs.pages.dev/guide/relays).

## From the command line: psm relay

```bash
# a forward: port 5000 here → the node on the landing server (realm, TCP and UDP)
psm relay add --tag hk --listen-port 5000 --target 1.2.3.4:443 --udp

# two landing servers with failover (gost, with health checks), the port picked for you
psm relay add --tag hk2 --listen-port auto --engine gost --strategy fifo \
    --target 1.2.3.4:443 --target 5.6.7.8:443 --udp

# 100 Mbit/s, 500 GB a month reset on the 1st, expiring at the end of the year
psm relay update hk2 --speed 100 --limit-gb 500 --reset-day 1 --expires 2026-12-31
```

A tunnel is two rules with the same name. Make the **exit** first; it prints the command for the entry (with the password and the certificate's fingerprint):

```bash
# on the exit: forward to the landing side (here, the exit's own node)
psm relay add --tag tun --mode tunnel-exit --listen-port 8443 --transport wss \
    --target 127.0.0.1:443

# on the entry: the command the exit printed, pinning the exit's certificate
psm relay add --tag tun --mode tunnel-entry --listen-port 443 --transport wss \
    --exit EXIT_IP:8443 --secret SECRET --exit-pin CERT_SHA256 --udp
```

Every option is in the [command reference](/en/reference/cli#psm-relay-relays). Main menu **12 (Relay)** manages realm forwards (add, modify, delete, status report); gost's rules (load balancing, tunnels, rate limits) are listed there too — change them with `psm relay` or in the panel.

## Details

- **Ports**: `--listen-port auto` (an empty port in the panel) picks one nothing holds in the range, 20000-60000 unless `--port-range` says otherwise (in the panel: the server's "备注和中转端口段"). PSM opens it in the machine's firewall and closes only the ports it opened itself when the relay goes; your cloud provider's security group is still yours to open.
- **Sharing several landing servers**: round robin (the default), by client IP (a client always lands on the same one), at random, failover. The last two and health checks need gost. Turn health checks off (`--no-probe`) when a landing server listens on UDP only: they use TCP.
- **UDP**: QUIC-based protocols such as Hysteria2 and TUIC need `--udp`. gost keeps one client session on one source port, which QUIC needs to hold its connection.
- **Quotas and expiry**: metered on the entry's listening port (with PSM's traffic accounting, like the nodes). Past the month's quota or the expiry date, the entry refuses new connections; it opens again on the reset day (in the server's time zone; 0 never resets) or when the quota is raised.
- **A tunnel carries protocols in which the client speaks first**: every proxy protocol does (VLESS, SS2022, Trojan, Hysteria2…). One in which the server speaks first once connected — SSH, SMTP, FTP, VNC — waits for ever in a tunnel; use a forward for it.
- **The exit is no open proxy**: it forwards to its own landing servers only, whatever the entry asks, and the entry needs the password.
- **How the hop is doing**: the entry measures the round trip, jitter and loss to the next hop every minute (with TCP connects rather than ping: ICMP is filtered often enough on these networks that ping reports loss that is not there); a tunnel's exit also measures its hop to the landing server. `psm relay probe` shows it any time.

## More

- **Status report**: the relay's resource use, speed and latency to the landing server, which can be pushed to [Telegram](/en/features/telegram).
- `psm doctor` checks that each relay's program runs and its port listens.
- Uninstalling PSM asks whether to remove realm and psm-gost too (with their rules and firewall openings).
