---
title: "Subscriptions and clients: share links, QR codes, Clash and sing-box configs"
description: PSM gives every node a standard share link and QR code, exports a Base64 subscription plus Clash Meta (mihomo) and sing-box client configs, and can serve an online subscription with an expiry date and a revocable URL for v2rayN, Clash Verge Rev, Shadowrocket and more.
---

# Subscriptions and clients

## One node: share link and QR code

Every node has a standard share link (`vless://`, `hysteria2://`, `tuic://`, …) and a QR code, shown when you view the node in the menu, or:

```bash
psm node export xray reality hk-reality
```

Scan the QR code with a phone client, or paste the link into a desktop client.

<img src="/images/qr.png" alt="Example node QR code" width="200">

## All nodes: a subscription

PSM exports every node at once in three formats:

| File | Format | Clients |
| --- | --- | --- |
| `sub.txt` | Base64 list of share links (generic subscription) | v2rayN, v2rayNG, Shadowrocket, NekoBox, … |
| `mihomo.yaml` | complete Clash Meta (mihomo) config | Clash Verge Rev, Mihomo Party, FlClash, … |
| `singbox.json` | complete sing-box client config | the sing-box apps, Karing, Hiddify, … |

In main menu **22 (Subscriptions)** choose **Export to local files**; the files are saved on the server for you to download. The same menu creates, shows and turns off the online subscription:

![Client config export and subscription menu](/images/subscribe.en.png){.shot}

## Online subscription

An online subscription lets clients refresh their nodes from a URL instead of being re-imported by hand:

- The files are served under your HTTPS camouflage website, at `https://your-domain/psm-sub/<48-character random token>/sub.txt`.
- It needs a domain pointing at the server and a certificate; PSM requests one if there is none.
- It expires after 30 days by default and is then deleted; if the URL leaks, reset the token and the old URL stops working at once.
- When Nginx owns port 443, PSM adds the subscription domain to the SNI routing table itself.

::: warning A subscription holds every credential
It contains the passwords and keys of all nodes: only give it to people you trust. For several people, use [per-user accounts](/en/features/users), each with a subscription of their own.
:::

## Per-user subscriptions

Every user gets their own subscription URL, holding only the nodes assigned to them, with their own credentials. When a user expires, runs out of quota or is disabled, their subscription stops working. See [Per-user accounts](/en/features/users).
