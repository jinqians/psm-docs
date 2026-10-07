---
title: PSM 命令参考：psm node / relay / core / standalone / traffic / agent / user / migrate / doctor
description: PSM 全部命令行用法：psm node 增删改查导出节点（REALITY、Hysteria2、TUIC、AnyTLS 等协议参数、443 复用、端口跳跃）、psm relay 中转（realm / gost 直接转发、加密隧道、多落地负载均衡与故障切换、限速限额和到期）、psm core 不交互安装内核、psm standalone 独立 Snell v4/v5/v6 与 ss-rust、psm traffic 流量统计与限额、psm agent 接入 PSM Panel、psm user 多用户、psm migrate 迁移、psm doctor 诊断，以及定时任务入口。
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

`CORE` 是 `xray`、`sing-box`（也可写 `singbox`）或 `mihomo`。`--format singbox` 输出这个节点的 sing-box 客户端 outbound（JSON）；`--format clash` 把节点输出为一个完整的 mihomo 节点（JSON）：TLS 协议（Hysteria2、TUIC、AnyTLS、VLESS + TLS、Trojan、VMess）、REALITY、Vision、SS2022、SOCKS5，以及 Xray 的 XHTTP 类节点（mKCP 除外，mihomo 的 VLESS 没有 mKCP）。

`psm node add` 不问问题，所以：

- **证书**：sing-box / mihomo 的 TLS 协议和 Xray 的 Hysteria2 可以不给 `--cert-path` / `--key-path`。`--sni` 的域名在 `/etc/nginx/ssl/<域名>/` 有证书就用它，否则自动签一张自签证书（不给 `--sni` 时用 `www.bing.com`），节点记为 `insecure = 1`。导出时带上这张证书的指纹，让客户端校验它而不是跳过：链接里是 `pcs`（vless/trojan/vmess）或 `pinSHA256`（hysteria2），同时保留 `allowInsecure=1` / `insecure=1` 给不认指纹的客户端；`--format clash` 加 `fingerprint`，`--format singbox` 用 `certificate_public_key_sha256`（sing-box 1.13+）代替 `insecure`。Xray 从 2026-06-01 起拒绝 `allowInsecure`，v2rayN 等 Xray 内核的客户端只认 `pcs`。Xray 的 vision / xhttp / trojan / vmess 要求 `--domain` 已有证书，没有时拒绝并说明原因（不会让 Xray 整体起不来）。
- **出口分流**：`--exit warp|vpngate [--exit-sites all|ai|streaming|GEOSITE,…] [--exit-country CC]` 让这个节点的流量（全部，或只是这些网站；ai = OpenAI、Anthropic、Gemini，streaming = Netflix、Disney+、HBO、Prime Video、Spotify）从 Cloudflare WARP 或免费家宽线路（VPNGate，第一次在国家 CC 里找家宽线路，默认 JP）出去，其余照常直连；`--exit none` 或删除节点时规则一起删掉。`psm exit status|warp|vpngate [--core CORE] [--json]` 查看或提前准备这两种出口。
- **REALITY 伪装目标**：`psm sni find [--engine netlas|quake|zoomeye|fofa] [--key-stdin] [--json]` 用网络测绘引擎查本机同一 ASN 里有证书的网站，逐个做 TLS 握手检查，按延迟列出可用的 SNI 和 dest；`--key-stdin` 从标准输入读引擎的 API Key，只用于这次查询。`psm sni check --input - [--json]` 只做握手检查：候选从标准输入给出（`{"pairs":[{"sni":"…","dest":"IP:443"}]}`，最多 60 个），PSM 面板用它——面板自己查测绘引擎，API Key 不发到服务器。
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
- `--vless-enc x25519|mlkem768|none`：开启 VLESS Encryption（抗量子）；`update` 时可以开、换种类或用 `none` 关掉。Xray 的 mKCP 节点默认开启（新版 Xray 客户端拒绝不加密的 VLESS）。
- `--bbr-profile conservative|standard|aggressive`：Hysteria2 服务器的 BBR 配置档（sing-box 1.14+、mihomo 1.19.24+、Xray v26.4.13+）。
- `--disable-pmtud true|false`：关闭 Hysteria2 服务器的 QUIC 路径 MTU 探测（sing-box 1.14+、Xray；mihomo 没有这个选项）。
- `--skip-dest-probe`：跳过创建前对 REALITY 伪装目标的真实握手测试。
- 查询默认隐藏密钥和密码，`--show-secrets` 显示；`export` 会包含客户端需要的凭据。
- 应用失败会自动回滚节点记录和内核配置。

