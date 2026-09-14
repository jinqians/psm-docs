---
title: "PSM Panel: a web panel for many VPS (one-click Cloudflare deploy)"
description: PSM Panel is PSM's web panel. One click deploys it to Cloudflare Workers; a VPS joins with one command (even without PSM) and opens no port. Manage the nodes, traffic and limits of every server on one page, in one subscription.
keywords: PSM Panel, proxy panel, multi-server management, Cloudflare Workers panel, node management panel, combined subscription
---

# PSM Panel

PSM Panel is PSM's web panel, laid out like Xboard, for managing many VPS on one page:

- **One-click deploy** to your own Cloudflare account (Workers + D1, the free tier is enough): the only setting is an admin password.
- **One command joins a VPS**, even one without PSM: the command installs PSM first, and the cores your nodes need are installed on demand.
- **psm-agent on the server listens on no port**: it connects out to the panel over HTTPS.
- **Create, edit and delete nodes** on the page; Snell and SS2022 can run as the standalone snell-server (v4 / v5 / v6) and ss-rust.
- **Traffic**: each node's usage this month, a daily chart, limits (a node over its limit is paused).
- **One subscription** for the nodes of every server: share links, Clash / mihomo, sing-box and Surge, chosen by the client.
- **Diagnostics**: a server's PSM version, cores and `psm doctor` results at a click.

A joined server keeps working with PSM's menu and command line as before.

<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/jinqians/psm-panel" target="_blank" rel="noopener"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare"></a>

## Joining a server

Add the server on the panel's servers page, copy the command it gives you and run it on the VPS as root:

```bash
bash <(curl -fsSL https://psm.jinqians.com) --panel https://<your panel> --join <one-time token>
```

It installs (or updates) PSM, then joins the panel with [`psm agent join`](/en/reference/cli#psm-agent-joining-a-psm-panel).

## Full documentation

Deployment, joining, nodes, traffic, subscriptions, security and FAQ (in Chinese): **[PSM Panel docs](https://jinqians.github.io/psm-panel-docs/)**; source at [jinqians/psm-panel](https://github.com/jinqians/psm-panel).
