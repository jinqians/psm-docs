---
title: VLESS REALITY 节点搭建教程：不用域名和证书（Xray / sing-box / mihomo）
description: 用 PSM 一条命令搭建 VLESS REALITY 节点：选择伪装目标、创建前真实握手测试、挂到 443、加 VLESS Encryption，导出 vless:// 链接和二维码。Xray、sing-box、mihomo 都支持。
keywords: REALITY 节点搭建, VLESS REALITY 教程, REALITY 伪装目标, REALITY 一键脚本, xtls-rprx-vision
---

# VLESS REALITY

REALITY 借用一个真实网站的 TLS 握手，服务器不需要自己的域名和证书；没有密钥的访问者（包括主动探测）看到的就是那个真实网站。它是 PSM 推荐的主力协议。

| | |
| --- | --- |
| 传输 | TCP |
| 支持的内核 | Xray、sing-box、mihomo |
| 域名和证书 | 不需要 |
| 共用 443 | 可以（`--mount-443`） |
| 常用客户端 | v2rayN、v2rayNG、Shadowrocket、Clash Verge Rev、sing-box |

## 在菜单里创建

- sing-box：主菜单 **2** → **4** → **1**
- mihomo：主菜单 **3** → **4** → **1**
- Xray：主菜单 **4** → **4. 节点管理** → **1. Reality**

进入后按提示填写端口和伪装目标，UUID、密钥、short ID 都会自动生成。

![Xray 的 REALITY 节点菜单](/images/pm-reality.zh.png){.shot}

## 用命令创建

```bash
psm node add xray reality --tag my-reality --port 443 \
  --server-name learn.microsoft.com --dest learn.microsoft.com:443
```

sing-box、mihomo 把 `xray` 换成 `sing-box` 或 `mihomo` 即可。

| 参数 | 说明 |
| --- | --- |
| `--port` | 监听端口，推荐 443 |
| `--server-name`、`--dest` | 伪装目标的域名和地址，不填时使用默认值 |
| `--mount-443` | 挂到 Nginx 的 443 分流上，和其他节点共用 443 |
| `--vless-enc x25519\|mlkem768` | 再加一层 VLESS Encryption（Xray；mlkem768 是抗量子认证，链接约 1.6 KB） |
| `--skip-dest-probe` | 跳过伪装目标的握手测试（不建议） |

创建前，PSM 会用这个节点所在的内核真实地和伪装目标握手一次。有的网站所有 TLS 检查都能过，却偏偏跑不了 REALITY；测不通的目标不会被采用。

## 伪装目标怎么选

- 选支持 TLS 1.3 的真实网站，**不要选 Cloudflare 等 CDN 后面的站点**，否则别人可以借你的服务器访问整个 CDN。
- 优先选和 VPS 同一个机房、同一个网络的站点，延迟和握手特征都更自然。
- PSM 创建节点时会检测目标是否在共享 CDN 前端，命中会警告并自动开启回落限速，详见 [防止被偷流量](/features/anti-theft)。

详细说明见 [协议怎么选](/guide/choose-protocol#reality-target)。

## 导出给客户端

```bash
psm node export xray reality my-reality
```

输出 `vless://` 链接；在内核菜单选 **12. 查看节点链接和二维码** 还能显示二维码。

![REALITY 节点的分享链接](/images/export-hk-reality.zh.png){.shot}

`psm node show` 可以查看节点的完整参数（凭据默认隐藏）：

![psm node show 显示的 REALITY 节点参数](/images/show-hk-reality.zh.png){.shot}

## 常见问题

- **日志里有 "REALITY: Listening on non-443 ports"**：节点挂在 443 复用上时可以忽略，见 [常见问题](/faq#non-443)。
- **连不上**：先跑 `psm doctor`，再换一个伪装目标试试。
