---
title: "Sharing port 443: many proxy nodes behind one port"
description: PSM routes TLS connections by SNI with Nginx stream ssl_preread, so REALITY, Vision, XHTTP and AnyTLS nodes and a camouflage website share public port 443, and unknown names are dropped. Hysteria2 can use port hopping.
---

# Sharing port 443

Several nodes can share one public port 443. PSM has Nginx read the domain name (SNI) in the TLS handshake at the TCP level, without decrypting anything, and hand the connection to the node for that name.

```text
client ──443/TCP──▶ Nginx (reads SNI, no decryption)
                     ├─ a.example.com  ──▶ REALITY node
                     ├─ b.example.com  ──▶ Vision node
                     ├─ c.example.com  ──▶ AnyTLS node
                     ├─ your domain    ──▶ HTTPS camouflage site
                     └─ anything else  ──▶ dropped

client ──443/UDP──▶ Hysteria2 / TUIC (separate listener, no collision)
```

## Why it helps

- **One open port**: the firewall only allows 443, so there is less to scan.
- **Unknown names are dropped**: only domains you mounted get through. A scanner that makes up a name is cut off at once, so nobody can use your server as a free relay.
- **One server, several identities**: nodes and a camouflage website sit on 443 side by side, told apart by domain.
- **UDP 443 does not collide**: Hysteria2 and TUIC use UDP, a separate listener from TCP 443.

## Which nodes can be mounted

Xray REALITY, Vision, XHTTP, Trojan and VMess, and REALITY, AnyTLS, Trojan, VMess and VLESS on sing-box and mihomo. All three cores share one routing table; the same domain used by two cores is detected and refused.

## How

Choose "mount on shared 443" when creating a node in the menu, or on the command line:

```bash
psm node add xray reality --tag hk-443 --port 21001 \
  --server-name learn.microsoft.com --dest learn.microsoft.com:443 --mount-443
```

The node listens on a loopback port (21001 here); only 443 faces the internet. Nginx is installed if it is missing, and the routing table follows port, domain and deletion changes.

::: tip "REALITY: Listening on non-443 ports" in the log
On a mounted node this warning can be ignored: the node listens on loopback, and the port the world sees is 443. It only matters for a node listening directly on a public port other than 443.
:::

## Port hopping {#port-hopping}

A Hysteria2 node can use port hopping: a whole UDP port range (say 20000-20999) is redirected to the node's port, and the client rotates through it, which gets around ISPs throttling a single UDP port.

```bash
psm node add sing-box hysteria2 --tag hk-hy2 --port 8443 \
  --sni hy2.example.com --cert-path /path/fullchain.pem --key-path /path/privkey.pem \
  --hop-ports 20000-20999
```

- The firewall only needs the node's own port.
- Share links carry the range (`host:8443,20000-20999`); clients that support it rotate automatically.
- The redirect rules come back after a reboot.
