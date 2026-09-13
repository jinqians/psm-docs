---
title: "Per-user accounts: expiry dates and traffic quotas for family and friends"
description: PSM's psm user command adds users to Xray, sing-box and mihomo nodes, each with their own UUID and password, expiry date and subscription URL; Xray nodes support per-user monthly traffic quotas, and accounts pause when they expire or run out.
keywords: multi-user proxy, per-user accounts, traffic limits, expiry dates
---

# Per-user accounts

One node can serve several people, each with their own credentials, expiry date and subscription URL. The node's own credential (the "owner") is left alone, so links already handed out keep working.

## Common commands

```bash
psm user add alice                          # every node, never expires
psm user add bob --nodes hk-reality,hk-hy2 --days 30 --quota 100G
psm user list                               # users, state, usage, expiry
psm user show bob                           # one user, with the subscription URL
psm user links bob                          # all of bob's share links
psm user update bob --days 30               # extend by 30 days
psm user update bob --disable               # pause; --enable resumes
psm user token bob                          # new subscription URL; the old one stops working
psm user delete bob
```

Sizes: `500M`, `100G`, `1T` or bytes. Dates: `--expires 2026-12-31` (expires at the end of that day).

## What each user gets

- **One UUID and one password**, valid on every node they may use: VLESS, VMess and TUIC take the UUID; Trojan, Hysteria2, AnyTLS, TUIC and SOCKS5 the password (the SOCKS5 login is `psmu-NAME`).
- **Their own subscription URL**, holding only their nodes. [Online subscriptions](/en/features/subscription#online-subscription) must be on.
- **An expiry date**: when it passes, the user is removed from every node, and put back when renewed.

## Traffic quotas

`--quota` is per **calendar month** and counts the user's traffic through **Xray nodes**. When it is used up, the account pauses on all three cores and comes back on the 1st of the next month; `--reset-usage` clears it by hand.

::: info Why only Xray nodes count
Xray counts traffic per user; sing-box and mihomo do not expose that. Their nodes can still have [per-node quotas](/en/features/traffic).
:::

## Supported protocols

VLESS (REALITY, Vision and XHTTP included), VMess, Trojan, Hysteria2, TUIC, AnyTLS and SOCKS5 with authentication. Shadowsocks 2022, Snell and WireGuard have a single key and no users: adding users to an SS2022 server would break its existing link.

## How it takes effect

Users are stored in PSM's configuration. Every time PSM restarts a core, the currently valid users are written into that core's config before the core checks it, so applying twice never adds anything twice. A check every minute re-applies when someone expires or runs out. Moving to a new server carries the users and their subscription URLs along.
