import { defineConfig, type HeadConfig } from 'vitepress'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// The canonical address of every page, the sitemap and the social cards.
const SITE = 'https://psm-docs.pages.dev'
const REPO = 'https://github.com/jinqians/proxy-stack'
const DOCS_REPO = 'https://github.com/jinqians/psm-docs'
const INSTALL = 'bash <(curl -fsSL https://psm.jinqians.com)'

const author = { '@type': 'Person', name: 'jinqians', url: 'https://github.com/jinqians' }

// schema.org description of the software itself, on every page: it is what
// search engines and AI assistants read to understand what PSM is.
const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PSM (Proxy Stack Manager)',
  alternateName: ['PSM', 'Proxy Stack Manager', 'JQ\'s Proxy Stack Manager', 'PSM 科学上网一键脚本'],
  applicationCategory: 'UtilitiesApplication',
  applicationSubCategory: 'Proxy server manager',
  operatingSystem: 'Linux (Debian, Ubuntu, Alpine, RHEL, Rocky Linux, AlmaLinux)',
  description:
    'Open-source Bash tool that sets up and manages a self-hosted proxy server on a VPS: Xray, sing-box and mihomo cores, VLESS REALITY, Hysteria2, TUIC, AnyTLS, Snell, Shadowsocks 2022 and WireGuard nodes, port 443 sharing, WARP and free residential exits, rule-based routing, subscriptions, per-user accounts, traffic quotas and one-command server migration.',
  url: SITE,
  downloadUrl: REPO,
  softwareHelp: SITE,
  license: 'https://www.gnu.org/licenses/agpl-3.0.html',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author,
}

// The site itself, on the two home pages.
const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PSM 文档',
  alternateName: ['PSM Documentation', 'Proxy Stack Manager documentation'],
  url: `${SITE}/`,
  inLanguage: ['zh-CN', 'en'],
  publisher: author,
  about: { '@type': 'SoftwareApplication', name: softwareLd.name, url: REPO },
}

// Keywords every page carries after its own `keywords` frontmatter. Google
// ignores the tag; Baidu, 360 and Sogou still read it.
const KEYWORDS = {
  zh: ['科学上网', '翻墙', 'VPS 搭建节点', '自建节点', '一键脚本', 'Xray', 'sing-box', 'mihomo', 'VLESS REALITY', 'Hysteria2'],
  en: ['self-hosted proxy', 'VPS proxy server', 'one-command script', 'Xray', 'sing-box', 'mihomo', 'VLESS REALITY', 'Hysteria2', 'bypass censorship'],
}

