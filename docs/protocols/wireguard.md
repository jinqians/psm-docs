---
title: WireGuard 服务端搭建教程：sing-box 端点，一键生成客户端配置
description: 用 PSM 在 sing-box 上创建 WireGuard 端点，按人数生成客户端，导出标准 wg-quick 配置，WireGuard 官方客户端和 mihomo / sing-box 客户端都能用。
keywords: WireGuard 搭建, WireGuard 服务端, sing-box WireGuard, wg-quick 配置, WireGuard 一键脚本
---

# WireGuard

WireGuard 是现代的 VPN 协议，速度快、配置简单，接管的是整台设备的网络。它的流量特征很明显，**不适合用来过墙**；适合连回自己的服务器、在几台设备之间组网，或者在网络宽松的地方当普通 VPN 用。

| | |
| --- | --- |
| 传输 | UDP |
| 支持的内核 | sing-box（WireGuard 端点） |
| 域名和证书 | 不需要 |
| 常用客户端 | WireGuard 官方客户端；mihomo、sing-box 客户端 |

## 在菜单里创建

sing-box：主菜单 **2** → **4. 节点管理** → **11. WireGuard**。

![sing-box 的 WireGuard 菜单](/images/pm-wireguard.zh.png){.shot}

## 用命令创建

```bash
psm node add sing-box wireguard --tag my-wg --port 51820 --peer-count 2
```

`--peer-count` 是要生成的客户端数量，每个客户端有自己的密钥和地址。

## 导出客户端配置

```bash
psm node export sing-box wireguard my-wg
```

每个客户端输出一份标准的 wg-quick 配置文件，导入 WireGuard 官方客户端即可；mihomo、sing-box 客户端也能用这份配置建立连接。

![WireGuard 导出的 wg-quick 客户端配置](/images/export-hk-wg.zh.png){.shot}

记得在云服务商的安全组里放行这个 **UDP** 端口。
