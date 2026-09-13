---
title: "VLESS + TLS node setup: TCP, WebSocket, gRPC, QUIC and more (sing-box / mihomo)"
description: Set up a VLESS + TLS node on sing-box or mihomo with PSM, over the transport of your choice - tcp, ws, grpc, http, httpupgrade or quic on sing-box, tcp, ws, grpc or xhttp on mihomo - with shared port 443 and ECH available.
keywords: VLESS TLS setup, sing-box VLESS, mihomo VLESS, VLESS WebSocket, VLESS gRPC, ECH
---

# VLESS + TLS

VLESS nodes on sing-box and mihomo: VLESS with TLS, over a transport you choose. A fit when you want your own certificate and prefer to manage everything on sing-box or mihomo; on Xray, the equivalents are [Vision](/en/protocols/vision) and [XHTTP](/en/protocols/xhttp).

| | |
| --- | --- |
| Cores | sing-box, mihomo |
| Transports | sing-box: tcp, ws, grpc, http, httpupgrade, quic; mihomo: tcp, ws, grpc, xhttp |
| Domain and certificate | a certificate is needed; add `--insecure 1` for a self-signed one |
| Shared port 443 | yes (`--mount-443`) |
| Common clients | v2rayN, Shadowrocket, Clash Verge Rev, sing-box, NekoBox |

## From the menu

- sing-box: main menu **2** → **4 (Nodes)** → **9 (VLESS + TLS)**
- mihomo: main menu **3** → **4** → **9**

![sing-box VLESS + TLS node menu](/images/pm-vless.en.png){.shot}

## From the command line

```bash
psm node add sing-box vless --tag my-vless --port 11443 \
  --sni hk.example.com \
  --cert-path /etc/nginx/ssl/hk.example.com/fullchain.pem \
  --key-path  /etc/nginx/ssl/hk.example.com/privkey.pem \
  --transport ws --path /ws
```

| Option | Meaning |
| --- | --- |
| `--sni` | the certificate's domain |
| `--cert-path`, `--key-path` | certificate and key; certificates issued in main menu **10 (SSL certificates)** are in `/etc/nginx/ssl/DOMAIN/` |
| `--transport` | the transport, as in the table above; `--path` sets the path for ws and the like |
| `--insecure 1` | for a self-signed certificate: the exported link tells the client to skip verification |
| `--mount-443` | put the node on shared port 443 |
| `--ech true` | add ECH (Encrypted Client Hello) |
| `--vless-enc x25519\|mlkem768` | mihomo only: add VLESS Encryption on top |

## Export for clients

```bash
psm node export sing-box vless my-vless
```

![VLESS + TLS share link](/images/export-hk-vless-ws.en.png){.shot}
