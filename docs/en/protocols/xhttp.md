---
title: "VLESS XHTTP node setup: XHTTP, WebSocket, gRPC, HTTPUpgrade, REALITY layer, mKCP (Xray)"
description: Set up Xray XHTTP-family nodes with PSM in seven transports - XHTTP/SplitHTTP, WebSocket, gRPC, HTTPUpgrade and HTTP/2 can go through a CDN, the REALITY layer needs no domain, and mKCP runs over UDP for lossy links.
keywords: XHTTP setup, SplitHTTP, VLESS WebSocket TLS, VLESS gRPC, HTTPUpgrade, mKCP, Xray CDN node
---

# VLESS XHTTP

This is a family of "VLESS over a transport" nodes on Xray. The HTTP-based transports (XHTTP, WebSocket, gRPC, HTTPUpgrade) can pass through a CDN, so a node stays usable through the CDN after the VPS's IP is blocked.

| | |
| --- | --- |
| Cores | Xray |
| Domain and certificate | needed by most modes; not by the REALITY layer or mKCP |
| Shared port 443 | yes for the TLS modes (`--mount-443`); not for mKCP |
| Common clients | recent Xray-based clients such as v2rayN and v2rayNG |

## Seven modes

| `--mode` | Name in the menu | Domain and certificate | Notes |
| --- | --- | --- | --- |
| `xhttp` | XHTTP/SplitHTTP | needed | Xray's newest HTTP transport; works through a CDN |
| `ws` | WebSocket | needed | the most compatible; works through a CDN |
| `grpc` | gRPC | needed | multiplexed; works through a CDN |
| `httpupgrade` | HTTPUpgrade | needed | one framing layer less than WebSocket |
| `h2` | HTTP/2 | needed | carried by XHTTP stream-one (Xray removed its old HTTP transport) |
| `reality-layer` | Reality layer | not needed | REALITY camouflage, with `--reality-transport xhttp\|grpc` |
| `mkcp` | mKCP | not needed | UDP without TLS, disguised by a seed and header; copes with loss but uses noticeably more traffic |

For the modes that need a domain, prepare the certificate as for [Vision](/en/protocols/vision#_1-domain-and-certificate): point the domain at the VPS and issue it in main menu **10 (SSL certificates)**.

## From the menu

Main menu **4** → **4 (Nodes)** → **3 (XHTTP)**, then pick the mode.

![Xray XHTTP node menu](/images/pm-xhttp.en.png){.shot}

## From the command line

```bash
# XHTTP (for WebSocket, gRPC and the rest, use ws, grpc, httpupgrade, h2)
psm node add xray xhttp --tag my-xhttp --port 2087 \
  --domain hk.example.com --mode xhttp

# REALITY layer, no domain needed
psm node add xray xhttp --tag my-xhttp-reality --port 8443 \
  --mode reality-layer --reality-transport xhttp

# mKCP (UDP)
psm node add xray xhttp --tag my-kcp --port 9000 --mode mkcp
```

For mKCP, `--kcp-seed` sets the obfuscation seed and `--kcp-header` the disguise header. It runs over UDP, so it cannot go on shared port 443; be careful on servers billed by traffic.

mKCP has no TLS, and Xray clients from v26.7.7 on refuse to send unencrypted VLESS to a public address, so a new mKCP node has VLESS Encryption (X25519) on by default: the link's `encryption=` is the key the client uses. For older clients only, `--vless-enc none` turns it off.

## Export for clients

```bash
psm node export xray xhttp my-xhttp
```

![XHTTP share link](/images/export-hk-xhttp.en.png){.shot}
