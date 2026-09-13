---
title: 订阅与客户端导入：分享链接、二维码、Clash / sing-box 配置
description: PSM 为每个节点生成标准分享链接和二维码，并导出 Base64 订阅、Clash Meta（mihomo）和 sing-box 客户端配置；可开启带有效期、可随时作废的在线订阅，v2rayN、Clash Verge Rev、Shadowrocket 等客户端直接导入。
---

# 订阅与客户端导入

## 单个节点：分享链接和二维码

每个节点都能导出标准分享链接（`vless://`、`hysteria2://`、`tuic://` 等）和二维码。菜单里查看节点时直接显示；命令行：

```bash
psm node export xray reality hk-reality
```

手机客户端扫码、电脑客户端粘贴链接即可导入。

<img src="/images/qr.png" alt="节点分享二维码示例" width="200">

## 全部节点：订阅

PSM 可以把所有节点一次性导出成三种格式：

| 文件 | 格式 | 适用客户端 |
| --- | --- | --- |
| `sub.txt` | Base64 编码的链接列表（通用订阅） | v2rayN、v2rayNG、Shadowrocket、NekoBox 等 |
| `mihomo.yaml` | Clash Meta（mihomo）完整配置 | Clash Verge Rev、Mihomo Party、FlClash 等 |
| `singbox.json` | sing-box 客户端完整配置 | sing-box 官方客户端、Karing、Hiddify 等 |

在主菜单 **22. 客户端订阅** 里选 **导出到本地文件**，文件会保存在服务器上，你可以自己下载。同一个菜单里可以生成、查看和关闭在线订阅：

![客户端配置导出与订阅菜单](/images/subscribe.zh.png){.shot}

## 在线订阅

在线订阅让客户端直接用网址更新节点，不用每次手动导入：

- 订阅文件挂在你的 HTTPS 伪装网站下，地址形如 `https://你的域名/psm-sub/<48 位随机令牌>/sub.txt`。
- 需要一个解析到本机的域名和证书；没有证书的话 PSM 会帮你申请。
- 默认 30 天有效，到期自动删除；链接泄露了可以随时重置令牌，旧链接立即失效。
- 如果 Nginx 管理着 443 端口，PSM 会自动把订阅域名加进分流表。

::: warning 订阅里是全部凭据
订阅文件包含所有节点的密码和密钥，只发给信任的人；多人使用时请用 [多用户](/features/users)，每人一个独立订阅。
:::

## 多用户的订阅

每个用户都有自己的订阅地址，里面只有他被分配到的节点，凭据也是他自己的。用户到期、超额或被禁用时，他的订阅自动失效。详见 [多用户](/features/users)。
