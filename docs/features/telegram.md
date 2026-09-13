---
title: Telegram 机器人：流量提醒、到期通知、每日体检报告、租客自助查询
description: 给 PSM 配置 Telegram Bot：流量用到 90% 提醒、到期通知、每日体检报告和安全告警推送到 Telegram；管理员在 Telegram 里管理流量，租客绑定端口后可以自己查询用量。
keywords: Telegram 机器人, 流量提醒, 到期通知, VPS 监控 Telegram, 节点流量查询
---

# Telegram 机器人

配置好 Telegram Bot 后，PSM 的各种通知都会推送到 Telegram：

- 节点流量用到 90%、用满暂停；
- 节点和用户临期、到期；
- 每日体检报告：服务状态、流量预警、到期提醒、证书、安全状态；
- 蜜罐抓到扫描器、中转机状态报告等告警。

在主菜单 **16. Telegram Bot** 里设置：

![Telegram Bot 管理菜单](/images/tgbot.zh.png){.shot}

## 设置步骤

1. 在 Telegram 里找 [@BotFather](https://t.me/BotFather) 创建一个机器人，拿到 Bot Token。
2. 在菜单里选 **配置 Bot Token / 管理员权限**，填入 Token 和你自己的 Telegram 用户 ID（管理员）。
3. 选 **启动 Bot 服务**。之后给机器人发消息就能使用。
4. 需要的话打开 **每日体检报告**。

## 管理员和租客

- **管理员**可以在 Telegram 里查看和管理所有节点的流量、处理到期续期。
- **租客**：把节点借给别人时，在 **管理租客绑定** 里把对方的 Telegram 用户 ID 绑定到节点端口。租客给机器人发消息，只能查到自己那个端口的用量。

按人分配账号更推荐用 [多用户](/features/users)，流量规则见 [流量配额与到期](/features/traffic)。
