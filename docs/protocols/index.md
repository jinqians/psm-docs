---
title: PSM 支持的全部协议：REALITY、Hysteria2、TUIC、AnyTLS、Snell、Shadowsocks 2022 搭建教程
description: PSM 支持的所有代理协议一览：VLESS REALITY、Vision、XHTTP、VLESS + TLS、Hysteria2、TUIC、AnyTLS、Shadowsocks 2022、Trojan、VMess、Snell、SOCKS5、WireGuard，各自支持哪些内核、要不要域名证书，以及每个协议的搭建教程。
keywords: 科学上网协议, 节点搭建教程, REALITY 教程, Hysteria2 教程, TUIC 教程, AnyTLS 教程, Snell 教程, Shadowsocks 2022 教程
---

# 协议教程

每个协议一页：在菜单里和命令行里怎么创建、有哪些参数、怎么导出给客户端。还没决定用哪个，先看 [协议怎么选](/guide/choose-protocol)。

| 协议 | 传输 | 域名和证书 | Xray | sing-box | mihomo |
| --- | --- | --- | :-: | :-: | :-: |
| [VLESS REALITY](/protocols/reality) | TCP | 不需要 | ✓ | ✓ | ✓ |
| [VLESS Vision](/protocols/vision) | TCP + TLS | 需要 | ✓ | | |
| [VLESS XHTTP](/protocols/xhttp) | HTTP / UDP | 视模式而定 | ✓ | | |
| [VLESS + TLS](/protocols/vless) | TCP / WS / gRPC 等 | 需要（可自签） | | ✓ | ✓ |
| [Hysteria2](/protocols/hysteria2) | UDP（QUIC） | 需要（可自签） | ✓ | ✓ | ✓ |
| [TUIC v5](/protocols/tuic) | UDP（QUIC） | 需要（可自签） | | ✓ | ✓ |
| [AnyTLS](/protocols/anytls) | TCP + TLS | 需要（可自签） | | ✓ | ✓ |
| [Shadowsocks 2022](/protocols/ss2022) | TCP / UDP | 不需要 | ✓ | ✓ | ✓ |
| [Trojan、VMess](/protocols/trojan-vmess) | TCP + TLS | 需要 | ✓ | ✓ | ✓ |
| [Snell](/protocols/snell) | TCP | 不需要 | | ✓ | ✓ |
| [SOCKS5](/protocols/socks5) | TCP | 不需要 | ✓ | ✓ | ✓ |
| [WireGuard](/protocols/wireguard) | UDP | 不需要 | | ✓ | |

另外还有三个**独立程序**，不依赖上面的内核：主菜单 **5. Snell 管理**（官方 snell-server）、**6. ss-rust 管理**（Shadowsocks 2022）、**7. Hysteria2 管理**（官方 Hysteria2 服务端）。

## 各内核的节点菜单

在内核菜单里选 **4. 节点管理**，就能看到这个内核支持的全部协议，选一个进入即可创建、查看、删除节点。

**Xray**（主菜单 4 → 4）：

![Xray 的协议列表](/images/xray-protocols.zh.png){.shot}

**sing-box**（主菜单 2 → 4）：

![sing-box 的协议列表](/images/sb-protocols.zh.png){.shot}

**mihomo**（主菜单 3 → 4）：

![mihomo 的协议列表](/images/mh-protocols.zh.png){.shot}

## 命令行的通用写法

所有协议都用同一组命令，完整参数见 [命令参考](/reference/cli)：

```bash
psm node add    内核 协议 --tag 名字 --port 端口 [协议参数]
psm node show   内核 协议 名字
psm node export 内核 协议 名字 [--server 地址] [--format uri|json|surge]
psm node delete 内核 协议 名字 --yes
psm node list
```

几个各协议通用的开关：

- `--mount-443`：挂到 [443 端口复用](/features/port-443) 上，和其他节点共用 443。适用于 Xray 的 REALITY、Vision、XHTTP、Trojan、VMess，以及 sing-box / mihomo 的 REALITY、AnyTLS、Trojan、VMess、VLESS。
- `--ech true`：给 sing-box / mihomo 的 VLESS、Trojan、AnyTLS、Hysteria2、TUIC 加上 ECH（加密 Client Hello），不支持 ECH 的旧客户端照样能连。
- `--json`：输出机器可读的结果，方便脚本调用。

UUID、密码、密钥不指定时都会自动生成。查询命令默认隐藏凭据，`export` 会输出客户端需要的完整信息。
