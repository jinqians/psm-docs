import { defineConfig, type HeadConfig } from 'vitepress'

// The canonical address of every page, the sitemap and the social cards.
const SITE = 'https://psm-docs.pages.dev'
const REPO = 'https://github.com/jinqians/proxy-stack'
const DOCS_REPO = 'https://github.com/jinqians/psm-docs'

// schema.org description of the software itself, on every page: it is what
// search engines and AI assistants read to understand what PSM is.
const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PSM (Proxy Stack Manager)',
  alternateName: ['PSM', 'Proxy Stack Manager', 'JQ\'s Proxy Stack Manager'],
  applicationCategory: 'UtilitiesApplication',
  applicationSubCategory: 'Proxy server manager',
  operatingSystem: 'Linux (Debian, Ubuntu, Alpine, RHEL, Rocky Linux, AlmaLinux)',
  description:
    'Open-source Bash tool that sets up and manages a self-hosted proxy server on a VPS: Xray, sing-box and mihomo cores, VLESS REALITY, Hysteria2, TUIC, AnyTLS, Snell and WireGuard nodes, port 443 sharing, subscriptions, per-user accounts, traffic quotas and one-command server migration.',
  url: SITE,
  downloadUrl: REPO,
  softwareHelp: SITE,
  license: 'https://www.gnu.org/licenses/agpl-3.0.html',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'jinqians', url: 'https://github.com/jinqians' },
}

// zh pages live at the root, their English twins under /en/.
function pagePath(relativePath: string): string {
  return relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}
function twin(path: string): { zh: string; en: string } {
  return path.startsWith('en/') || path === 'en/'
    ? { zh: path.replace(/^en\/?/, ''), en: path }
    : { zh: path, en: `en/${path}` }
}

