---
title: "Proxy glossary: what REALITY, Hysteria2, TUIC, AnyTLS, SNI, WARP and residential IPs are"
description: Short definitions of the terms you meet when self-hosting a proxy server - self-hosting vs. proxy subscriptions, VPS, proxy core, Xray, sing-box, mihomo, VLESS, REALITY, Vision, XHTTP, Hysteria2, port hopping, TUIC, AnyTLS, Snell, Shadowsocks 2022, Trojan, VMess, WireGuard, WARP, residential IP, SNI, port 443 sharing, subscriptions, routing rules, BBR.
keywords: proxy glossary, what is REALITY, what is Hysteria2, what is TUIC, what is AnyTLS, residential IP, SNI routing, self-hosted proxy vs VPN subscription
---

# Glossary

The terms you meet when self-hosting a proxy server, each in a sentence or two, with where it shows up in PSM.

## Self-hosted proxy {#self-hosted}

A proxy service you run on a VPS you rent, for yourself and people you trust. The alternative is a commercial proxy subscription (called an "airport" in Chinese communities), shared by many users and run by the provider. Self-hosting gives you an IP nobody else uses and a setup you control; the price is maintaining the server, which is the work PSM is built for.

## VPS {#vps}

A virtual private server: a cloud machine rented by the month, with its own public IP and root access. PSM runs on the VPS and [supports Debian, Ubuntu, Alpine and the Red Hat family](/en/reference/systems).

## Proxy core {#core}

The program that actually carries the proxy traffic. PSM manages three, Xray, sing-box and mihomo, which can be installed side by side; [how they differ](/en/guide/cores).

## Xray {#xray}

The proxy core of Project X, where VLESS, REALITY, Vision and XHTTP come from. It counts traffic per user, which PSM's [per-user traffic quotas](/en/features/users) rely on.

## sing-box {#sing-box}

A universal proxy platform that works as both server and client; as a server it speaks VLESS REALITY, Hysteria2, TUIC, AnyTLS, Shadowsocks and more.

## mihomo {#mihomo}

Formerly Clash.Meta: the core behind Clash-family clients such as Clash Verge Rev, which can also run as a server. PSM exports complete mihomo client configs.

## VLESS {#vless}

A lightweight proxy protocol with no encryption of its own; TLS or REALITY around it provides encryption and camouflage.

## REALITY {#reality}

Xray's TLS camouflage: the server borrows the TLS handshake of a real website (the camouflage target), so no domain or certificate of your own is needed, and anyone without the right key sees that real website. It is one of the most widely used anti-censorship setups today; [choosing the target](/en/guide/choose-protocol#reality-target).

## Vision {#vision}

xtls-rprx-vision, a VLESS flow mode that removes the traffic signature of TLS carried inside TLS; usually paired with REALITY or TLS.

## XHTTP {#xhttp}

An HTTP-based Xray transport that can pass through a CDN, so a node stays reachable through the CDN when its IP is blocked.

## Hysteria2 {#hysteria2}

A proxy protocol over QUIC (UDP) with aggressive congestion control, clearly faster on lossy or congested evening-peak routes. It needs a certificate; a self-signed one works.

## Port hopping {#port-hopping}

A Hysteria2 feature: the client keeps changing its port within a range and the server forwards the whole range to one node, so throttling or blocking of a single UDP port matters less. PSM sets up the forwarding rules; [details](/en/features/port-443#port-hopping).

## TUIC {#tuic}

Another QUIC-based proxy protocol (PSM uses v5), with low latency; a good spare UDP line next to Hysteria2.

## AnyTLS {#anytls}

A TLS-based proxy protocol that uses padding and connection reuse to reduce the TLS-in-TLS signature; supported by sing-box and mihomo.

## Snell {#snell}

A proxy protocol by the Surge team, used mainly by the Surge client.

## Shadowsocks 2022 {#ss2022}

The current Shadowsocks specification (ciphers starting with 2022-blake3), with better keys and replay protection. It needs no domain or certificate and is common for relays and exits.

## Trojan {#trojan}

A protocol that dresses proxy traffic as ordinary HTTPS; it needs a domain and a valid certificate.

## VMess {#vmess}

V2Ray's older protocol, supported by nearly every client, kept today mostly for older clients.

## WireGuard {#wireguard}

A modern VPN protocol, fast and simple; it carries a whole device's traffic rather than proxying by app or rule.

## WARP {#warp}

Cloudflare's free network service. PSM connects it as an exit so that chosen sites are reached from a Cloudflare IP, which gets around datacenter IPs being restricted by ChatGPT, Google and others; [details](/en/features/unlock).

## Residential IP {#residential-ip}

An IP address of a home broadband line. Streaming and AI services treat it as an ordinary user, while datacenter IPs are often restricted. PSM's [free residential exit](/en/features/residential) uses home-broadband nodes offered by VPNGate volunteers.

## SNI {#sni}

The destination domain sent in clear text in the TLS handshake. PSM's port 443 sharing routes connections to nodes by it, without decrypting anything.

## Port 443 sharing {#port-443}

Several nodes behind one public port 443: Nginx reads each connection's SNI and hands it to the matching node, and drops unknown names. [Details](/en/features/port-443).

## Camouflage target {#reality-target}

The real website whose TLS handshake REALITY borrows, also called dest or target. Pick a site in the same region that supports TLS 1.3 and is not behind a CDN.

## Share links and subscriptions {#subscription}

A share link (such as `vless://` or `hysteria2://`) is one line of text holding all of a node's settings, imported by pasting or scanning a QR code; a subscription is a URL the client polls for the current node list. [Details](/en/features/subscription).

## Routing rules {#routing-rules}

Rules by domain, GeoSite, GeoIP or subscribed rule set that decide each connection's exit: direct, WARP, residential, or blocked. GeoSite and GeoIP are ready-made databases of sites by category and IPs by country.

## BBR {#bbr}

Google's TCP congestion control, which speeds up high-latency, lossy international routes noticeably. PSM turns it on in one step.

## Self-signed certificate {#self-signed}

A certificate the server generates itself, not issued by a certificate authority. Hysteria2, TUIC and AnyTLS can use one; the client has to allow an untrusted certificate.
