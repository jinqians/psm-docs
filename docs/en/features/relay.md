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

## Relays from the panel

Once a server has joined the [PSM panel](/en/features/panel), relays can be made on the panel's **中转** page instead of on the server:

| Field | What it is |
| --- | --- |
| Entry server | the machine the rule is installed on, and the one clients connect to |
| Listening port | the port it listens on; the panel opens it in the firewall |
| Landing server | optional. Pick it when the landing machine is in the panel too — it only pairs the two ends so both can be named |
| Landing address / port | what the entry server actually dials; fill it in even when the landing machine is not in the panel |
| Also forward UDP | required for QUIC-based protocols such as Hysteria2 and TUIC |

The panel hands the rule to psm-agent on the entry server, which installs realm first if the server has none. Deleting a relay closes only the port the panel opened itself; a rule you allowed by hand is left alone.

**How the hop is doing**: the list shows the latest round trip, jitter, loss and the traffic carried, and clicking a row opens charts of the round trip and jitter, the loss, and the traffic between measurements — over 1 hour, 6 hours, 24 hours or 7 days. psm-agent measures every minute and the panel keeps 7 days. The round trip is measured with TCP connects rather than ping: ICMP is filtered often enough on these networks that ping would report loss that is not there. A landing side that never answers shows 100% loss instead of an invented round trip.

### Encrypting the hop

Tick **对这一跳加密（TLS）** and the traffic between the entry and landing machines is wrapped in TLS, so what passes between them no longer looks like the node's own protocol. The client-to-entry leg is unaffected — no client configuration changes at all.

- The landing machine has a certificate: enter the name on that certificate.
- The landing machine uses a self-signed one: tick **接受自签名证书**, which keeps the encryption but does not verify the peer.
- TLS wraps TCP only; UDP is still forwarded in the clear.

## More

- **Modify / delete / list relay rules**.
- **Status report**: the relay's resource use, speed and latency to the exit server, which can be pushed to [Telegram](/en/features/telegram).
- Service status, restart, logs, uninstall.

Allow the listening port in the relay's firewall and in your cloud provider's security group (UDP too for UDP rules).
