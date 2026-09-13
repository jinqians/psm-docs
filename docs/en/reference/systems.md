---
title: "Supported systems: Debian, Ubuntu, Alpine, CentOS / Rocky / AlmaLinux"
description: PSM supports the Debian family (Debian, Ubuntu), Alpine and the Red Hat family (RHEL, CentOS, Rocky Linux, AlmaLinux, Oracle Linux, Fedora, Amazon Linux) on x86_64 and arm64. The versions actually tested, and notes per system.
---

# Supported systems

PSM supports three Linux families. It needs root, on x86_64 or arm64.

| Family | Distribution | Minimum version |
| --- | --- | --- |
| Debian family | Debian | 10 or later |
| | Ubuntu | 20.04 LTS or later |
| Alpine | Alpine Linux | 3.18 or later |
| Red Hat family | RHEL, CentOS, Rocky Linux, AlmaLinux, Oracle Linux | 8 or later |
| | Fedora | recent supported releases |
| | Amazon Linux | 2 or later |

CentOS 7, Debian 9, Ubuntu 18.04 and older are not supported.

## Tested versions

Every commit runs the full test suites, including real client connections and migrations, in containers on the test server for:

- **Debian 13**
- **Ubuntu 24.04 and 22.04**
- **Alpine 3.22**
- **Rocky Linux 9 and AlmaLinux 8**

The other distributions in the table run the same code but are not tested one by one. arm64 builds of the cores are downloaded automatically, but the test server is x86_64, so arm64 has no automated tests.

## Notes per system

**Alpine** — apk and OpenRC. A fresh Alpine has no bash; install with `wget -qO- https://psm.jinqians.com | sh`. PSM installs the GNU base tools and replaces busybox crond with cronie. sing-box's musl build is fetched automatically. Standalone Snell runs through Docker on Alpine (the official binary does not support musl).

**Red Hat family** — dnf / yum, EPEL enabled when needed, firewalld supported. The distribution's jq 1.6 is buggy, so PSM installs a newer one (the same on Ubuntu 22.04). EL8's stock Nginx 1.14 lacks the SNI routing that port 443 sharing needs, so PSM switches to a newer Nginx. **SELinux has not been tested** (it cannot be enabled in a container); please report problems.

**Amazon Linux 2** — its systemd is too old to start the proxy cores as an unprivileged user, so there they run as root, and `psm doctor` says why.
