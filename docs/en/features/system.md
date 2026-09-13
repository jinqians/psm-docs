---
title: "System tuning and VPS tests: BBR, swap, DNS, time zone, IP quality and streaming unlock checks"
description: PSM's system menu - turn on BBR, tune kernel parameters, create swap, set DNS and the time zone, sync time - plus built-in VPS tests for latency, return routes, NodeQuality, bench.sh, YABS, IP quality and streaming unlocks.
keywords: enable BBR, VPS tuning, swap, VPS benchmark, return route trace, IP quality check, streaming unlock test, YABS
---

# System tuning and VPS tests

Everything is in main menu **1 (System)**:

![System menu](/images/system.en.png){.shot}

## Tuning

| Option | What it does |
| --- | --- |
| Show system info | OS, kernel, CPU, memory, disk and so on |
| Enable BBR | BBR congestion control, noticeably faster on high-latency, lossy international routes |
| Apply kernel tuning | adjusts network-related kernel parameters |
| Create / delete swap | a swap file for small-memory VPSes |
| Set DNS, time zone, sync time (NTP) | basic system settings |
| Configure the firewall (443 + 22 only) | allows only 443 and SSH; for servers where every node is on [shared port 443](/en/features/port-443) |

## VPS tests

**VPS test tools** brings together the usual test scripts:

| Tool | Purpose |
| --- | --- |
| Quick check | a quick look at this machine |
| Latency test, return route trace | latency from around the world, and the route traffic takes back |
| NodeQuality | a combined report on hardware, network and IP quality |
| bench.sh, YABS, LemonBench | performance tests |
| IP quality | the IP's type, risk score and whether it is flagged |
| Streaming unlock check | whether Netflix, ChatGPT and others work; run it before and after changing an exit |

The test scripts come from their own open-source projects and are downloaded when run; full tests such as YABS take a while and use a fair amount of bandwidth.
