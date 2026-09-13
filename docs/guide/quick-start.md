---
title: 1 分钟快速开始：在 VPS 上用 Xray、sing-box、mihomo 或 Snell 搭建第一个节点
description: 手把手教你用 PSM 在 VPS 上搭建第一个科学上网节点：安装 PSM，任选 Xray、sing-box、mihomo 内核或 Snell，创建 VLESS REALITY 或 Snell 节点，导出分享链接和二维码，导入 v2rayN、Shadowrocket、Clash Verge Rev、Surge 等客户端。
keywords: VPS 搭建节点教程, REALITY 节点搭建, sing-box 安装, mihomo 安装, Snell 搭建, 科学上网教程, 自建梯子, v2rayN 导入, Shadowrocket 导入, Surge Snell
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"HowTo","name":"用 PSM 在 VPS 上搭建第一个节点","step":[{"@type":"HowToStep","name":"安装 PSM","text":"以 root 执行 bash <(curl -fsSL https://psm.jinqians.com)"},{"@type":"HowToStep","name":"安装内核","text":"运行 psm，选择 4. Xray 管理、2. sing-box 管理或 3. mihomo 内核，再选 1. 安装"},{"@type":"HowToStep","name":"创建节点","text":"psm node add xray reality --tag my-reality --port 443 --server-name 伪装域名 --dest 伪装域名:443；Snell 用 psm node add sing-box snell --tag my-snell --port 6160 --version 5"},{"@type":"HowToStep","name":"导出链接和二维码","text":"psm node export xray reality my-reality，或在内核菜单选择 12. 查看节点链接和二维码"},{"@type":"HowToStep","name":"导入客户端","text":"在 v2rayN、Shadowrocket、Clash Verge Rev 等客户端里粘贴链接或扫码；Snell 把配置行粘贴进 Surge"}]}'
---

# 1 分钟快速开始

这一页带你搭好第一个节点。推荐从 **VLESS REALITY** 开始：它不需要域名和证书，是目前最省心、抗封锁能力也很强的选择。Xray、sing-box、mihomo 三个内核都能跑 REALITY，任选一个即可；用 Surge 的话，也可以直接建一个 **Snell** 节点。

## 1. 安装 PSM

以 root 登录 VPS，执行：

```bash
bash <(curl -fsSL https://psm.jinqians.com)
```

装好后输入 `psm`，会看到主菜单：

![PSM 主菜单](/images/menu.zh.png){.shot}

## 2. 安装一个内核

三个内核可以同时装，互不影响。不知道选哪个，就用 Xray；各自的区别见 [Xray / sing-box / mihomo](/guide/cores)。

### Xray

主菜单选 **4. Xray 管理**，再选 **1. 安装**。Xray 是 REALITY、Vision、XHTTP 的发源地，也支持按用户统计流量。

![Xray 管理菜单](/images/xray.zh.png){.shot}

### sing-box

主菜单选 **2. sing-box 管理**，再选 **1. 安装**，按提示选择版本（推荐稳定版）。sing-box 支持的协议最多：Hysteria2、TUIC、AnyTLS、Snell、WireGuard 都在这里。

![sing-box 管理菜单](/images/singbox.zh.png){.shot}

### mihomo

主菜单选 **3. mihomo 内核**，再选 **1. 安装**。mihomo（原 Clash.Meta）同样支持 REALITY、Hysteria2、TUIC、AnyTLS、Snell，还能加 ShadowTLS。

![mihomo 管理菜单](/images/mihomo.zh.png){.shot}

### Snell

Snell 是 Surge 的协议，有两种装法：

- **推荐：独立版 Snell。** 主菜单选 **5. Snell 管理**，再选 **1. 安装**，运行官方 snell-server 的安装脚本，按提示选择版本和端口。装好后选 **2. 显示配置 / Surge URI** 拿到配置。Alpine 上独立版通过 Docker 运行。

  ![Snell 管理菜单](/images/snell.zh.png){.shot}

- **用 sing-box 或 mihomo 建 Snell 节点。** 装好上面任一内核，下一步一条命令就能建好（sing-box 支持 v5 / v6，mihomo 支持 v4 / v5）。

## 3. 创建第一个节点

REALITY 需要一个"伪装目标"：一个支持 TLS 1.3 的真实网站，不要选 CDN 后面的站点（原因见 [协议怎么选](/guide/choose-protocol#reality-target)）。在内核菜单里选 **4. 节点管理** 按提示创建，或者一条命令：

::: code-group

```bash [Xray]
psm node add xray reality --tag my-reality --port 443 \
  --server-name 伪装域名 --dest 伪装域名:443
```

```bash [sing-box]
psm node add sing-box reality --tag my-reality --port 443 \
  --server-name 伪装域名 --dest 伪装域名:443
```

```bash [mihomo]
psm node add mihomo reality --tag my-reality --port 443 \
  --server-name 伪装域名 --dest 伪装域名:443
```

```bash [Snell]
psm node add sing-box snell --tag my-snell --port 6160 --version 5
```

:::

PSM 会先用真实的内核和伪装目标握手一次，测不通会直接告诉你，不会建一个用不了的节点。UUID、密钥、密码都会自动生成。

## 4. 拿到分享链接和二维码

```bash
psm node export xray reality my-reality
```

会输出一条 `vless://` 开头的链接（其他内核把 `xray` 换成 `sing-box` 或 `mihomo`）：

![psm node export 输出的分享链接](/images/export.zh.png){.shot}

在内核菜单选 **12. 查看节点链接和二维码**，还能直接显示二维码，手机客户端扫一下就能导入：

![REALITY 节点的二维码](/images/qr.png){.shot style="max-width:260px"}

Snell 没有通用的分享链接，用的是一行 Surge 配置。独立版 Snell 在 Snell 菜单选 **2. 显示配置 / Surge URI** 获取；sing-box / mihomo 的 Snell 节点用命令导出：

```bash
psm node export sing-box snell my-snell
```

![Snell 节点导出的 Surge 配置](/images/export-hk-snell.zh.png){.shot}

## 5. 导入客户端

| 平台 | 常用客户端 | 怎么导入 |
| --- | --- | --- |
| Windows | v2rayN、Clash Verge Rev | 复制链接，在客户端里"从剪贴板导入" |
| macOS | Clash Verge Rev、sing-box、Surge | 同上；Snell 把配置行粘贴到 Surge 的 `[Proxy]` 段 |
| Android | v2rayNG、NekoBox、sing-box | 扫码或从剪贴板导入 |
| iOS | Shadowrocket、Stash、sing-box、Surge | 扫码；Snell 同样粘贴到 Surge |

导入后选中节点、开启代理，打开任意网站测试即可。

## 下一步

- 每个协议的详细用法：[协议教程](/protocols/)。
- 网络差时再加一个 [Hysteria2](/protocols/hysteria2)（UDP，弱网更快）。
- 多个节点共用 443：[443 端口复用](/features/port-443)。
- 给家人朋友分账号：[多用户](/features/users)。
- 一次导入所有节点：[订阅](/features/subscription)。
