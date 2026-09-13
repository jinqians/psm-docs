---
title: Snell 节点搭建教程：Surge 用户的首选（sing-box v5/v6、mihomo、独立 snell-server）
description: 用 PSM 搭建 Snell 节点给 Surge 使用：sing-box 支持 Snell v5 / v6，mihomo 支持 v4 / v5 并可加 ShadowTLS，也可以安装官方独立版 snell-server。一条命令导出 Surge 配置行。
keywords: Snell 搭建, Snell 节点, Surge Snell, snell-server 一键脚本, Snell v5, Snell v6
---

# Snell

Snell 是 Surge 团队开发的代理协议，Surge 原生支持，不需要域名和证书。PSM 有三种方式提供 Snell：

| 方式 | 版本 | 说明 |
| --- | --- | --- |
| sing-box 节点 | v5、v6 | 推荐；需要 sing-box 1.14 及以上，PSM 默认安装的版本已满足 |
| mihomo 节点 | v4、v5 | 可以加一层 ShadowTLS |
| 独立版 snell-server | 官方版本 | 主菜单 **5. Snell 管理**，运行官方安装脚本；Alpine 上通过 Docker 运行 |


## 独立版 snell-server（推荐）

主菜单选 **5. Snell 管理**：

![Snell 管理菜单](/images/snell.zh.png){.shot}

- **1. 安装 / 重新安装**：下载并运行官方 snell-server 的安装脚本，按提示选择版本、端口等。
- **2. 显示配置 / Surge URI**：显示 Surge 配置。
- **6. 更新 Snell**、**8. 诊断 Snell 崩溃**：更新程序、排查启动失败。

### 多用户

选 **1. 安装 / 重新安装** 会打开官方 snell.sh 的完整菜单，里面的 **7. 多用户管理** 可以给每个人单独开一个端口和 PSK，每个用户都是独立的服务，删除一个不影响其他人；**8. 版本管理** 还能让不同用户使用不同的 Snell 版本。

注意：PSM 的流量统计目前只统计主用户的端口，多用户管理里另外添加的端口不在统计范围内。

官方 snell-server 不支持 musl，所以在 Alpine 上 PSM 会用 Docker 运行它（会先询问是否安装 Docker）。在 Alpine 上也可以直接用 sing-box 或 mihomo 的 Snell 节点。

## 用 sing-box 或 mihomo 创建

菜单：sing-box 主菜单 **2** → **4. 节点管理** → **5. Snell**；mihomo 主菜单 **3** → **4** → **5**。

![sing-box 的 Snell 节点菜单](/images/pm-snell.zh.png){.shot}

命令行：

```bash
psm node add sing-box snell --tag my-snell --port 6160 --version 5
```

| 参数 | 说明 |
| --- | --- |
| `--version` | sing-box 可选 5、6；mihomo 可选 4、5 |
| `--psk` | 预共享密钥，不填自动生成 |
| `--shadow-tls-sni` | 仅 mihomo：外面套一层 ShadowTLS v3，填一个真实的 TLS 1.3 网站（不能和 obfs 同时用） |

## 导出给 Surge

Snell 没有通用的分享链接，导出的是一行 Surge 配置，粘贴到 Surge 配置的 `[Proxy]` 段即可：

```bash
psm node export sing-box snell my-snell
```

![Snell 节点导出的 Surge 配置](/images/export-hk-snell.zh.png){.shot}

