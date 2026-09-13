---
title: PSM 支持哪些系统：Debian、Ubuntu、Alpine、CentOS / Rocky / AlmaLinux
description: PSM 支持 Debian 系（Debian、Ubuntu）、Alpine 和 Red Hat 系（RHEL、CentOS、Rocky Linux、AlmaLinux、Oracle Linux、Fedora、Amazon Linux），x86_64 和 arm64。列出实际测试过的版本和各系统的注意事项。
---

# 支持的系统

PSM 支持三大 Linux 系列，需要 root 权限，架构为 x86_64 或 arm64。

| 系列 | 发行版 | 最低版本 |
| --- | --- | --- |
| Debian 系 | Debian | 10 及以上 |
| | Ubuntu | 20.04 LTS 及以上 |
| Alpine | Alpine Linux | 3.18 及以上 |
| Red Hat 系 | RHEL、CentOS、Rocky Linux、AlmaLinux、Oracle Linux | 8 及以上 |
| | Fedora | 较新的受支持版本 |
| | Amazon Linux | 2 及以上 |

CentOS 7、Debian 9、Ubuntu 18.04 及更早的版本没有适配，不保证能用。

## 实际测试过的版本

每次代码提交，都会在测试服务器的容器里对下面这些系统跑完整测试，包括真实客户端连通性和迁移：

- **Debian 13**
- **Ubuntu 24.04、22.04**
- **Alpine 3.22**
- **Rocky Linux 9、AlmaLinux 8**

表里其他发行版使用同一套代码，但没有逐一测试。arm64 的内核会自动下载对应版本，但测试服务器是 x86_64，所以 arm64 没有自动化测试。

## 各系统的注意事项

**Alpine** — 使用 apk 和 OpenRC。全新的 Alpine 没有 bash，请用 `wget -qO- https://psm.jinqians.com | sh` 安装。PSM 会自动装好 GNU 基础工具，并用 cronie 替换 busybox 的 crond。sing-box 会自动下载 musl 版本。独立版 Snell 在 Alpine 上通过 Docker 运行（官方程序不支持 musl）。

**Red Hat 系** — 使用 dnf / yum，需要时自动启用 EPEL，防火墙支持 firewalld。系统自带的 jq 1.6 有缺陷，PSM 会自动换成新版（Ubuntu 22.04 同理）。EL8 自带的 Nginx 1.14 不支持 443 复用需要的 SNI 分流，PSM 会切换到更新的 Nginx 版本。**SELinux 没有测试过**（容器里无法开启），如果遇到问题欢迎反馈。

**Amazon Linux 2** — 它的 systemd 版本太旧，无法以非 root 用户启动代理内核，所以内核在这里以 root 运行，`psm doctor` 会说明原因。
