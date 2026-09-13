---
title: 解锁 Netflix、ChatGPT：WARP 出口、家宽 IP 出口与规则集分流
description: VPS 机房 IP 看不了 Netflix、用不了 ChatGPT？PSM 可以接入 Cloudflare WARP 或住宅宽带（家宽）IP 出口，用规则集只把流媒体和 AI 服务的流量分过去，其余流量照常直连。
---

# 解锁 Netflix、ChatGPT

很多流媒体和 AI 服务会拦截机房 IP。PSM 的做法是：**只把这些服务的流量**换一个出口，其余流量照常从 VPS 直接出去，速度不受影响。

## 可选的出口

**Cloudflare WARP** — 一键注册 WARP 账号并接入内核出站。Xray、sing-box、mihomo 共用同一个 WARP 账号。

**免费家宽出口** — 自动挑选真正的住宅宽带 IP 做出口，按 IP 归属判断风控的服务看到的是家宽 IP。详见 [免费家宽出口](/features/residential)。

**自定义出站** — 你自己的其他节点（VLESS、Trojan、Shadowsocks、SOCKS5 等）也可以当出口。

## 按规则分流

在各内核菜单的「路由分流管理」里设置规则：

- **按域名、GeoSite、GeoIP** 指定出口，例如 `geosite:netflix` 走 WARP。
- **订阅式规则集**：贴一个社区规则表的网址（比如 OpenAI.list），选一个出口，表里的所有域名都会从这个出口走。规则集每天自动更新：sing-box 和 mihomo 不用重启；Xray 只在内容真的变了时才重启一次。
- 应用前会先显示规则集里有多少条能用，客户端专用的类型会明确告诉你被丢弃了。

## 先测一下

主菜单「系统管理」里有流媒体和 AI 服务的解锁检测工具，改出口前后各跑一次，可以直观看到效果。