export default defineConfig({
  title: 'PSM',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: SITE },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { property: 'og:site_name', content: 'PSM · Proxy Stack Manager' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: `${SITE}/og.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${SITE}/og.png` }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(softwareLd)],
  ],

  // Per page: canonical URL, zh/en alternates, and a social card that carries
  // the page's own title and description instead of the site's.
  transformHead({ pageData }): HeadConfig[] {
    const path = pagePath(pageData.relativePath)
    const { zh, en } = twin(path)
    const url = `${SITE}/${path}`
    const title = pageData.frontmatter.title ?? pageData.title
    const description = pageData.frontmatter.description ?? pageData.description
    const isEn = path.startsWith('en/') || path === 'en/'
    return [
      ['link', { rel: 'canonical', href: url }],
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: `${SITE}/${zh}` }],
      ['link', { rel: 'alternate', hreflang: 'en', href: `${SITE}/${en}` }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: `${SITE}/${zh}` }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:locale', content: isEn ? 'en_US' : 'zh_CN' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'PSM',
      titleTemplate: ':title | PSM 科学上网一键脚本',
      description:
        'PSM（Proxy Stack Manager）是开源的 VPS 科学上网一键管理脚本：一条命令搭建 VLESS REALITY、Hysteria2、TUIC、AnyTLS、Snell 节点，Xray / sing-box / mihomo 三内核，443 端口复用、订阅、多用户、流量配额与一键迁移。',
      themeConfig: {
        nav: [
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '指南', link: '/guide/introduction' },
          { text: '功能', link: '/features/port-443' },
          { text: '命令参考', link: '/reference/cli' },
          { text: '常见问题', link: '/faq' },
        ],
        sidebar: {
          '/': [
            {
              text: '开始',
              items: [
                { text: '什么是 PSM', link: '/guide/introduction' },
                { text: '一键安装', link: '/guide/install' },
                { text: '1 分钟快速开始', link: '/guide/quick-start' },
                { text: '协议怎么选', link: '/guide/choose-protocol' },
                { text: 'Xray / sing-box / mihomo', link: '/guide/cores' },
              ],
            },
            {
              text: '功能',
              items: [
                { text: '443 端口复用', link: '/features/port-443' },
                { text: '订阅与客户端导入', link: '/features/subscription' },
                { text: '多用户', link: '/features/users' },
                { text: '流量配额与到期', link: '/features/traffic' },
                { text: '免费家宽出口', link: '/features/residential' },
                { text: '解锁 Netflix / ChatGPT', link: '/features/unlock' },
                { text: '一键迁移服务器', link: '/features/migrate' },
                { text: '诊断与自动修复', link: '/features/doctor' },
                { text: '服务器安全加固', link: '/features/security' },
              ],
            },
            {
              text: '参考',
              items: [
                { text: '命令参考', link: '/reference/cli' },
                { text: '支持的系统', link: '/reference/systems' },
                { text: '文件与路径', link: '/reference/paths' },
                { text: '常见问题', link: '/faq' },
              ],
            },
          ],
        },
        editLink: { pattern: `${DOCS_REPO}/edit/main/docs/:path`, text: '在 GitHub 上编辑此页' },
        lastUpdated: { text: '最后更新' },
        docFooter: { prev: '上一页', next: '下一页' },
        outline: { label: '本页目录', level: [2, 3] },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观',
        langMenuLabel: '语言',
        footer: {
          message: '基于 AGPL-3.0 许可发布 · 仅用于合法用途，请遵守当地法律法规',
          copyright: 'Copyright © jinqians',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'PSM',
      titleTemplate: ':title | PSM proxy server manager',
      description:
        'PSM (Proxy Stack Manager) is an open-source one-command script to self-host a proxy server on a VPS: VLESS REALITY, Hysteria2, TUIC, AnyTLS and Snell nodes on Xray, sing-box and mihomo, port 443 sharing, subscriptions, per-user accounts, traffic quotas and server migration.',
      themeConfig: {
        nav: [
          { text: 'Quick start', link: '/en/guide/quick-start' },
          { text: 'Guide', link: '/en/guide/introduction' },
          { text: 'Features', link: '/en/features/port-443' },
          { text: 'CLI', link: '/en/reference/cli' },
          { text: 'FAQ', link: '/en/faq' },
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Getting started',
              items: [
                { text: 'What is PSM', link: '/en/guide/introduction' },
                { text: 'Install', link: '/en/guide/install' },
                { text: 'Quick start', link: '/en/guide/quick-start' },
                { text: 'Choosing a protocol', link: '/en/guide/choose-protocol' },
                { text: 'Xray / sing-box / mihomo', link: '/en/guide/cores' },
              ],
            },
            {
              text: 'Features',
              items: [
                { text: 'Sharing port 443', link: '/en/features/port-443' },
                { text: 'Subscriptions and clients', link: '/en/features/subscription' },
                { text: 'Per-user accounts', link: '/en/features/users' },
                { text: 'Traffic quotas and expiry', link: '/en/features/traffic' },
                { text: 'Free residential exit', link: '/en/features/residential' },
                { text: 'Unlocking Netflix / ChatGPT', link: '/en/features/unlock' },
                { text: 'Moving to a new server', link: '/en/features/migrate' },
                { text: 'Diagnose and repair', link: '/en/features/doctor' },
                { text: 'Server hardening', link: '/en/features/security' },
              ],
            },
            {
              text: 'Reference',
              items: [
                { text: 'CLI reference', link: '/en/reference/cli' },
                { text: 'Supported systems', link: '/en/reference/systems' },
                { text: 'Files and paths', link: '/en/reference/paths' },
                { text: 'FAQ', link: '/en/faq' },
              ],
            },
          ],
        },
        editLink: { pattern: `${DOCS_REPO}/edit/main/docs/:path`, text: 'Edit this page on GitHub' },
        footer: {
          message: 'Released under the AGPL-3.0 license · For lawful use only; follow the laws where you live',
          copyright: 'Copyright © jinqians',
        },
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: REPO }],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
  },
})
