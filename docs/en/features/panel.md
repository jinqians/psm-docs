---
title: "PSM Panel: a web panel for many VPS (one-click Cloudflare deploy)"
description: PSM Panel is PSM's web panel. One click deploys it to Cloudflare Workers; a VPS joins with one command (even without PSM) and opens no port. Manage the nodes, traffic and limits of every server on one page, in one subscription.
keywords: PSM Panel, proxy panel, multi-server management, Cloudflare Workers panel, node management panel, combined subscription, Xboard, Xboard alternative, Xboard-style panel, node subscription manager
---

# PSM Panel

PSM Panel is PSM's web panel for managing many VPS on one page:

- **One-click deploy** to your own Cloudflare account (Workers + D1, the free tier is enough): the only setting is an admin password.
- **One command joins a VPS**, even one without PSM: the command installs PSM first, and the cores your nodes need are installed on demand.
- **psm-agent on the server listens on no port**: it connects out to the panel over HTTPS.
- **Create, edit and delete nodes** on the page; Snell and SS2022 can run as the standalone snell-server (v4 / v5 / v6) and ss-rust.
- **Traffic**: each node's usage this month, a daily chart, limits (a node over its limit is paused).
- **One subscription** for the nodes of every server: share links, Clash / mihomo, Stash, sing-box, Surge, Quantumult X and Loon, chosen by the client; every format has a built-in template with basic routing, and you can write your own.
- **An exit per node**: a node's AI traffic, its streaming traffic or all of it can leave through Cloudflare WARP or a free residential line (VPNGate); the rest goes out directly.
- **REALITY camouflage targets found for you**: with a cyberspace-mapping engine's API key (Netlas, Quake, ZoomEye or FOFA), the server lists hosts with certificates in its own ASN, checks each with a TLS handshake, and the panel fills your choice in.
- **Diagnostics**: a server's PSM version, cores and `psm doctor` results at a click.

A joined server keeps working with PSM's menu and command line as before.

<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/jinqians/psm-panel" target="_blank" rel="noopener"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare"></a>

## The admin password

`ADMIN_PASSWORD`, the one field in the deploy form, is the password you sign in with (8 characters or more). It only has to be set once: the first time the panel reads it, a salted hash of it goes into the panel's own D1, so a later deploy that loses the secret does not lock you out.

::: warning Add it as a Secret, not as a Variable
If you set or change it in the Cloudflare dashboard later, add it under the Worker's **Settings → Variables and Secrets** as a **Secret**. A plain **Variable** is wiped on every deploy — the deploy config declares no variables, and `wrangler deploy` keeps only secrets — which is exactly why a rebuild would ask for the admin password again.
:::

While the secret is there it wins: changing it changes the password, and every signed-in session ends.

## Joining a server

Add the server on the panel's servers page, copy the command it gives you and run it on the VPS as root:

```bash
bash <(curl -fsSL https://psm.jinqians.com) --panel https://<your panel> --join <one-time token>
```

It installs (or updates) PSM, then joins the panel with [`psm agent join`](/en/reference/cli#psm-agent-joining-a-psm-panel).

When a newer psm-agent comes out, the servers page has an **升级 agent** button for it: the server updates PSM and installs the new agent itself, with no SSH.

## Full documentation

Deployment, joining, nodes, traffic, subscriptions, security and FAQ (in Chinese): **[PSM Panel docs](https://psm-panel-docs.pages.dev/)**; source at [jinqians/psm-panel](https://github.com/jinqians/psm-panel).