// The sidebars also give the breadcrumbs their names and llms-full.txt its page order.
type Group = { text: string; items: { text: string; link: string }[] }
const zhSidebar: Group[] = [
  {
    text: '开始',
    items: [
      { text: '什么是 PSM', link: '/guide/introduction' },
      { text: '一键安装', link: '/guide/install' },
      { text: '1 分钟快速开始', link: '/guide/quick-start' },
      { text: '协议怎么选', link: '/guide/choose-protocol' },
      { text: 'Xray / sing-box / mihomo', link: '/guide/cores' },
      { text: '术语表', link: '/guide/glossary' },
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
]
const enSidebar: Group[] = [
  {
    text: 'Getting started',
    items: [
      { text: 'What is PSM', link: '/en/guide/introduction' },
      { text: 'Install', link: '/en/guide/install' },
      { text: 'Quick start', link: '/en/guide/quick-start' },
      { text: 'Choosing a protocol', link: '/en/guide/choose-protocol' },
      { text: 'Xray / sing-box / mihomo', link: '/en/guide/cores' },
      { text: 'Glossary', link: '/en/guide/glossary' },
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
]

// zh pages live at the root, their English twins under /en/.
function pagePath(relativePath: string): string {
  return relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}
function isEnPath(path: string): boolean {
  return path === 'en/' || path.startsWith('en/')
}
function twin(path: string): { zh: string; en: string } {
  return isEnPath(path) ? { zh: path.replace(/^en\/?/, ''), en: path } : { zh: path, en: `en/${path}` }
}

function listOf(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String)
  return typeof v === 'string' ? v.split(/\s*[,，]\s*/).filter(Boolean) : []
}

// Home › section › page, named as in the sidebar.
function breadcrumbLd(path: string, title: string) {
  const isEn = isEnPath(path)
  const link = `/${path}`
  const group = (isEn ? enSidebar : zhSidebar).find((g) => g.items.some((i) => i.link === link))
  const crumbs = [{ name: isEn ? 'PSM docs' : 'PSM 文档', url: `${SITE}/${isEn ? 'en/' : ''}` }]
  if (group) crumbs.push({ name: group.text, url: `${SITE}${group.items[0].link}` })
  crumbs.push({ name: group?.items.find((i) => i.link === link)?.text ?? title, url: `${SITE}${link}` })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  }
}

// One line of Markdown as plain text, for JSON-LD.
function plain(md: string): string {
  return md.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`]/g, '').trim()
}

// The glossary as a DefinedTermSet: every "## Term {#id}" with the paragraph under it.
function glossaryLd(file: string, url: string, name: string, lang: string) {
  const terms = [...readFileSync(file, 'utf8').matchAll(/^## (.+?) \{#([\w-]+)\}\n\n(.+)$/gm)]
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name,
    url,
    inLanguage: lang,
    hasDefinedTerm: terms.map(([, term, id, text]) => ({
      '@type': 'DefinedTerm',
      name: term,
      description: plain(text),
      url: `${url}#${id}`,
    })),
  }
}

