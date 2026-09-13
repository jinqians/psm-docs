---
title: 多用户：给家人朋友分账号，设到期时间和流量配额
description: PSM 的 psm user 命令为 Xray、sing-box、mihomo 节点添加多个用户：每人独立的 UUID 和密码、到期时间、独立订阅地址，Xray 节点支持按用户的月流量配额，到期或超额自动停用。
---

# 多用户

一个节点可以给多个人用，每个人有自己的凭据、到期时间和订阅地址。节点原本的凭据（"所有者"）保持不变，已经发出去的链接继续可用。

## 常用命令

```bash
psm user add alice                          # 所有节点，永不过期
psm user add bob --nodes hk-reality,hk-hy2 --days 30 --quota 100G
psm user list                               # 所有用户、状态、用量、到期时间
psm user show bob                           # 某个用户的详情和订阅地址
psm user links bob                          # 打印 bob 的全部分享链接
psm user update bob --days 30               # 续期 30 天
psm user update bob --disable               # 暂停；--enable 恢复
psm user token bob                          # 重置订阅地址，旧地址立即失效
psm user delete bob
```

大小写法：`500M`、`100G`、`1T` 或字节数。日期写法：`--expires 2026-12-31`（当天结束时到期）。

## 每个用户得到什么

- **一个 UUID 和一个密码**，在他能用的每个节点上通用：VLESS、VMess、TUIC 用 UUID；Trojan、Hysteria2、AnyTLS、TUIC、SOCKS5 用密码（SOCKS5 的用户名是 `psmu-用户名`）。
- **自己的订阅地址**，里面只有分配给他的节点。需要先开启 [在线订阅](/features/subscription#在线订阅)。
- **到期时间**：到期后自动从所有节点移除，续期后自动恢复。

## 流量配额

`--quota` 设的是**每个自然月**的流量，统计的是该用户经过 **Xray 节点** 的流量。用满后，他的账号会在所有内核上暂停，下个月 1 号自动恢复；也可以用 `--reset-usage` 手动清零。

::: info 为什么只统计 Xray 节点
Xray 能按用户统计流量，sing-box 和 mihomo 不提供这个数据。sing-box 和 mihomo 节点仍然可以用 [按节点的流量配额](/features/traffic)。
:::

## 支持的协议

VLESS（含 REALITY、Vision、XHTTP）、VMess、Trojan、Hysteria2、TUIC、AnyTLS、SOCKS5（需开启认证）。Shadowsocks 2022、Snell、WireGuard 只有一个密钥，不支持多用户：给 SS2022 加用户会让原来的链接失效。

## 它是怎么生效的

用户存在 PSM 的配置里。每次 PSM 重启内核之前，会把当前有效的用户写进内核配置，再交给内核自己校验，所以重复应用不会产生重复条目。系统每分钟检查一次：有人到期或超额，就自动重新应用。迁移服务器时，用户和他们的订阅地址一起搬过去。
