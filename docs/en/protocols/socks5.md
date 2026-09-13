---
title: "SOCKS5 inbound setup: a local proxy entry, or a public listener with authentication (Xray / sing-box / mihomo)"
description: Create a SOCKS5 inbound with PSM. By default it listens on loopback only, for other programs on the server or for relays; a public listener must have a username and password. Works on Xray, sing-box and mihomo.
keywords: SOCKS5 setup, socks5 proxy, socks5 username password, Xray socks, sing-box socks
---

# SOCKS5

SOCKS5 is the most widely understood proxy protocol; nearly every program speaks it. It is **not encrypted** and not meant for getting past censorship directly; in PSM it gives other programs on the server, or traffic relayed from another machine, a proxy entry point.

| | |
| --- | --- |
| Transport | TCP |
| Cores | Xray, sing-box, mihomo |
| Default listener | loopback only (127.0.0.1) |
| Public listener | requires a username and password |

## From the menu

- Xray: main menu **4** → **4 (Nodes)** → **7 (SOCKS5)**
- sing-box: main menu **2** → **4** → **8**
- mihomo: main menu **3** → **4** → **8**

![Xray SOCKS5 node menu](/images/pm-socks.en.png){.shot}

## From the command line

For the server itself (the default):

```bash
psm node add xray socks --tag my-socks --port 1080
```

Open to the network, with authentication:

```bash
psm node add xray socks --tag my-socks --port 1080 \
  --listen-addr 0.0.0.0 --username USER --password PASSWORD
```

`socks5` is an alias of `socks`; either works.

## Export

```bash
psm node export xray socks my-socks
```

![SOCKS5 link](/images/export-hk-socks.en.png){.shot}
