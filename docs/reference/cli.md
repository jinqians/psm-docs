---
title: PSM 命令参考：psm node / core / standalone / traffic / agent / user / migrate / doctor
description: PSM 全部命令行用法：psm node 增删改查导出节点（REALITY、Hysteria2、TUIC、AnyTLS 等协议参数、443 复用、端口跳跃）、psm core 不交互安装内核、psm standalone 独立 Snell v4/v5/v6 与 ss-rust、psm traffic 流量统计与限额、psm agent 接入 PSM Panel、psm user 多用户、psm migrate 迁移、psm doctor 诊断，以及定时任务入口。
---

# 命令参考

不带参数运行 `psm` 打开交互菜单。下面的命令适合脚本和自动化；在任何子命令后加 `help` 或 `--help` 可以看到完整参数。

## psm node：管理节点

```bash
psm node list [--core CORE] [--protocol PROTO] [--json] [--show-secrets]
psm node show CORE PROTO TAG [--json] [--show-secrets]
psm node add CORE PROTO [--tag TAG] [--port PORT] [协议参数…] [--json]
psm node update CORE PROTO TAG [要修改的参数…] [--json]
psm node delete CORE PROTO TAG --yes
psm node export CORE PROTO TAG [--server HOST] [--format uri|json|surge|singbox|clash]
```

`CORE` 是 `xray`、`sing-box`（也可写 `singbox`）或 `mihomo`。`--format singbox` 输出这个节点的 sing-box 客户端 outbound（JSON）；`--format clash` 把 TLS 协议（Hysteria2、TUIC、AnyTLS、VLESS + TLS、Trojan、VMess）输出为一个完整的 mihomo 节点（JSON，带 `skip-cert-verify`），其他协议用链接即可。

`psm node add` 不问问题，所以：

- **证书**：sing-box / mihomo 的 TLS 协议和 Xray 的 Hysteria2 可以不给 `--cert-path` / `--key-path`。`--sni` 的域名在 `/etc/nginx/ssl/<域名>/` 有证书就用它，否则自动签一张自签证书（不给 `--sni` 时用 `www.bing.com`），节点记为 `insecure = 1`，导出的链接和配置会让客户端跳过校验。Xray 的 vision / xhttp / trojan / vmess 要求 `--domain` 已有证书，没有时拒绝并说明原因（不会让 Xray 整体起不来）。
- **出口分流**：`--exit warp|vpngate [--exit-sites all|ai|streaming|GEOSITE,…] [--exit-country CC]` 让这个节点的流量（全部，或只是这些网站；ai = OpenAI、Anthropic、Gemini，streaming = Netflix、Disney+、HBO、Prime Video、Spotify）从 Cloudflare WARP 或免费家宽线路（VPNGate，第一次在国家 CC 里找家宽线路，默认 JP）出去，其余照常直连；`--exit none` 或删除节点时规则一起删掉。`psm exit status|warp|vpngate [--core CORE] [--json]` 查看或提前准备这两种出口。
- **REALITY 伪装目标**：`psm sni find [--engine netlas|quake|zoomeye|fofa] [--key-stdin] [--json]` 用网络测绘引擎查本机同一 ASN 里有证书的网站，逐个做 TLS 握手检查，按延迟列出可用的 SNI 和 dest；`--key-stdin` 从标准输入读引擎的 API Key，只用于这次查询。
- **防火墙**：ufw、firewalld 或默认拒绝的 iptables 在工作时，自动放行节点端口（Hysteria2 / TUIC / WireGuard / mKCP 为 UDP，SS2022 / Snell / SOCKS 为 TCP 和 UDP），删除节点或改端口时把 PSM 加的规则删掉；本来就放行的端口不动。监听 127.0.0.1 的节点不放行。

| 内核 | 协议 |
| --- | --- |
| xray | reality、vision、xhttp、ss2022、trojan、vmess、socks、hysteria2 |
| sing-box | reality、ss2022、hysteria2、anytls、snell、trojan、vmess、socks、vless、tuic、wireguard |
| mihomo | reality、ss2022、hysteria2、anytls、snell、trojan、vmess、socks、vless、tuic |

每个协议的完整教程（菜单路径、参数、导出、截图）见 [协议教程](/protocols/)。

常用协议参数：

| 协议 | 参数 |
| --- | --- |
| reality | `--port`，`--server-name`、`--dest` 指定伪装目标 |
| vision | `--port --domain` |
| xhttp | `--port --domain [--mode xhttp\|upgrade\|ws\|grpc\|httpupgrade\|h2\|mkcp\|reality-layer]` |
| hysteria2 | `--port [--sni] [--cert-path --key-path] [--password] [--obfs-pass [--obfs-type salamander\|gecko]] [--hop-ports START-END]` |
| tuic | `--port [--sni] [--cert-path --key-path] [--uuid] [--password] [--congestion-control bbr\|cubic\|new_reno]` |
| anytls | `--port [--sni] [--cert-path --key-path] [--password]` |
| vless（sing-box / mihomo） | `--port [--sni] [--cert-path --key-path] [--transport tcp\|ws\|grpc\|…] [--path]` |
| trojan / vmess | Xray：`--port --domain`；sing-box / mihomo：`--port [--sni] [--cert-path --key-path]` |
| ss2022 | `--port [--method] [--password]` |
| socks | `--port [--listen-addr 127.0.0.1\|0.0.0.0] [--username] [--password]`（公网监听必须设置用户名密码） |
| snell | `--port [--version] [--psk]` |
| wireguard | `--port [--peer-count N]`（导出每个客户端的 wg-quick 配置） |

