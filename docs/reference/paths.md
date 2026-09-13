---
title: PSM 的文件与安装路径
description: PSM 安装在 /opt/psm，列出它会写入的系统路径：Xray、sing-box、mihomo、Hysteria2、Nginx、acme.sh 证书、systemd 服务、cron 定时任务和防火墙规则的位置。
---

# 文件与路径

PSM 尽量把自己的东西放在 `/opt/psm`，但有些功能必须写到系统目录里。

| 路径 | 用途 |
| --- | --- |
| `/opt/psm` | PSM 程序、配置、节点记录、备份 |
| `/opt/psm/config` | 节点、用户、订阅、流量等状态（迁移包的核心内容） |
| `/usr/local/bin/psm` | `psm` 命令 |
| `/usr/local/etc/xray`、`/usr/local/bin/xray` | Xray 配置和程序 |
| `/etc/sing-box`、`/usr/local/bin/sing-box` | sing-box 配置和程序 |
| `/etc/mihomo`、`/usr/local/bin/mihomo` | mihomo 配置和程序 |
| `/etc/hysteria`、`/usr/local/bin/hysteria` | 独立版 Hysteria2 |
| `/etc/realm`、`/usr/local/bin/realm` | realm 中转 |
| `/etc/nginx` | Nginx 站点、443 分流表（`stream.d`）和证书（`ssl`） |
| `/root/.acme.sh` | acme.sh 账户和证书签发缓存 |
| `/etc/systemd/system/psm-*` | PSM 的服务和定时器（OpenRC 系统在 `/etc/init.d`） |
| `/etc/cron.d/psm-*` | 备份、DDNS 等 cron 任务 |
| `/var/log/psm` | OpenRC 系统上各服务的日志 |

代理内核以系统用户 `psm-core` 运行；它能读取的只有内核配置、自己的状态目录和配置里用到的证书。

在已经跑着重要网站的服务器上使用前，建议先备份 `/etc/nginx`，或给 VPS 打个快照。
