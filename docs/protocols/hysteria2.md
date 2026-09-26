---
title: Hysteria2 节点搭建教程：端口跳跃、Salamander / Gecko 混淆、自签证书（Xray / sing-box / mihomo）
description: 用 PSM 搭建 Hysteria2 节点：UDP（QUIC）协议，丢包和晚高峰更快；支持端口跳跃、Salamander 和 Gecko 混淆、自签证书和 ECH，Xray、sing-box、mihomo 和官方独立版都能用。
keywords: Hysteria2 搭建, Hysteria2 端口跳跃, Hysteria2 混淆, salamander, hy2 一键脚本, Hysteria2 自签证书
---

# Hysteria2

Hysteria2 基于 QUIC（UDP），自带激进的拥塞控制，在丢包严重、晚高峰拥堵的线路上通常比 TCP 协议快得多。推荐和 [REALITY](/protocols/reality) 搭配：一条 TCP、一条 UDP，互为备份。

| | |
| --- | --- |
| 传输 | UDP（QUIC） |
| 支持的内核 | sing-box、mihomo、Xray（v26.3.27 及以上）；另有官方独立版 |
| 域名和证书 | 需要证书，自签证书也可以 |
| 常用客户端 | v2rayN、v2rayNG、Shadowrocket、Clash Verge Rev、sing-box、NekoBox |

## 在菜单里创建

- sing-box：主菜单 **2** → **4. 节点管理** → **3. Hysteria2**
- mihomo：主菜单 **3** → **4** → **3**
- Xray：主菜单 **4** → **4** → **8**
- 官方独立版：主菜单 **7. Hysteria2 管理** → **1. 安装 / 重新配置**，之后可以改密码、带宽限速、证书，选"显示分享链接"导出

sing-box 和 mihomo 的菜单可以直接生成自签证书。

![sing-box 的 Hysteria2 节点菜单](/images/pm-hysteria2.zh.png){.shot}

## 用命令创建

```bash
psm node add sing-box hysteria2 --tag my-hy2 --port 8443 \
  --sni hk.example.com \
  --cert-path /etc/psm/certs/hk.crt --key-path /etc/psm/certs/hk.key \
  --obfs-pass 混淆密码 --hop-ports 20000-20999
```

| 参数 | 说明 |
| --- | --- |
| `--sni`、`--cert-path`、`--key-path` | 证书；用自签证书时再加 `--insecure 1`（都不填则 PSM 自动签一张，链接带上它的指纹 `pinSHA256`） |
| `--password` | 认证密码，不填自动生成 |
| `--obfs-pass` | 开启混淆并设置混淆密码 |
| `--obfs-type salamander\|gecko` | 混淆类型，默认 Salamander；Gecko 需要 sing-box 1.14+、mihomo 1.19.26+ 或 Xray v26.3.27+ |
| `--hop-ports 起始-结束` | 端口跳跃：把这段 UDP 端口都转到节点端口 |
| `--bbr-profile conservative\|standard\|aggressive` | 服务器发数据时 BBR 拥塞控制的激进程度（不限速时生效），不填用内核默认的 standard；丢包高的跨境线路可以试 aggressive。需要 sing-box 1.14+、mihomo 1.19.24+ 或 Xray v26.4.13+（Xray 的稳定版 v26.3.27 没有，要装预览版） |
| `--ech true` | 加上 ECH（sing-box / mihomo） |

## 端口跳跃

有些运营商会对单个 UDP 端口限速或阻断。开了端口跳跃，客户端会在一段端口范围里不断更换端口，服务器用防火墙规则把整段端口转给同一个节点。PSM 自动写好转发规则，重启后也会恢复，详见 [端口跳跃](/features/port-443#port-hopping)。

记得在云服务商的安全组里放行节点端口**和整段跳跃端口**（都是 UDP）。

## 导出给客户端

```bash
psm node export sing-box hysteria2 my-hy2
```

输出 `hysteria2://` 链接，端口跳跃和混淆参数都已经带在里面：

![Hysteria2 节点的分享链接](/images/export-hk-hy2.zh.png){.shot}

![psm node show 显示的 Hysteria2 节点参数](/images/show-hk-hy2.zh.png){.shot}