其他选项：

- `--mount-443`：节点挂到 [443 端口复用](/features/port-443)，改端口、改域名、删除时自动同步分流表。
- `--vless-enc x25519|mlkem768`：开启 VLESS Encryption（抗量子）。
- `--skip-dest-probe`：跳过创建前对 REALITY 伪装目标的真实握手测试。
- 查询默认隐藏密钥和密码，`--show-secrets` 显示；`export` 会包含客户端需要的凭据。
- 应用失败会自动回滚节点记录和内核配置。

## psm core：安装内核

```bash
psm core list [--json]
psm core install xray|sing-box|mihomo [--if-missing] [--json]
```

不交互地安装内核（最新稳定版和它的服务），不经过菜单向导。`--if-missing` 已安装时什么也不做。[PSM Panel](/features/panel) 在服务器上建第一个某内核的节点前就是用它装内核的。

## psm standalone：独立 Snell 和 ss-rust

```bash
psm standalone install snell  --port PORT [--psk PSK] [--version 4|5|6] [--json]
psm standalone install ss2022 --port PORT [--password KEY] [--method METHOD] [--json]
psm standalone show    snell|ss2022 [--json]
psm standalone export  snell|ss2022 [--server HOST] [--name NAME] [--format uri|surge|singbox]
psm standalone remove  snell|ss2022 --yes [--json]
```

不交互地安装官方 snell-server（v4、v5 或 v6，装这个大版本最新的官方构建；v6 上游仍是测试版，装最新的测试版或候选版）或 ss-rust，systemd 和 OpenRC 都支持，写入菜单用的同一份配置，所以菜单、流量统计和订阅导出照常识别。再次 `install` 会替换正在运行的配置（换端口、换密钥）。

- ss2022 的 `--method`：`2022-blake3-aes-128-gcm`（默认）、`2022-blake3-aes-256-gcm`、`2022-blake3-chacha20-poly1305`；`--password` 是 base64 密钥（aes-128 为 16 字节，其余 32 字节）。PSK 和密钥不填时自动生成。
- `export`：Snell 输出 Surge 配置行；ss2022 输出 `ss://` 链接（`--format surge` 为 Surge 配置行，`singbox` 为 sing-box outbound）。
- 官方 snell-server 不能在 musl（Alpine）上运行，那里会直接拒绝并说明原因；Alpine 上请用 sing-box 或 mihomo 运行 Snell。

## psm traffic：流量统计和限额

```bash
psm traffic list [--json]
psm traffic set TAG [--limit-bytes N | --limit-gb N] [--reset-day 1-28] [--json]
psm traffic reset TAG [--json]
psm traffic unset TAG [--json]
```

`TAG` 是节点名，独立安装的 Snell、ss-rust 分别是 `snell`、`ss2022`（与流量管理菜单相同，两边操作的是同一份数据）。

- `set` 登记节点并设置上限；上限 0 表示只统计、不限制。第一次 `set` 会装好每分钟一次的检查。
- 超过上限的节点被暂停，到每月重置日或 `psm traffic reset` 后恢复；提高上限也会解除暂停。
- `list` 先刷新计数再输出。

## psm agent：接入 PSM Panel

```bash
psm agent join --panel URL --token TOKEN
psm agent status [--json]
psm agent remove --yes
```

`join` 下载 psm-agent（用发布页的 SHA256SUMS 校验），用面板给的一次性令牌接入，并作为服务运行。psm-agent 不监听任何端口。一般直接执行面板给出的安装命令即可（它会先装好或更新 PSM，再调用 `psm agent join`），见 [PSM Panel](/features/panel)。`remove` 断开面板并删除 psm-agent，节点保留。

## psm version

输出 PSM 的版本（检出的日期和提交号）。

## psm user：多用户

```bash
psm user add NAME [--nodes all|TAG,TAG] [--days N | --expires YYYY-MM-DD] [--quota SIZE] [--json]
psm user list [--json]
psm user show NAME [--json] [--show-secrets]
psm user update NAME [--nodes …] [--days N | --expires 日期 | --no-expiry]
                     [--quota SIZE | --no-quota] [--reset-usage] [--enable | --disable] [--json]
psm user delete NAME [--json]
psm user links NAME [--server ADDR]
psm user token NAME [--json]
```

`SIZE` 可以写字节数或带 K、M、G、T 的数字（1G = 1024³）。配额按自然月统计用户在 Xray 节点上的流量。详见 [多用户](/features/users)。

## psm migrate：迁移

```bash
psm migrate export [--output FILE] [--encrypt]
psm migrate import FILE [--yes] [--force]
psm migrate push [USER@]HOST [--port N] [--identity KEY] [--force]
```

详见 [一键迁移服务器](/features/migrate)。

## psm doctor：诊断

```bash
psm doctor [--human|--json] [--fix]
```

退出码：`0` 正常，`1` 有严重问题，`2` 参数错误。详见 [诊断与自动修复](/features/doctor)。

## 定时任务入口

菜单里"启用定时任务"会自动注册这些入口，一般不需要手动调用：

```bash
psm --traffic-check        # 流量统计、配额和多用户检查
psm --backup-full          # 全量备份
psm --ruleset-update       # 更新订阅式规则集
psm --reality-watchdog     # REALITY 伪装目标测活
psm --vpngate-watchdog     # 检查家宽出口隧道
psm --health-report        # 发送每日体检报告
psm --ddns-update          # Cloudflare DDNS 更新
psm --update               # 更新 PSM
```
