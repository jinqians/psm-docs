---
title: 一键安装 PSM
description: 在 VPS 上一条命令安装 PSM 科学上网管理脚本。支持 Debian、Ubuntu、Alpine、RHEL / Rocky / AlmaLinux，x86_64 和 arm64。包含安装要求、Alpine 装法、手动安装、更新和卸载。
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"HowTo","name":"在 VPS 上安装 PSM","description":"一条命令在 VPS 上安装 PSM 科学上网管理脚本","totalTime":"PT5M","tool":[{"@type":"HowToTool","name":"一台 Linux VPS（root 权限）"}],"step":[{"@type":"HowToStep","name":"以 root 登录 VPS","text":"用 SSH 以 root 身份登录你的 VPS。"},{"@type":"HowToStep","name":"执行一键安装命令","text":"bash <(curl -fsSL https://psm.jinqians.com)"},{"@type":"HowToStep","name":"打开管理菜单","text":"安装完成后输入 psm 进入管理菜单。"}]}'
---

# 一键安装

## 准备

- 一台 Linux VPS，能以 **root** 登录。PSM 要装系统服务、证书和防火墙规则，所以必须是 root。
- 架构：x86_64 或 arm64。
- 系统：Debian、Ubuntu、Alpine、RHEL 系（Rocky Linux、AlmaLinux 等）。具体版本和测试范围见 [支持的系统](/reference/systems)。
- 只需要预装 `bash` 和 `curl`（或 `wget`）。其余依赖第一次用到时自动安装。

## 安装

以 root 执行下面任意一条：

```bash
# 用 curl（推荐）
bash <(curl -fsSL https://psm.jinqians.com)

# 系统没有 curl 时用 wget
bash <(wget -qO- https://psm.jinqians.com)
```

安装过程会让你选择界面语言，然后装好依赖并注册 `psm` 命令。完成后输入：

```bash
psm
```

就会进入管理菜单。接下来可以跟着 [5 分钟快速开始](/guide/quick-start) 搭第一个节点。

### Alpine

全新的 Alpine 没有 bash，用这一条（它会先用 apk 装好 bash 再继续）：

```bash
wget -qO- https://psm.jinqians.com | sh
```

### 手动安装

```bash
git clone https://github.com/jinqians/proxy-stack.git /opt/psm
bash /opt/psm/install.sh
```

## 更新

再执行一次安装命令就会更新到最新版；也可以在菜单里选择「更新 PSM」。你对 PSM 文件做过的本地修改会先另存成补丁文件，不会丢。

## 卸载

```bash
bash /opt/psm/uninstall.sh
```

卸载器会清理 PSM 自己创建的命令、服务和定时任务。Nginx、证书、Docker 应用这类可能被其他服务共用的组件，会逐个问你要不要删。