## psm relay：中转

```bash
psm relay list [--json]
psm relay show TAG [--json]
psm relay add --tag TAG --listen-port PORT|auto --target HOST:PORT [--target HOST:PORT ...]
              [--engine realm|gost] [--strategy round|rand|fifo|hash] [--no-probe]
              [--udp] [--speed MBPS] [--limit-gb N] [--reset-day 0-28]
              [--expires DATE|never] [--port-range MIN-MAX] [--no-firewall] [--json]
              [--tls [--tls-sni NAME] [--tls-insecure] [--tls-cert FILE --tls-key FILE]]
psm relay add --tag TAG --mode tunnel-exit --listen-port PORT|auto --target HOST:PORT ...
              [--transport tls|mtls|wss|mwss] [--tls-sni NAME] [--ws-path PATH]
              [--secret SECRET] [--strategy ...] [--json]
psm relay add --tag TAG --mode tunnel-entry --listen-port PORT|auto --exit HOST:PORT
              --secret SECRET (--exit-pin SHA256 | --exit-cert FILE | --tls-insecure)
              [--transport ...] [--tls-sni NAME] [--ws-host HOST] [--ws-path PATH]
              [--udp] [--speed MBPS] [--limit-gb N] [--expires DATE] [--json]
psm relay add --batch FILE|- [上面的选项，对每一行都生效] [--json]
psm relay update TAG [add 的任何选项；--target 会替换整个列表] [--json]
psm relay delete TAG --yes [--if-exists] [--json]
psm relay probe [TAG] [--samples N] [--json]
psm relay install [--engine realm|gost] [--json]
```

[中转](/features/relay) 的非交互接口。两个转发程序的规则都存在 `config/realm/rules.json`（每条带 `engine`），realm 的 `config.toml` 和 psm-gost 的配置都由它生成，所以菜单、命令行和面板建的是同一回事。程序第一次用到时自动安装（`psm relay install --engine gost` 也可以先装）。

