---
layout: home
title: PSM：VPS 科学上网一键脚本，Xray / sing-box / mihomo 三内核
titleTemplate: false
description: PSM 是开源的 VPS 科学上网一键管理脚本。一键安装 Xray、sing-box、mihomo，REALITY、Hysteria2、Snell、Shadowsocks 2022、AnyTLS、TUIC 节点即建即用，支持 WARP 分流、免费家宽出口、自定义分流、流量监控和多用户管理。
keywords: 科学上网一键脚本, VPS 翻墙脚本, 自建节点教程, REALITY 一键脚本, Hysteria2 一键脚本, sing-box 一键脚本, Xray 一键脚本, 多用户, 流量监控

hero:
  name: PSM
  text: VPS 科学上网一键管理脚本
  tagline: 一键安装 Xray / sing-box / mihomo。REALITY、Hysteria2、Snell、shadowsocks 2022、AnyTLS、TUIC 节点即建即用，warp分流、免费家宽出口、自定义分流、流量监控、多用户管理。
  image:
    src: /logo.svg
    alt: PSM 科学上网一键脚本
  actions:
    - theme: brand
      text: 1 分钟快速开始
      link: /guide/quick-start
    - theme: alt
      text: 一键安装
      link: /guide/install
    - theme: alt
      text: GitHub
      link: https://github.com/jinqians/proxy-stack

features:
  - icon: 🚀
    title: 一条命令，装好即用
    details: 在 VPS 上以 root 执行一行命令，之后只要输入 psm，所有功能都在一个菜单里。
    link: /guide/install
  - icon: 🛡️
    title: 主流抗封锁协议全覆盖
    details: VLESS REALITY / Vision / XHTTP、Hysteria2（端口跳跃）、TUIC v5、AnyTLS、Snell、Shadowsocks 2022、Trojan、VMess、WireGuard。
    link: /guide/choose-protocol
  - icon: 🧩
    title: Xray、sing-box、mihomo 三内核
    details: 三个内核可以装在同一台机器上，各管各的节点，按协议和习惯挑选。
    link: /guide/cores
  - icon: 🌐
    title: WARP 分流
    details: 一键注册 Cloudflare WARP 并接入出站，Xray、sing-box、mihomo 共用一个账号；指定的网站走 WARP，其余照常直连，速度不受影响。
    link: /features/unlock#exits
  - icon: 🧭
    title: 自定义规则分流
    details: 按域名、GeoSite、GeoIP 指定出口，或贴一个社区规则集网址（如 OpenAI.list）；规则集每天自动更新，出口可选直连、WARP、家宽或你自己的节点。
    link: /features/unlock#rules
  - icon: 🏠
    title: 免费家宽出口
    details: 自动挑选真正的住宅宽带 IP 做出口，Netflix、ChatGPT 看到的是家宽 IP；掉线自动换同国家节点，完全免费。
    link: /features/residential
  - icon: 🔒
    title: 443 端口复用
    details: 多个节点共用一个 443 端口，靠域名分流；不认识的域名直接断开，扫描器探测不到。
    link: /features/port-443
  - icon: 📱
    title: 分享链接、二维码、订阅
    details: 一键导出标准分享链接、二维码和订阅，v2rayN、Clash Verge Rev、Shadowrocket、sing-box 等客户端直接导入。
    link: /features/subscription
  - icon: 👥
    title: 多用户管理
    details: 每人一套独立的 UUID / 密码、到期时间和订阅链接；到期或超额自动停用，随时一键恢复。
    link: /features/users
  - icon: 📊
    title: 流量监控
    details: 每个节点按分钟统计流量，按月设配额，用到 90% 用 Telegram 提醒，用满自动暂停。
    link: /features/traffic
  - icon: 📦
    title: 一键迁移服务器
    details: psm migrate push root@新服务器，节点、密钥、证书原样搬过去，客户端不用改配置。
    link: /features/migrate
  - icon: 🩺
    title: 诊断修复与安全加固
    details: psm doctor --fix 检查并修好服务、证书、开机自启和防火墙；SSH 密钥登录、Fail2ban 防爆破、蜜罐诱捕，代理内核以非 root 运行。
    link: /features/doctor
---
