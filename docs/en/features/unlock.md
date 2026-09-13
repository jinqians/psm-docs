---
title: "Unlocking Netflix and ChatGPT: WARP, residential exits and rule sets"
description: Datacenter IP blocked by Netflix or ChatGPT? PSM routes just those services through Cloudflare WARP or a residential broadband exit, by domain or subscribed rule set, while all other traffic leaves the VPS directly.
keywords: WARP routing, unblock Netflix, unblock ChatGPT, routing rules, GeoSite, rule sets
---

# Unlocking Netflix and ChatGPT

Many streaming and AI services block datacenter IPs. PSM sends **only those services** out through a different exit; everything else leaves the VPS directly, at full speed.

## Exits

**Cloudflare WARP** — registers a WARP account in one step and adds it as an outbound. Xray, sing-box and mihomo share the same WARP account.

**Free residential exit** — genuine home-broadband IPs as an exit, so services that judge you by IP ownership see a residential IP. See [Free residential exit](/en/features/residential).

**Your own outbound** — another node of yours (VLESS, Trojan, Shadowsocks, SOCKS5, …) can serve as an exit too.

## Routing by rule

Set rules under "Routing" in each core's menu:

- **By domain, GeoSite or GeoIP**, for example `geosite:netflix` through WARP.
- **Subscribed rule sets**: paste the URL of a community rule list (such as OpenAI.list) and pick an exit; every domain in it goes that way. Rule sets refresh daily: sing-box and mihomo pick them up without a restart; Xray restarts only when the content actually changed.
- Before applying, PSM reports how many rules are usable, and names the client-only rule types it had to drop.

## Test first

The System menu has unlock checkers for streaming and AI services; run one before and after changing an exit to see the difference.
