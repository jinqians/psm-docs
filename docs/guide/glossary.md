---
title: 科学上网术语表：REALITY、Hysteria2、TUIC、AnyTLS、SNI、WARP、家宽 IP 是什么
description: 自建科学上网节点常见术语的简明解释：自建节点和机场、VPS、代理内核、Xray、sing-box、mihomo、VLESS、REALITY、Vision、XHTTP、Hysteria2、端口跳跃、TUIC、AnyTLS、Snell、Shadowsocks 2022、Trojan、VMess、WireGuard、WARP、家宽 IP、SNI、443 端口复用、订阅、分流规则、BBR。
keywords: 科学上网术语, REALITY 是什么, Hysteria2 是什么, TUIC 是什么, AnyTLS 是什么, 机场和自建的区别, 家宽 IP 是什么, SNI 分流
---

# 术语表

自建节点时常见的名词，每个一句话说清是什么，以及在 PSM 里对应哪里。

## 自建节点 {#self-hosted}

在自己租的海外 VPS 上运行代理服务，只给自己和信任的人用。与之相对的是"机场"：多人共用的商业代理服务，节点由服务商管理。自建的 IP 只有你在用，配置握在自己手里；代价是要自己维护服务器，PSM 就是为这部分维护工作设计的。

## VPS {#vps}

虚拟专用服务器：按月租用的云主机，有独立公网 IP 和 root 权限。PSM 装在 VPS 上，[支持 Debian、Ubuntu、Alpine 和 Red Hat 系](/reference/systems)。

## 代理内核 {#core}

真正收发代理流量的程序。PSM 管理三个：Xray、sing-box、mihomo，可以同时安装，[区别见这里](/guide/cores)。

## Xray {#xray}

Project X 的代理内核，VLESS、REALITY、Vision 和 XHTTP 都出自这里。它能按用户统计流量，PSM 的[多用户流量配额](/features/users)靠的就是这一点。

## sing-box {#sing-box}

通用代理平台，同一个程序既能做服务端也能做客户端，服务端支持 VLESS REALITY、Hysteria2、TUIC、AnyTLS、Shadowsocks 等协议。

## mihomo {#mihomo}

原名 Clash.Meta，是 Clash 系客户端（如 Clash Verge Rev）使用的内核，也可以作为服务端运行。PSM 能直接导出 mihomo 客户端的完整配置。

## VLESS {#vless}

轻量的代理协议，自身不加密，由外层的 TLS 或 REALITY 负责加密和伪装。

## REALITY {#reality}

Xray 提出的 TLS 伪装方式：服务器借用一个真实网站（伪装目标）的 TLS 握手，不需要自己的域名和证书，没有正确密钥的访问者看到的就是那个真实网站。它是目前最常用的抗封锁方案之一，[伪装目标怎么选](/guide/choose-protocol#reality-target)。

## Vision {#vision}

VLESS 的流控模式 xtls-rprx-vision，用来消除"TLS 里再套一层 TLS"的流量特征，通常与 REALITY 或 TLS 搭配使用。

## XHTTP {#xhttp}

Xray 基于 HTTP 的传输方式，可以经过 CDN 转发，IP 被封后还能借 CDN 继续使用。

## Hysteria2 {#hysteria2}

基于 QUIC（UDP）的代理协议，拥塞控制激进，在丢包严重、晚高峰拥堵的线路上速度明显更好。需要证书，自签证书也能用。

## 端口跳跃 {#port-hopping}

Hysteria2 的功能：客户端在一段端口范围内不断更换连接端口，服务器把这段端口都转给同一个节点，减少单个 UDP 端口被限速或阻断的影响。转发规则由 PSM 自动配置，[详见](/features/port-443#port-hopping)。

## TUIC {#tuic}

另一个基于 QUIC 的代理协议（PSM 使用 v5），延迟低，适合做 Hysteria2 之外的备用 UDP 线路。

## AnyTLS {#anytls}

基于 TLS 的代理协议，用填充和连接复用减少"TLS 里再套 TLS"的特征，sing-box 和 mihomo 支持。

## Snell {#snell}

Surge 团队开发的代理协议，主要给 Surge 客户端使用。

## Shadowsocks 2022 {#ss2022}

Shadowsocks 的新版规范（加密方式以 2022-blake3 开头），改进了密钥和防重放。不需要域名和证书，常用来做中转或落地。

## Trojan {#trojan}

把代理流量伪装成普通 HTTPS 的协议，需要一个域名和有效证书。

## VMess {#vmess}

V2Ray 的老协议，几乎所有客户端都支持，现在主要用于兼容旧客户端。

## WireGuard {#wireguard}

现代的 VPN 协议，速度快、配置简单，接管的是整台设备的网络，而不是按应用或规则走代理。

## WARP {#warp}

Cloudflare 的免费网络服务。PSM 把它接成出口，让指定网站的流量以 Cloudflare 的 IP 访问，常用来解决机房 IP 被 ChatGPT、Google 等服务限制的问题，[详见](/features/unlock)。

## 家宽 IP {#residential-ip}

也叫住宅 IP，是家庭宽带的 IP 地址。流媒体和 AI 服务把它当作普通用户，而机房 IP 常被限制。PSM 的[免费家宽出口](/features/residential)使用 VPNGate 志愿者提供的家宽节点。

## SNI {#sni}

TLS 握手里以明文发送的目标域名。PSM 的 443 端口复用靠它把连接分给不同节点，全程不解密流量。

## 443 端口复用 {#port-443}

多个节点共用一个公网 443 端口：Nginx 读取每个连接的 SNI，交给对应的节点，不认识的域名直接断开。[详见](/features/port-443)。

## 伪装目标 {#reality-target}

REALITY 借用其 TLS 握手的那个真实网站，也叫 dest 或 target。应选同地区、支持 TLS 1.3、不在 CDN 后面的网站。

## 分享链接和订阅 {#subscription}

分享链接（如 `vless://`、`hysteria2://`）是一行包含节点全部参数的文本，客户端粘贴或扫码即可导入；订阅是一个网址，客户端定期从它拉取最新的节点列表。[详见](/features/subscription)。

## 分流规则 {#routing-rules}

按域名、GeoSite、GeoIP 或订阅的规则集，决定每个连接走哪个出口：直连、WARP、家宽或拒绝。GeoSite 和 GeoIP 是按网站类别和 IP 归属地整理好的数据库。

## BBR {#bbr}

Google 开发的 TCP 拥塞控制算法，在高延迟、有丢包的国际线路上能明显提升速度。PSM 可以一键开启。

## 自签证书 {#self-signed}

服务器自己生成、没有经过证书机构签发的证书。Hysteria2、TUIC、AnyTLS 可以用自签证书，客户端需要允许不受信任的证书。
