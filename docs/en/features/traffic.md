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

## Expiry dates

Give a node an expiry date, handy when you lend access for a while:

- Telegram reminders before and at expiry.
- The node pauses when it expires.
- One-step renewal.

## Telegram notifications and bot

With the Telegram bot set up, you can check node traffic, handle renewals and get a daily health report (service status, quota warnings, expiry reminders, certificates, security state) without logging in to the server. Tenants can bind their own port and check their own usage. Setup: [Telegram bot](/en/features/telegram).
