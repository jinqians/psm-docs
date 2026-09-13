---
title: PSM 命令参考：psm node / user / migrate / doctor
description: PSM 全部命令行用法：psm node 增删改查导出节点（REALITY、Hysteria2、TUIC、AnyTLS 等协议参数、443 复用、端口跳跃）、psm user 多用户、psm migrate 迁移、psm doctor 诊断，以及定时任务入口。
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
psm node export CORE PROTO TAG [--server HOST] [--format uri|json|surge]
```

`CORE` 是 `xray`、`sing-box`（也可写 `singbox`）或 `mihomo`。

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
| hysteria2 | `--port --sni --cert-path --key-path [--password] [--obfs-pass [--obfs-type salamander\|gecko]] [--hop-ports START-END]` |
| tuic | `--port --sni --cert-path --key-path [--uuid] [--password] [--congestion-control bbr\|cubic\|new_reno]` |
| anytls | `--port --sni --cert-path --key-path [--password]` |
| vless（sing-box / mihomo） | `--port --sni --cert-path --key-path [--transport tcp\|ws\|grpc\|…] [--path]` |
| trojan / vmess | `--port --domain` |
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
