---
title: SSL 证书：acme.sh 一键签发、通配符证书、自动续期
description: PSM 用 acme.sh 为节点和伪装网站签发免费 SSL 证书：HTTP-01 验证、DNS-01 通配符证书、手动导入已有证书，到期自动续期，续期后自动重载相关服务。
keywords: SSL 证书签发, acme.sh 一键, 通配符证书, Let's Encrypt, 证书自动续期, 节点证书
---

# SSL 证书

Vision、XHTTP、Trojan、VMess 等协议，以及在线订阅和伪装网站，都需要域名证书。PSM 用 acme.sh 签发免费证书，并自动续期。

在主菜单 **10. SSL 证书管理** 里操作：

![SSL 证书管理菜单](/images/cert.zh.png){.shot}

| 选项 | 作用 |
| --- | --- |
| 安装 acme.sh | 第一次使用时安装 |
| 签发证书（HTTP-01） | 最常用；需要域名已解析到本机，且 80 端口可以访问 |
| 签发证书（DNS-01 / 通配符） | 通过 DNS 验证，可以签 `*.example.com` 这样的通配符证书，不需要 80 端口 |
| 手动导入证书 | 已经有证书文件时导入 |
| 续期证书 / 启用自动续期 | 手动续期，或交给定时任务自动续期 |
| 列出证书 / 删除证书 | 管理已有证书 |

## 证书放在哪

签发的证书保存在 `/etc/nginx/ssl/域名/`（`fullchain.pem` 和 `privkey.pem`）。Xray 的 Vision、XHTTP、Trojan、VMess 节点用 `--domain` 指定域名时，就是从这里找证书；sing-box、mihomo 的节点用 `--cert-path`、`--key-path` 指向这两个文件即可。

## 用 Cloudflare 签通配符证书

域名托管在 Cloudflare 的话，在主菜单 **13. Cloudflare DDNS** 里设置好 API 凭据，就能一键用 DNS-01 签发通配符证书，见 [Cloudflare](/features/cloudflare)。

## 不想要域名？

[REALITY](/protocols/reality) 和 [Shadowsocks 2022](/protocols/ss2022) 完全不需要证书；Hysteria2、TUIC、AnyTLS 可以用自签证书。
