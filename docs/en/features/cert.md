---
title: "SSL certificates: acme.sh in one step, wildcard certificates, automatic renewal"
description: PSM issues free SSL certificates with acme.sh for your nodes and camouflage sites - HTTP-01 validation, DNS-01 wildcard certificates, importing existing ones - and renews them automatically, reloading the services that use them.
keywords: issue SSL certificate, acme.sh, wildcard certificate, Let's Encrypt, automatic renewal, node certificate
---

# SSL certificates

Vision, XHTTP, Trojan, VMess and other protocols, as well as online subscriptions and camouflage sites, need a certificate for a domain. PSM issues free certificates with acme.sh and renews them automatically.

Everything is in main menu **10 (SSL certificates)**:

![SSL certificate menu](/images/cert.en.png){.shot}

| Option | What it does |
| --- | --- |
| Install acme.sh | the first time you need it |
| Issue (HTTP-01) | the usual choice; the domain must point at this server and port 80 must be reachable |
| Issue (DNS-01 / wildcard) | validates through DNS, can issue wildcard certificates like `*.example.com`, no port 80 needed |
| Import a certificate | when you already have the files |
| Renew / enable automatic renewal | renew by hand, or leave it to a scheduled job |
| List / delete | manage existing certificates |

## Where certificates live

Issued certificates are stored in `/etc/nginx/ssl/DOMAIN/` (`fullchain.pem` and `privkey.pem`). Xray Vision, XHTTP, Trojan and VMess nodes created with `--domain` take their certificate from there; for sing-box and mihomo nodes, point `--cert-path` and `--key-path` at those two files.

## Wildcard certificates through Cloudflare

If the domain is on Cloudflare, set up the API credentials in main menu **13 (Cloudflare DDNS)** and issue a wildcard certificate over DNS-01 in one step; see [Cloudflare](/en/features/cloudflare).

## No domain?

[REALITY](/en/protocols/reality) and [Shadowsocks 2022](/en/protocols/ss2022) need no certificate at all; Hysteria2, TUIC and AnyTLS work with a self-signed one.
