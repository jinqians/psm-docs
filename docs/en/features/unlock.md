---
title: "Unlocking Netflix and ChatGPT: WARP, residential exits and rule sets"
description: Datacenter IP blocked by Netflix or ChatGPT? PSM routes just those services through Cloudflare WARP or a residential broadband exit, by domain or subscribed rule set, while all other traffic leaves the VPS directly.
---

# Unlocking Netflix and ChatGPT

Many streaming and AI services block datacenter IPs. PSM sends **only those services** out through a different exit; everything else leaves the VPS directly, at full speed.

## Exits

**Cloudflare WARP** — registers a WARP account in one step and adds it as an outbound. Xray, sing-box and mihomo share the same WARP account.

**Residential exit** — picks genuine home-broadband IPs out of the public VPNGate list and connects to one through a separate tunnel. Services that judge you by IP ownership see a residential IP.

- You pick the country; the list shows how many working nodes each country has.
- When a node drops, it fails over to another node in **the same country**, so the exit country never drifts.
- If the tunnel is down, matching traffic fails instead of leaking out through the datacenter IP.
- It uses its own routing table only, so the server's own traffic and SSH are untouched.
- All three cores share one tunnel; switching nodes needs no config changes.

**Your own outbound** — another node of yours (VLESS, Trojan, Shadowsocks, SOCKS5, …) can serve as an exit too.

## Routing by rule

Set rules under "Routing" in each core's menu:

- **By domain, GeoSite or GeoIP**, for example `geosite:netflix` through WARP.
- **Subscribed rule sets**: paste the URL of a community rule list (such as OpenAI.list) and pick an exit; every domain in it goes that way. Rule sets refresh daily: sing-box and mihomo pick them up without a restart; Xray restarts only when the content actually changed.
- Before applying, PSM reports how many rules are usable, and names the client-only rule types it had to drop.

## Test first

The System menu has unlock checkers for streaming and AI services; run one before and after changing an exit to see the difference.
