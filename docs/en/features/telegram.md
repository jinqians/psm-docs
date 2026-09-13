---
title: "Telegram bot: traffic warnings, expiry notices, daily health reports, self-service for tenants"
description: Connect PSM to a Telegram bot - traffic warnings at 90%, expiry notices, daily health reports and security alerts pushed to Telegram; admins manage traffic from Telegram, and tenants bound to a port check their own usage.
keywords: Telegram bot, traffic alerts, expiry notifications, VPS monitoring Telegram, node traffic query
---

# Telegram bot

With a Telegram bot configured, PSM sends its notifications to Telegram:

- a node reaching 90% of its traffic, or pausing when it is used up;
- nodes and users about to expire, or expired;
- a daily health report: service status, traffic warnings, upcoming expiries, certificates, security status;
- alerts such as a honeypot catching a scanner, and relay status reports.

Set it up in main menu **16 (Telegram Bot)**:

![Telegram Bot menu](/images/tgbot.en.png){.shot}

## Setup

1. In Telegram, create a bot with [@BotFather](https://t.me/BotFather) and copy its token.
2. In the menu choose **Configure bot token / admins**, and enter the token and your own Telegram user ID (the admin).
3. Choose **Start the bot service**. From then on, message the bot to use it.
4. Turn on the **daily health report** if you want it.

## Admins and tenants

- **Admins** see and manage every node's traffic from Telegram and handle renewals.
- **Tenants**: when you lend a node to someone, bind their Telegram user ID to the node's port under **Manage tenant bindings**. When they message the bot, they see only that port's usage.

For per-person accounts, [per-user accounts](/en/features/users) are the better fit; the traffic rules are in [Traffic quotas and expiry](/en/features/traffic).
