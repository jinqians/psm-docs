---
title: 解锁 Netflix、ChatGPT：WARP 出口、家宽 IP 出口与规则集分流
description: VPS 机房 IP 看不了 Netflix、用不了 ChatGPT？PSM 可以接入 Cloudflare WARP 或住宅宽带（家宽）IP 出口，用规则集只把流媒体和 AI 服务的流量分过去，其余流量照常直连。
keywords: WARP 分流, 解锁 Netflix, 解锁 ChatGPT, 分流规则, GeoSite, 规则集
---

# 解锁 Netflix、ChatGPT

很多流媒体和 AI 服务会拦截机房 IP。PSM 的做法是：**只把这些服务的流量**换一个出口，其余流量照常从 VPS 直接出去，速度不受影响。

## 可选的出口 {#exits}

**Cloudflare WARP** — 一键注册 WARP 账号并接入内核出站。Xray、sing-box、mihomo 共用同一个 WARP 账号。

**免费家宽出口** — 自动挑选真正的住宅宽带 IP 做出口，按 IP 归属判断风控的服务看到的是家宽 IP。详见 [免费家宽出口](/features/residential)。

**自定义出站** — 你自己的其他节点（VLESS、Trojan、Shadowsocks、SOCKS5 等）也可以当出口。

## 开启 WARP {#warp}

1. 进入内核菜单 → **5. 路由分流管理**（sing-box 是主菜单 2 → 5，mihomo 是 3 → 5，Xray 是 4 → 5）。
2. 选 **WARP 解锁出站（Netflix / OpenAI 等）**，PSM 自动注册 WARP 账号、写好出站，并按提示加上分流规则。
3. 选 **查看 WARP 实际出口 IP**，确认出口已经是 Cloudflare 的 IP。

![sing-box 的路由分流管理菜单](/images/routing.zh.png){.shot}

同一个菜单里还有 **一键拦截广告**、**一键屏蔽 QUIC** 两个开关，以及自定义出站节点的增删。

## 只给某个节点配出口 {#per-node}

上面这些规则是整台机器共用的：命中 `geosite:netflix` 的流量，不管从哪个节点进来，都走同一个出口。如果你只想让**某一个节点**换出口——比如给家里人用的节点解锁 AI，自己下载用的节点保持直连——用内核菜单里的 **节点出口分流（WARP / 家宽）**：

- sing-box：主菜单 2 → **14**
- mihomo：主菜单 3 → **14**
- Xray：主菜单 4 → **13**

菜单会列出这个内核下的所有节点（不分协议），并标出每个节点当前的出口；选中一个节点后，再选出口（不分流 / WARP / 免费家宽）和范围（AI、流媒体、两者、这个节点的全部流量，或自己写 geosite 列表）。选「不分流」即可取消已有设置。

规则绑定在节点上：改这个节点时规则跟着改，删节点时规则一起删，同一台机器上的其他节点完全不受影响。

命令行做的是同一件事（面板上建节点时的「出口分流」也是）：

```bash
psm node add sing-box hysteria2 --port 443 --exit warp --exit-sites ai
psm node update sing-box hysteria2 <tag> --exit none    # 取消
```

## 按规则分流 {#rules}

在各内核菜单的「路由分流管理」里设置规则：

- **按域名、GeoSite、GeoIP** 指定出口，例如 `geosite:netflix` 走 WARP。
- **订阅式规则集**：贴一个社区规则表的网址（比如 OpenAI.list），选一个出口，表里的所有域名都会从这个出口走。规则集每天自动更新：sing-box 和 mihomo 不用重启；Xray 只在内容真的变了时才重启一次。
- 应用前会先显示规则集里有多少条能用，客户端专用的类型会明确告诉你被丢弃了。

规则集在「路由分流管理」→ **规则集分流（订阅式规则表）** 里管理：可以从常用规则集（来自社区维护的 blackmatrix7）里直接选，也可以贴自定义网址；另有立即更新、移除和每日自动更新开关。

![规则集分流菜单](/images/ruleset.zh.png){.shot}

## 先测一下

主菜单「系统管理」里有流媒体和 AI 服务的解锁检测工具，改出口前后各跑一次，可以直观看到效果。
