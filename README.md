# PSM documentation

Source of **https://psm-docs.pages.dev**, the documentation site for
[PSM (Proxy Stack Manager)](https://github.com/jinqians/proxy-stack), built with
[VitePress](https://vitepress.dev). Chinese pages live in `docs/`, English
pages in `docs/en/`.

```bash
npm install
npm run docs:dev      # local preview
npm run docs:build    # static site in docs/.vitepress/dist
```

## Deploy (Cloudflare Pages)

| Setting | Value |
| --- | --- |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Environment variable | `NODE_VERSION=22` |

## License

[AGPL-3.0](LICENSE), like PSM itself.
