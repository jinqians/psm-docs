---
title: 443 端口复用：多个节点共用一个 443 端口
description: PSM 用 Nginx stream 的 ssl_preread 按 SNI 分流，让 REALITY、Vision、XHTTP、AnyTLS 等多个节点和伪装网站共用公网 443 端口，未知域名直接断开。Hysteria2 可开端口跳跃。
---

# 443 端口复用

多个节点可以共用同一个公网 443 端口。PSM 用 Nginx 在 TCP 层读取 TLS 握手里的域名（SNI），不解密流量，按域名把连接转给对应的节点。

```text
客户端 ──443/TCP──▶ Nginx（读 SNI，不解密）
                     ├─ a.example.com  ──▶ REALITY 节点
                     ├─ b.example.com  ──▶ Vision 节点
                     ├─ c.example.com  ──▶ AnyTLS 节点
                     ├─ 你的域名        ──▶ HTTPS 伪装网站
                     └─ 其他域名        ──▶ 直接断开

客户端 ──443/UDP──▶ Hysteria2 / TUIC（独立监听，不冲突）
```

## 有什么好处

- **只开一个端口**：防火墙只需放行 443，被扫描的面更小。
- **陌生域名直接断开**：只有你挂上去的域名才会被转发。扫描器随便填一个域名打过来，连接立刻被断，也就没法把你的服务器当成免费中转。
- **一台机器多个身份**：多个节点和伪装网站同时挂在 443 上，靠域名区分。
- **UDP 443 不冲突**：Hysteria2、TUIC 走 UDP，和 TCP 443 是两套监听，端口号相同也没关系。

## 哪些节点能挂上去

Xray 的 REALITY、Vision、XHTTP、Trojan、VMess，以及 sing-box 和 mihomo 的 REALITY、AnyTLS、Trojan、VMess、VLESS 节点。三个内核共用一张分流表，跨内核用了相同的域名会被检测出来并拦下，避免路由冲突。

## 怎么用

在菜单里新建节点时选择"挂到 443 端口复用"，或者用命令行：

```bash
psm node add xray reality --tag hk-443 --port 21001 \
  --server-name learn.microsoft.com --dest learn.microsoft.com:443 --mount-443
```

节点实际监听在本机回环地址的端口上（例子里是 21001），对外只露出 443。Nginx 没装的话会自动装上。改端口、改域名、删节点时，分流表会自动同步。

::: tip 日志里出现 "REALITY: Listening on non-443 ports"
挂在 443 复用上时这条警告可以忽略：节点监听的是本机回环端口，对外暴露的就是 443。只有节点直接监听公网非 443 端口时，它才是有效提醒。
:::

## 端口跳跃 {#port-hopping}

Hysteria2 节点可以开启端口跳跃：把一段 UDP 端口范围（比如 20000-20999）都转到节点端口上，客户端在这段范围里轮换端口，躲开运营商对单个 UDP 端口的限速。

```bash
psm node add sing-box hysteria2 --tag hk-hy2 --port 8443 \
  --sni hy2.example.com --cert-path /path/fullchain.pem --key-path /path/privkey.pem \
  --hop-ports 20000-20999
```

- 防火墙只需要放行节点自己的端口。
- 分享链接会带上端口范围（`host:8443,20000-20999`），支持的客户端会自动轮换。
- 转发规则开机后自动恢复。