// One page for llms-full.txt: the Markdown without frontmatter, heading anchors
// or container markers, with site links made absolute.
function llmsPage(file: string, url: string): string {
  const body = readFileSync(file, 'utf8')
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/ \{#[\w-]+\}$/gm, '')
    .replace(/^:::.*$/gm, '')
    .replace(/\]\(\//g, `](${SITE}/`)
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return `${body}\n\nSource: ${url}\n`
}

export default defineConfig({
  title: 'PSM',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: SITE,
    // Each page's zh and en versions name each other in the sitemap too.
    transformItems: (items) =>
      items.map((item) => {
        const { zh, en } = twin(item.url.replace(SITE, '').replace(/^\//, ''))
        return {
          ...item,
          links: [
            { lang: 'zh-CN', url: `${SITE}/${zh}` },
            { lang: 'en', url: `${SITE}/${en}` },
            { lang: 'x-default', url: `${SITE}/${zh}` },
          ],
        }
      }),
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { name: 'author', content: 'jinqians' }],
    // Chinese search engines and browsers: mobile-ready, no transcoding, WebKit
    ['meta', { name: 'applicable-device', content: 'pc,mobile' }],
    ['meta', { 'http-equiv': 'Cache-Control', content: 'no-transform' }],
    ['meta', { 'http-equiv': 'Cache-Control', content: 'no-siteapp' }],
    ['meta', { name: 'renderer', content: 'webkit' }],
    ['meta', { property: 'og:site_name', content: 'PSM · Proxy Stack Manager' }],
    ['meta', { property: 'og:image', content: `${SITE}/og.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'PSM: Xray / sing-box / mihomo, REALITY, Hysteria2, TUIC, AnyTLS, Snell' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${SITE}/og.png` }],
    ['link', { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(softwareLd)],
  ],

  // Per page: canonical URL, zh/en alternates, keywords, a social card with
  // the page's own title and description, and JSON-LD: the site on the home
  // pages; elsewhere the article with its last change, the breadcrumb, and on
  // the glossary its terms.
  transformHead({ pageData, siteConfig }): HeadConfig[] {
    if (pageData.isNotFound) return []
    const path = pagePath(pageData.relativePath)
    const { zh, en } = twin(path)
    const url = `${SITE}/${path}`
    const fm = pageData.frontmatter
    const title = fm.title ?? pageData.title
    const description = fm.description ?? pageData.description
    const isEn = isEnPath(path)
    const lang = isEn ? 'en' : 'zh-CN'
    const isHome = fm.layout === 'home'
    const modified = pageData.lastUpdated ? new Date(pageData.lastUpdated).toISOString() : undefined
    const keywords = [...new Set([...listOf(fm.keywords), ...KEYWORDS[isEn ? 'en' : 'zh']])]
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: `${SITE}/${zh}` }],
      ['link', { rel: 'alternate', hreflang: 'en', href: `${SITE}/${en}` }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: `${SITE}/${zh}` }],
      ['meta', { name: 'keywords', content: keywords.join(', ') }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:locale', content: isEn ? 'en_US' : 'zh_CN' }],
      ['meta', { property: 'og:locale:alternate', content: isEn ? 'zh_CN' : 'en_US' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
    const ld: object[] = []
    if (isHome) {
      ld.push(websiteLd)
    } else {
      if (modified) head.push(['meta', { property: 'article:modified_time', content: modified }])
      ld.push({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: title,
        description,
        url,
        inLanguage: lang,
        ...(modified && { dateModified: modified }),
        author,
        publisher: author,
        isPartOf: { '@type': 'WebSite', name: websiteLd.name, url: `${SITE}/` },
        about: { '@type': 'SoftwareApplication', name: softwareLd.name, url: REPO },
      })
      ld.push(breadcrumbLd(path, title))
      if (/(^|\/)guide\/glossary$/.test(path))
        ld.push(glossaryLd(join(siteConfig.srcDir, pageData.relativePath), url, title, lang))
    }
    for (const x of ld) head.push(['script', { type: 'application/ld+json' }, JSON.stringify(x)])
    return head
  },

  // llms-full.txt: every page in one plain-text file, for AI assistants that
  // read a site whole instead of crawling it (llms.txt lists the pages).
  buildEnd({ srcDir, outDir }) {
    const parts = [
      '# PSM (Proxy Stack Manager): full documentation',
      '',
      `> ${softwareLd.description} Install: \`${INSTALL}\`, then run \`psm\`. Source: ${REPO}. Documentation: ${SITE}`,
      '',
      'Every page of the documentation, English first, then Chinese (中文).',
    ]
    for (const sidebar of [enSidebar, zhSidebar])
      for (const group of sidebar)
        for (const item of group.items)
          parts.push('\n---\n', llmsPage(join(srcDir, `${item.link.slice(1)}.md`), `${SITE}${item.link}`))
    writeFileSync(join(outDir, 'llms-full.txt'), parts.join('\n'))
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'PSM',
      titleTemplate: ':title | PSM 科学上网一键脚本',
      description:
        'PSM（Proxy Stack Manager）是开源的 VPS 科学上网一键管理脚本：一键安装 Xray / sing-box / mihomo，REALITY、Hysteria2、Snell、Shadowsocks 2022、AnyTLS、TUIC 节点即建即用，WARP 分流、免费家宽出口、自定义分流、流量监控、多用户管理。',
      themeConfig: {
        nav: [
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '指南', link: '/guide/introduction' },
          { text: '功能', link: '/features/port-443' },
          { text: '命令参考', link: '/reference/cli' },
          { text: '常见问题', link: '/faq' },
          { text: '博客', link: 'https://jinqians.com' },
        ],
        sidebar: { '/': zhSidebar },
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
        'PSM (Proxy Stack Manager) is an open-source one-command script to self-host a proxy server on a VPS: Xray, sing-box and mihomo; REALITY, Hysteria2, Snell, Shadowsocks 2022, AnyTLS and TUIC nodes; WARP routing, free residential exits, custom routing rules, traffic monitoring and per-user accounts.',
      themeConfig: {
        nav: [
          { text: 'Quick start', link: '/en/guide/quick-start' },
          { text: 'Guide', link: '/en/guide/introduction' },
          { text: 'Features', link: '/en/features/port-443' },
          { text: 'CLI', link: '/en/reference/cli' },
          { text: 'FAQ', link: '/en/faq' },
          { text: 'Blog', link: 'https://jinqians.com' },
        ],
        sidebar: { '/en/': enSidebar },
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
