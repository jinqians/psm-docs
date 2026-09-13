---
title: "FAQ: setting up a proxy server on a VPS, protocols, troubleshooting"
description: PSM FAQ. How to set up a proxy server on a VPS, whether you need a domain, REALITY vs Hysteria2, what to check when a node does not connect, what to do when the IP is blocked, sharing with several people, updating and uninstalling.
keywords: proxy not connecting, IP blocked, self-hosted vs proxy subscription, 3x-ui alternative, x-ui alternative
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I set up a proxy server on a VPS?","acceptedAnswer":{"@type":"Answer","text":"Log in to the VPS as root, install PSM with bash <(curl -fsSL https://psm.jinqians.com), run psm to install Xray, create a VLESS REALITY node, and import its share link or QR code into a client."}},{"@type":"Question","name":"Do I need a domain?","acceptedAnswer":{"@type":"Answer","text":"Not for VLESS REALITY or Shadowsocks 2022. Vision and Trojan need a certificate for a domain; Hysteria2, TUIC and AnyTLS need a certificate but a self-signed one works."}},{"@type":"Question","name":"REALITY, Hysteria2 or TUIC?","acceptedAnswer":{"@type":"Answer","text":"Use VLESS REALITY as the main line, add Hysteria2 for lossy networks, and TUIC or AnyTLS as a spare. PSM runs them side by side."}},{"@type":"Question","name":"My node does not connect. What should I check?","acceptedAnswer":{"@type":"Answer","text":"Run psm doctor (psm doctor --fix repairs common problems), make sure your cloud provider security group allows the node port, and check the IP and port in the client link."}},{"@type":"Question","name":"Is PSM free?","acceptedAnswer":{"@type":"Answer","text":"Yes. PSM is open source under AGPL-3.0 and hosted on GitHub."}},{"@type":"Question","name":"Which systems does PSM support?","acceptedAnswer":{"@type":"Answer","text":"Debian, Ubuntu, Alpine and the Red Hat family (RHEL, CentOS, Rocky Linux, AlmaLinux), on x86_64 and arm64, with root access."}},{"@type":"Question","name":"Self-hosting or a commercial proxy subscription?","acceptedAnswer":{"@type":"Answer","text":"A commercial proxy subscription is shared by many users: ready to use, but its IPs are shared and more often restricted by streaming and AI services, and quality depends on the provider. A self-hosted proxy runs on a VPS you rent: the IP is used only by you and the people you share it with, and you control the setup; the cost is the VPS and maintaining it, which PSM turns into a menu and commands."}},{"@type":"Question","name":"How is PSM different from web panels such as x-ui or 3x-ui?","acceptedAnswer":{"@type":"Answer","text":"x-ui and 3x-ui are web panels for Xray and expose a panel port. PSM is a menu over SSH with no management port exposed, and manages Xray, sing-box and mihomo together, plus Nginx port 443 sharing, certificates, the firewall, SSH hardening, diagnosis and repair, and server migration."}}]}'
---

# FAQ

## How do I set up a proxy server on a VPS? {#how-to-build}

1. Rent a VPS abroad and log in as root.
2. Run `bash <(curl -fsSL https://psm.jinqians.com)` to install PSM.
3. Run `psm` and install Xray from the Xray menu.
4. Create a VLESS REALITY node.
5. Import its share link or QR code into a client.

Step by step: [Quick start](/en/guide/quick-start).

## Do I need a domain? {#domain}

Not necessarily. VLESS REALITY and Shadowsocks 2022 work with just an IP, no domain or certificate. Vision and Trojan need a certificate for a domain; Hysteria2, TUIC and AnyTLS need a certificate, but a self-signed one works.

## Which protocol should I use? {#protocol}

VLESS REALITY as the main line, Hysteria2 for lossy networks, and TUIC or AnyTLS as a spare. See [Choosing a protocol](/en/guide/choose-protocol).

## My node does not connect. What should I check? {#not-working}

In order:

1. Run `psm doctor`; `psm doctor --fix` repairs what it can.
2. Make sure your **cloud provider's security group / firewall** allows the node port (TCP or UDP; Hysteria2 and TUIC need UDP). PSM only controls the server's own firewall.
3. Check the IP and port in the client link, and that the client is not too old.
4. For REALITY, try a different camouflage target.

## The IP got blocked. Now what? {#ip-blocked}

Get a new IP from your provider, or a new VPS, and move everything with `psm migrate push root@new-server`; nodes and credentials stay the same. See [Moving to a new server](/en/features/migrate). Running REALITY and Hysteria2 side by side means one line keeps working when the other is disrupted.

## Can several people use it? {#multi-user}

Yes: `psm user` gives each person their own account, with their own credentials, expiry date and subscription URL, and on Xray nodes a monthly traffic quota. See [Per-user accounts](/en/features/users).

## Can the camouflage target be a site behind Cloudflare? {#cdn-dest}

Better not. REALITY forwards connections that fail authentication to the camouflage target unchanged. If the target is behind a CDN, anyone can reach the whole CDN through your server, on your bandwidth. PSM checks for this and warns you; pick a site in your own datacenter that is not behind a CDN. More in [Preventing traffic theft](/en/features/anti-theft).

## "REALITY: Listening on non-443 ports" in the log? {#non-443}

Ignore it for nodes on [shared port 443](/en/features/port-443): the node listens on loopback and the world sees 443. For a node on a public port other than 443 it is a valid warning; consider 443.

## Which clients work? {#clients}

Any client that imports standard share links or subscriptions: v2rayN, v2rayNG, Clash Verge Rev, Shadowrocket, Stash, sing-box, NekoBox, Hiddify and more. PSM also exports complete Clash Meta (mihomo) and sing-box configs.

## How do I update or uninstall? {#update}

Update: run the install command again, or "Update PSM" in the menu. Uninstall: `bash /opt/psm/uninstall.sh`; shared components are confirmed one by one.

## Will it overwrite my existing Nginx? {#nginx}

PSM manages only its own sites and the port 443 routing. If the server already runs important websites, back up `/etc/nginx` first.

## Can I install it as a non-root user? {#root}

No. PSM installs system services, certificates and firewall rules, so it needs root. Once installed, the proxy cores themselves run unprivileged.

## Can it manage many servers centrally? {#multi-server}

Not at the moment. PSM manages one server at a time and has no multi-server panel; realm can relay traffic between servers.

## How do I change the interface language? {#language}

"Language" in the main menu: Simplified Chinese, English, Korean or Russian; `PSM_LANG=en psm` switches for one session.

## Self-hosting or a commercial proxy subscription? {#vs-airport}

A commercial proxy subscription (an "airport" in Chinese communities) is shared by many users. It is ready to use and has many nodes, but its IPs are shared, so streaming and AI services restrict them more often, and quality and stability depend on the provider.

A self-hosted proxy runs on a VPS you rent: the IP is used only by you and the people you share it with, and you choose the protocols, routing and exits. The cost is the VPS and maintaining the server. PSM turns that maintenance, installing, updating, [diagnosis and repair](/en/features/doctor) and [moving servers](/en/features/migrate), into a menu and commands. The terms are explained in the [glossary](/en/guide/glossary).

## How is PSM different from web panels such as x-ui or 3x-ui? {#vs-panel}

x-ui and 3x-ui are web panels for Xray: you work in a browser, and a panel port is exposed to the internet.

PSM is a menu over SSH and exposes no management port. It manages Xray, sing-box and mihomo together, and also takes care of [port 443 sharing](/en/features/port-443), certificates, the firewall, [SSH hardening](/en/features/security), diagnosis and repair, and server migration. If you prefer a browser, a panel suits you; if you want one tool to install and then look after the whole server, choose PSM.

## Is PSM free? {#free}

Yes, open source under AGPL-3.0, on [GitHub](https://github.com/jinqians/proxy-stack). Use it within the law where you live.
