---
title: "Choosing a proxy protocol: REALITY vs Hysteria2 vs TUIC vs AnyTLS"
description: Which protocol should your self-hosted proxy use? VLESS REALITY, Vision, XHTTP, Hysteria2, TUIC, AnyTLS, Shadowsocks 2022, Trojan, Snell and WireGuard compared by transport, certificate needs, censorship resistance and use case, with recommended combinations.
keywords: REALITY vs Hysteria2, proxy protocol comparison, TUIC, AnyTLS, censorship-resistant protocol
---

# Choosing a protocol

**Short answer:** start with a **VLESS REALITY** node as your main line; add **Hysteria2** if evenings or mobile networks are lossy; add **TUIC** or **AnyTLS** as a spare. PSM runs them side by side, and you switch between them in the client.

## Comparison

| Protocol | Transport | Domain and certificate | Strengths | Watch out for | Cores in PSM |
| --- | --- | --- | --- | --- | --- |
| VLESS REALITY | TCP | not needed | Borrows a real website's TLS handshake, so active probes see that website; works with just an IP | Pick the camouflage target carefully; never one behind a CDN | Xray, sing-box, mihomo |
| VLESS Vision | TCP + TLS | needed | A real certificate, with a camouflage website | Needs your own domain | Xray |
| VLESS XHTTP | TCP (HTTP) | depends on mode | Can go through a CDN; has a REALITY mode | Many options | Xray |
| Hysteria2 | UDP (QUIC) | needed (self-signed works) | Much faster on lossy links; optional port hopping | Some ISPs throttle or block UDP | Xray, sing-box, mihomo |
| TUIC v5 | UDP (QUIC) | needed (self-signed works) | Low latency, multiplexed | Depends on UDP quality too | sing-box, mihomo |
| AnyTLS | TCP + TLS | needed (self-signed works) | Designed against the TLS-in-TLS traffic pattern | Fewer clients support it | sing-box, mihomo |
| Shadowsocks 2022 | TCP / UDP | not needed | Simple, fast, light | No camouflage layer; better for relays or relaxed networks | Xray, sing-box, mihomo |
| Trojan / VMess | TCP + TLS | needed (self-signed works) | Widest client support | Less censorship-resistant than REALITY | Xray, sing-box, mihomo |
| Snell | TCP | not needed | Native in Surge | Surge users only | sing-box, mihomo |
| WireGuard | UDP | not needed | Whole-device VPN | Easy to fingerprint; not for getting past censorship | sing-box |

## By situation

**Only an IP, no domain** — VLESS REALITY. It needs no certificate: clients connect to your IP, while the TLS handshake borrows a real website.

**Congested evenings or lossy mobile networks** — add Hysteria2. It runs over UDP with its own congestion control and is usually much faster than TCP protocols when packets get lost. If your ISP throttles one UDP port, turn on port hopping so the client rotates through a port range.

**Several lines that back each other up** — REALITY (TCP) plus Hysteria2 or TUIC (UDP): when one is disrupted, the other still works.

**Only one open port, 443** — REALITY, Vision, XHTTP and AnyTLS can all [share port 443](/en/features/port-443). Hysteria2 and TUIC use UDP 443, which does not collide with TCP 443.

**Surge** — Snell or VLESS REALITY; Snell is Surge's native protocol.

## Picking a REALITY camouflage target {#reality-target}

REALITY needs a camouflage target: a real website that speaks TLS 1.3. Guidelines:

- **Never a site behind Cloudflare, Akamai or another CDN.** Otherwise anyone can use your server to reach the whole CDN, on your bandwidth. PSM checks for this and warns you.
- Prefer a site in **the same datacenter and network** as your VPS; PSM's Xray can find candidates for you through network search engines.
- Avoid the big-brand domains every tutorial uses.
- Before creating the node, PSM tests the target with a real handshake through the core; a target that fails is not used.

## Adding ECH

TLS nodes on sing-box and mihomo (VLESS, Trojan, AnyTLS, Hysteria2, TUIC) can turn on ECH (Encrypted Client Hello), which also hides the domain in the handshake. Clients without ECH support can still connect.

Next: [Quick start](/en/guide/quick-start).
