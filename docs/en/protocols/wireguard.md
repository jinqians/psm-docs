---
title: "WireGuard server setup: a sing-box endpoint with ready-made client configs"
description: Create a WireGuard endpoint on sing-box with PSM, generate a client per person, and export standard wg-quick configs for the official WireGuard apps or mihomo / sing-box clients.
keywords: WireGuard setup, WireGuard server, sing-box WireGuard, wg-quick config, WireGuard script
---

# WireGuard

WireGuard is a modern VPN protocol, fast and simple, carrying a whole device's traffic. Its traffic is easy to recognise, so it is **not meant for getting past censorship**; use it to reach your own server, to network a few devices, or as an ordinary VPN where the network is open.

| | |
| --- | --- |
| Transport | UDP |
| Cores | sing-box (WireGuard endpoint) |
| Domain and certificate | not needed |
| Common clients | the official WireGuard apps; mihomo and sing-box clients |

## From the menu

sing-box: main menu **2** → **4 (Nodes)** → **11 (WireGuard)**.

![sing-box WireGuard menu](/images/pm-wireguard.en.png){.shot}

## From the command line

```bash
psm node add sing-box wireguard --tag my-wg --port 51820 --peer-count 2
```

`--peer-count` is the number of clients to generate; each gets its own keys and address.

## Export the client configs

```bash
psm node export sing-box wireguard my-wg
```

prints a standard wg-quick file per client, to import into the official WireGuard app; mihomo and sing-box clients can connect with the same config.

![wg-quick client configs exported for WireGuard](/images/export-hk-wg.en.png){.shot}

Remember to allow this **UDP** port in your cloud provider's security group.
