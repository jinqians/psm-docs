---
title: 常见问题：VPS 搭建科学上网节点、协议选择、连不上怎么办
description: PSM 常见问题：VPS 怎么搭建科学上网节点、需不需要域名、REALITY 和 Hysteria2 怎么选、节点连不上怎么排查、IP 被封怎么办、能不能给多人用、如何更新卸载。
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"VPS 怎么搭建科学上网节点？","acceptedAnswer":{"@type":"Answer","text":"以 root 登录 VPS，执行 bash <(curl -fsSL https://psm.jinqians.com) 安装 PSM，运行 psm 安装 Xray，创建一个 VLESS REALITY 节点，把导出的链接或二维码导入客户端即可。"}},{"@type":"Question","name":"搭节点需要域名吗？","acceptedAnswer":{"@type":"Answer","text":"VLESS REALITY、Shadowsocks 2022 不需要域名和证书；Vision、Trojan、AnyTLS、Hysteria2、TUIC 需要证书，Hysteria2、TUIC、AnyTLS 可以用自签证书。"}},{"@type":"Question","name":"REALITY、Hysteria2、TUIC 该选哪个？","acceptedAnswer":{"@type":"Answer","text":"先用 VLESS REALITY 做主力；网络丢包严重时加 Hysteria2；再加 TUIC 或 AnyTLS 做备用。PSM 支持多个协议同时运行。"}},{"@type":"Question","name":"节点连不上怎么办？","acceptedAnswer":{"@type":"Answer","text":"先运行 psm doctor 检查服务和配置，psm doctor --fix 可以自动修复常见问题；再确认云服务商的安全组放行了节点端口，客户端链接里的 IP 和端口正确。"}},{"@type":"Question","name":"PSM 收费吗？","acceptedAnswer":{"@type":"Answer","text":"不收费。PSM 以 AGPL-3.0 协议开源，代码托管在 GitHub。"}},{"@type":"Question","name":"PSM 支持哪些系统？","acceptedAnswer":{"@type":"Answer","text":"Debian、Ubuntu、Alpine 和 RHEL / CentOS / Rocky Linux / AlmaLinux 等 Red Hat 系，x86_64 和 arm64，需要 root 权限。"}}]}'
---

# 常见问题

## VPS 怎么搭建科学上网节点？ {#how-to-build}

1. 买一台海外 VPS，以 root 登录。
2. 执行 `bash <(curl -fsSL https://psm.jinqians.com)` 安装 PSM。
3. 运行 `psm`，在「Xray 管理」里安装 Xray。
4. 创建一个 VLESS REALITY 节点。
5. 把导出的链接或二维码导入客户端。

完整步骤见 [1 分钟快速开始](/guide/quick-start)。

## 需要域名吗？ {#domain}

不一定。VLESS REALITY 和 Shadowsocks 2022 不需要域名和证书，只有 IP 就能用。Vision、Trojan 需要域名证书；Hysteria2、TUIC、AnyTLS 需要证书，但可以用自签证书。

## 该用哪个协议？ {#protocol}

先用 VLESS REALITY 做主力；网络丢包严重时加 Hysteria2；再加 TUIC 或 AnyTLS 备用。详见 [协议怎么选](/guide/choose-protocol)。

## 节点连不上怎么办？ {#not-working}

按顺序检查：

1. 运行 `psm doctor`，能自动修的用 `psm doctor --fix`。
2. 确认**云服务商的安全组 / 防火墙**放行了节点端口（TCP 或 UDP，Hysteria2 和 TUIC 要放行 UDP）。PSM 只能管服务器本机的防火墙。
3. 确认客户端链接里的 IP、端口正确，客户端版本不要太旧。
4. REALITY 节点可以换一个伪装目标试试。

## IP 被封了怎么办？ {#ip-blocked}

在服务商那里换 IP，或者换一台 VPS，然后用 `psm migrate push root@新服务器` 把整台服务器搬过去，节点和凭据都不变。详见 [一键迁移](/features/migrate)。平时可以同时开 REALITY 和 Hysteria2 两条线路，一条被干扰还有另一条。

## 能给多个人用吗？ {#multi-user}

可以，用 `psm user` 给每个人建独立账号，有各自的凭据、到期时间和订阅地址，Xray 节点还能限制每月流量。详见 [多用户](/features/users)。

## 伪装目标可以选 Cloudflare 后面的网站吗？ {#cdn-dest}

不建议。REALITY 会把认证失败的连接原样转给伪装目标。如果目标在 CDN 后面，别人可以借你的服务器访问整个 CDN，流量算你的。PSM 配置时会检测并提醒；最好选同机房、不在 CDN 后面的站点。

## 日志里有 "REALITY: Listening on non-443 ports" 警告？ {#non-443}

节点挂在 [443 端口复用](/features/port-443) 上时可以忽略：节点监听的是本机回环端口，对外就是 443。节点直接用公网非 443 端口时，这是有效提醒，建议改用 443。

## 支持哪些客户端？ {#clients}

所有支持标准分享链接或订阅的客户端，例如 v2rayN、v2rayNG、Clash Verge Rev、Shadowrocket、Stash、sing-box、NekoBox、Hiddify。PSM 还能直接导出 Clash Meta（mihomo）和 sing-box 的完整配置。

## 怎么更新和卸载？ {#update}

更新：再执行一次安装命令，或在菜单选「更新 PSM」。卸载：`bash /opt/psm/uninstall.sh`，共用的组件会逐个确认。

## 会覆盖服务器上已有的 Nginx 吗？ {#nginx}

PSM 只管理自己的站点和 443 分流配置。服务器上已有重要网站的话，操作前先备份 `/etc/nginx`。

## 能用非 root 用户安装吗？ {#root}

不能。PSM 要安装系统服务、证书和防火墙规则，必须是 root。不过装好以后，代理内核本身以非 root 用户运行。

## 能集中管理多台服务器吗？ {#multi-server}

目前不行。PSM 以单台服务器为单位管理，没有多机面板；可以用 realm 在多台服务器之间做中转。

## 怎么切换界面语言？ {#language}

主菜单「语言 / Language」，支持简体中文、English、한국어、Русский；也可以 `PSM_LANG=en psm` 临时切换。

## PSM 收费吗？ {#free}

免费，以 AGPL-3.0 协议开源，代码在 [GitHub](https://github.com/jinqians/proxy-stack)。请在当地法律允许的范围内使用。
