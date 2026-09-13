---
title: "Cloudflare: DDNS, DNS records, wildcard certificates, Tunnel and Access"
description: PSM talks to the Cloudflare API - manage DNS records from the server, update the IP every 5 minutes with DDNS, issue wildcard certificates over DNS-01 in one step, publish services through Cloudflare Tunnel without opening ports, and put Access in front of admin panels.
keywords: Cloudflare DDNS, dynamic DNS, Cloudflare API, wildcard certificate, Cloudflare Tunnel, Cloudflare Access
---

# Cloudflare

If your domain is on Cloudflare, PSM calls the Cloudflare API directly, so you do not need the web dashboard. Everything is in main menu **13 (Cloudflare DDNS)**:

![Cloudflare menu](/images/ddns.en.png){.shot}

First choose **Set API credentials** and enter a Cloudflare API token (or the global API key); then the features below work.

## DNS records

**List / add / delete DNS records**: point names at your nodes, subscriptions and camouflage sites without opening the Cloudflare dashboard.

## DDNS

When the server's public IP changes (home broadband, or a VPS that changes IPs):

- **DDNS: update now** points the name at the current IP.
- **DDNS: install the scheduled job** checks every 5 minutes and updates the record when the IP changes.

## Wildcard certificates

**Issue a certificate automatically (DNS-01 wildcard)**: issues a `*.example.com` wildcard certificate through Cloudflare DNS validation, with no port 80 needed. How to use certificates: [SSL certificates](/en/features/cert).

## Tunnel and Access

- **Cloudflare Tunnel** publishes a service on this server (a web panel, say) at a domain through Cloudflare, without opening any port.
- **Cloudflare Access** puts a Cloudflare sign-in in front of such panels, so only the people you allow can open them.

::: tip Proxy nodes do not belong on a Tunnel
Tunnel suits HTTP services such as web panels. Connect proxy nodes to the server directly, or use a CDN-friendly transport such as [XHTTP](/en/protocols/xhttp).
:::
