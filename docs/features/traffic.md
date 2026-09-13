---
title: 流量配额与到期管理：按节点限流量、到期自动停用
description: PSM 统计 Xray、sing-box、mihomo 每个节点以及独立安装的 Snell、ss-rust（SS2022）的流量，按月设置流量配额，达到 90% 用 Telegram 提醒，用满自动暂停；节点可设置到期时间，临期提醒、到期停用、一键续期。
keywords: 流量监控, 流量配额, Telegram 通知, 到期停用
---

# 流量配额与到期

## 按节点的流量配额

在主菜单 **15. 流量管理** 里给节点设置每月流量上限：

- 覆盖三个内核（Xray、sing-box、mihomo）的所有节点，以及独立安装的 **Snell**（主用户端口）和 **ss-rust（SS2022）**；每分钟统计一次（先选 **安装自动检查定时器**）。
- Xray 节点用 Xray 自带的统计 API；sing-box、mihomo 节点和独立的 Snell、ss-rust 用 iptables 按端口计数。挂在 443 复用上的节点按它在本机的后端端口统计，不会和其他节点混在一起。
- 用到 90% 时通过 Telegram 提醒一次。
- 用满自动暂停这个节点，每月的重置日到了自动清零恢复（重置日可以自己设）。
- 也可以手动暂停、恢复、清零。

![流量管理菜单](/images/traffic.zh.png){.shot}

想按"人"而不是按"节点"限流量，用 [多用户](/features/users) 的 `--quota`（统计 Xray 节点）。

## 到期管理

给节点设一个到期时间，适合临时借给别人用：

- 临期和到期时 Telegram 提醒。
- 到期自动暂停服务。
- 一键续期。

## Telegram 通知和机器人

配置 Telegram Bot 后，可以直接在 Telegram 里查节点流量、处理到期续费、接收每日体检报告（服务状态、流量预警、到期提醒、证书、安全状态）。租户也可以绑定自己的端口，查询自己的用量。设置方法见 [Telegram 机器人](/features/telegram)。