- **转发程序**：默认 realm。`--strategy rand|fifo`（随机、主备）、`--speed` 和两种隧道模式要用 gost，给了这些选项而没写 `--engine gost` 会被拒绝并说明原因。
- **多个落地**：`--target` 可以写多次（最多 16 个）；`round` 轮询（默认）、`hash` 按客户端 IP、`rand` 随机、`fifo` 主备。gost 在多个落地时每 15 秒对每个做一次 TCP 健康检查，连不上的暂时不用；落地只开了 UDP 时用 `--no-probe` 关掉。
- **端口**：`--listen-port auto` 从 `--port-range`（默认 20000-60000）里挑一个本机没被占用的。结果里的 `listen_port` 是最后用的端口。
- **隧道**：先在出口机 `--mode tunnel-exit`，它生成自签证书（或用 `--tls-cert/--tls-key`）和密码，并打印入口机要执行的完整命令；入口机 `--mode tunnel-entry` 用 `--exit-pin`（证书 SHA-256）或 `--exit-cert` 钉住这张证书，不认别的证书、也不看域名。`--transport`：`tls`、`mtls`（多路复用）、`wss`、`mwss`（WebSocket，可放在 CDN 后）。UDP 在隧道里传。出口只转发到自己的 `--target`，不是开放代理。隧道只承载客户端先说话的协议（所有代理协议都是）；SSH、SMTP 这类服务器先说话的要用直接转发。
- **realm 自己的 TLS**（直接转发，只包 TCP）：`--tls`，规则算哪一端由转发目标决定——转发到本机（`127.0.0.1` 或本机的任一地址）是落地端，终止 TLS 并持有证书（`--tls-cert`/`--tls-key`，不给则按 `--tls-sni` 自签一张）；转发到别的主机是入口端，负责拨 TLS（要 `--tls-sni`，对端自签时加 `--tls-insecure`）。
- **限速、限额和到期**：`--speed` 是上下行各自的 Mbit/s 上限（gost）。`--limit-gb` 按监听端口计量（记在节点共用的 `PSM_TRF` 计量链上，标签 `relay-<TAG>`），超过当月额度就拒绝新连接，`--reset-day`（0-28，按本机时区，0 为不重置）恢复；`--expires` 从那一刻起拒绝（`YYYY-MM-DD` 指本机那天结束时，带 `Z` 的 ISO 时间为 UTC），`never` 取消。两种程序都能用。
- **批量**：`--batch FILE`（`-` 为标准输入）每行一条 `TAG PORT|auto HOST:PORT[,HOST:PORT...]`，其余选项对每行生效；任何一行不对就一条都不建。
- **防火墙**：和节点一样自动放行监听端口（`--udp` 时 TCP 和 UDP 都放行），改端口或删除时**只撤销 PSM 自己加过的那条**（记在 `config/firewall-ports`），手工放行的不动；`--no-firewall` 完全不碰防火墙。
- **改规则**：`update` 在同一个端口上把规则从 realm 挪到 gost（或反过来）也行；应用失败会恢复原来的规则。
- **链路质量与流量**：`psm relay probe` 报告到下一跳的往返延迟、抖动、丢包（TCP 连接测量，不用 ping），多个落地时还有每个落地的结果，以及已经搬运的字节数、限额用量和是否暂停。落地完全不通时报 `rtt_ms: null` 和 100% 丢包，不会编一个数字。接入面板后 psm-agent 每 60 秒测一次、随同步上报。

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
psm agent upgrade
psm agent remove --yes
```

`join` 下载 psm-agent（用发布页的 SHA256SUMS 校验），用面板给的一次性令牌接入，并作为服务运行。psm-agent 不监听任何端口。一般直接执行面板给出的安装命令即可（它会先装好或更新 PSM，再调用 `psm agent join`），见 [PSM Panel](/features/panel)。`remove` 断开面板并删除 psm-agent，节点保留。

`upgrade` 先更新 PSM，再把 psm-agent 换成新 PSM 指定的版本并重启服务——要装的版本写在 PSM 自己的 `lib/agent.sh` 里，所以顺序不能反。面板"服务器"页的 **升级 agent** 按钮就是让 psm-agent 执行这条命令，不必登录 VPS。节点、中转和流量统计都不受影响。

## psm check：IP 质量和解锁检测

```bash
psm check [all|ip|mail|unlock] [-4|-6] [--keys-stdin] [--json]
```

从外部看这台服务器的 IP，IPv4 和 IPv6 分开测，大约十秒：

- `ip`：归属和位置，注册地（原生 IP 还是广播 IP），网络类型（机房、家宽、商业、移动），几个数据库各自的风险分，以及代理、VPN、Tor、机房、滥用、机器人这些风险因子。
- `mail`：25 端口能否连到 Gmail、Outlook、Yahoo、iCloud、QQ、163 的收信服务器；约 30 个 DNS 黑名单（IPv4）。
- `unlock`：Netflix、Disney+、YouTube Premium、Prime Video、ChatGPT、Claude、Gemini、TikTok、Reddit、Google 搜索，并标出原生解锁还是 DNS 解锁。
- 不写就三项都测。

检测本身是独立项目 [ipcheck](https://github.com/jinqians/ipcheck)：

- PSM 不带它，执行时才下载 PSM 钉死的那个版本，校验 SHA-256，不对就不运行；
- 运行完连同临时目录一起删除；
- 也可以不装 PSM，单独运行。

`--keys-stdin` 从标准输入读可选的免费 API Key，每行一个 `名称=值`（`ABUSEIPDB`、`IPQS`、`IP2LOCATION`），能多几家数据库对比。Key 只经环境变量交给 ipcheck，不出现在任何进程的命令行里。

PSM Panel 服务器页 ⋯ 里的 **IP 质量与解锁** 就是让 psm-agent 执行这条命令；Key 在面板的系统设置里填。

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
psm migrate export [--output FILE] [--no-encrypt]
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
