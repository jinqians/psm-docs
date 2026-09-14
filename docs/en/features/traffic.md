---
title: "Traffic quotas and expiry: per-node limits that pause automatically"
description: PSM counts the traffic of every Xray, sing-box and mihomo node and of the standalone Snell and ss-rust (SS2022), sets monthly quotas, warns at 90% on Telegram and pauses a node when it runs out; nodes can also have expiry dates with reminders, automatic pausing and one-step renewal.
keywords: traffic monitoring, traffic quota, Telegram alerts
---

# Traffic quotas and expiry

## Per-node quotas

Set a monthly limit for a node in main menu **15 (Traffic)**:

- Covers every node on the three cores (Xray, sing-box, mihomo), plus the standalone **Snell** (its main user's port) and **ss-rust (SS2022)**; counted every minute (choose **Install the automatic check timer** first).
- Xray nodes are counted through Xray's own stats API; sing-box and mihomo nodes and the standalone Snell and ss-rust through iptables per-port counters. Nodes on shared port 443 are counted on their backend port on the server, so they never mix with other nodes.
- One Telegram warning at 90%.
- The node pauses when the quota is used up, and resets and resumes on the monthly reset day (which you choose).
- Pause, resume and reset by hand at any time.

![Traffic menu](/images/traffic.en.png){.shot}

To limit a person rather than a node, use the `--quota` of [per-user accounts](/en/features/users) (counts Xray nodes).

### From the command line

```bash
psm traffic set NODE --limit-gb 100 --reset-day 1   # set a limit (0 meters without limiting)
psm traffic list                                    # usage, limits, paused or not
psm traffic reset NODE                              # back to zero, resumed
psm traffic unset NODE                              # stop metering it
```

The standalone Snell and ss-rust are `snell` and `ss2022`. The command line and the menu work on the same state. All options: [CLI reference](/en/reference/cli#psm-traffic-metering-and-limits).

### On PSM Panel

A server joined to [PSM Panel](/en/features/panel) reports every node's traffic to the panel: its traffic page shows this month's usage of every server and a daily chart, and a limit is set when creating or editing a node. Pausing and resetting are still done by the server itself.

## Expiry dates

Give a node an expiry date, handy when you lend access for a while:

- Telegram reminders before and at expiry.
- The node pauses when it expires.
- One-step renewal.

## Telegram notifications and bot

With the Telegram bot set up, you can check node traffic, handle renewals and get a daily health report (service status, quota warnings, expiry reminders, certificates, security state) without logging in to the server. Tenants can bind their own port and check their own usage. Setup: [Telegram bot](/en/features/telegram).
