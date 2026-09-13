---
title: "Relays with realm: turn a VPS into a relay, forwarding TCP and UDP"
description: Use PSM's realm relay to turn a VPS into a relay - a local port forwarded to the node port on your exit server, UDP included (needed for Hysteria2 and TUIC), with status reports pushed to Telegram.
keywords: relay server setup, realm port forwarding, proxy relay, exit server, UDP forwarding
---

# Relays (realm)

A relay puts another server between the client and the node: the client connects to the **relay**, which forwards the traffic unchanged to the **exit server** (the VPS that actually runs the node). Typical uses: an entry point with a better route, or one entry for several exit servers. PSM forwards ports with [realm](https://github.com/zhboner/realm).

On the relay, open main menu **12 (Relay (realm))**; the first time, it offers to install realm:

![Relay menu](/images/realm.en.png){.shot}

## Adding a relay rule

Choose **Add a relay rule** and fill in:

| Prompt | Example |
| --- | --- |
| Rule name | `hk-reality` |
| Local listening port | `5000` |
| Exit server address (IP or domain) | `1.2.3.4` |
| Exit server port | `443` (the port of the REALITY node on the exit server) |
| Also forward UDP? | yes, when the node is a UDP protocol such as Hysteria2 or TUIC |

Then point the client at the **relay's IP and the local listening port** (in the example, `RELAY_IP:5000`) and leave everything else as it was.

## More

- **Modify / delete / list relay rules**.
- **Status report**: the relay's resource use, speed and latency to the exit server, which can be pushed to [Telegram](/en/features/telegram).
- Service status, restart, logs, uninstall.

Allow the listening port in the relay's firewall and in your cloud provider's security group (UDP too for UDP rules).
