---
title: 1 分钟快速开始：在 VPS 上搭建第一个 VLESS REALITY 节点
description: 手把手教你用 PSM 在 VPS 上搭建第一个科学上网节点：安装 PSM 和 Xray，创建 VLESS REALITY 节点，导出分享链接和二维码，导入 v2rayN、Shadowrocket、Clash Verge Rev 等客户端。
keywords: VPS 搭建节点教程, REALITY 节点搭建, 科学上网教程, 自建梯子, v2rayN 导入, Shadowrocket 导入
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"HowTo","name":"用 PSM 在 VPS 上搭建 VLESS REALITY 节点","step":[{"@type":"HowToStep","name":"安装 PSM","text":"以 root 执行 bash <(curl -fsSL https://psm.jinqians.com)"},{"@type":"HowToStep","name":"安装 Xray","text":"运行 psm，选择 4. Xray 管理 → 1. 安装"},{"@type":"HowToStep","name":"创建 REALITY 节点","text":"psm node add xray reality --tag my-reality --port 443 --server-name 伪装域名 --dest 伪装域名:443"},{"@type":"HowToStep","name":"导出链接和二维码","text":"psm node export xray reality my-reality，或在 Xray 菜单选择 12. 查看节点链接和二维码"},{"@type":"HowToStep","name":"导入客户端","text":"在 v2rayN、Shadowrocket、Clash Verge Rev 等客户端里粘贴链接或扫码"}]}'
---

# 1 分钟快速开始

这一页带你搭好第一个节点：**VLESS REALITY**。它不需要域名和证书，是目前最省心、抗封锁能力也很强的选择。

## 1. 安装 PSM

以 root 登录 VPS，执行：

```bash
bash <(curl -fsSL https://psm.jinqians.com)
```

装好后输入 `psm`，会看到主菜单：

![PSM 主菜单](/images/menu.zh.png){.shot}

## 2. 安装 Xray

在主菜单选 **4. Xray 管理**，再选 **1. 安装**，按提示完成。

![Xray 管理菜单](/images/xray.zh.png){.shot}

## 3. 创建 REALITY 节点

REALITY 需要一个"伪装目标"：一个支持 TLS 1.3 的真实网站，不要选 CDN 后面的站点（原因见 [协议怎么选](/guide/choose-protocol#reality-target)）。

在 Xray 菜单里选 **4. 节点管理** 按提示创建；或者一条命令：

```bash
psm node add xray reality --tag my-reality --port 443 \
  --server-name 伪装域名 --dest 伪装域名:443
```

PSM 会先用真实的内核和这个目标握手一次，测不通会直接告诉你，不会建一个用不了的节点。

## 4. 拿到分享链接和二维码

```bash
psm node export xray reality my-reality
```

会输出一条 `vless://` 开头的链接。在 Xray 菜单选 **12. 查看节点链接和二维码**，还能直接显示二维码。

## 5. 导入客户端

| 平台 | 常用客户端 | 怎么导入 |
| --- | --- | --- |
| Windows | v2rayN、Clash Verge Rev | 复制链接，在客户端里"从剪贴板导入" |
| macOS | Clash Verge Rev、sing-box | 同上 |
| Android | v2rayNG、NekoBox、sing-box | 扫码或从剪贴板导入 |
| iOS | Shadowrocket、Stash、sing-box | 扫码 |

导入后选中节点、开启代理，打开任意网站测试即可。

## 下一步

- 网络差时再加一个 [Hysteria2](/guide/choose-protocol)（UDP，弱网更快）。
- 多个节点共用 443：[443 端口复用](/features/port-443)。
- 给家人朋友分账号：[多用户](/features/users)。
- 一次导入所有节点：[订阅](/features/subscription)。
