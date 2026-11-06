import { readFileSync } from 'node:fs'
import { parse } from '@babel/parser'
import { matchRoutes } from 'react-router-dom'
import { blogPosts } from '../src/data/blogPosts.js'

export const projectRoot = new URL('../', import.meta.url)
export const outputDirectory = new URL('../dist-prototype/', import.meta.url)
export const site = 'https://www.himalayanserenitytravel.com'

export function readRouting() {
  const source = readFileSync(new URL('src/App.jsx', projectRoot), 'utf8')
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] })
  const paths = []
  const components = new Map()
  const entries = {}
  function visit(node) {
    if (!node || typeof node !== 'object') return
    if (node.type === 'VariableDeclarator' && node.init?.callee?.name === 'lazy') {
      const expression = node.init.arguments[0]?.body
      if (expression?.callee?.type === 'Import') {
        components.set(node.id.name, 'src/' + expression.arguments[0].value.replace(/^\.\//, '') + '.jsx')
      }
    }
    if (node.type === 'JSXElement' && node.openingElement.name.name === 'Route') {
      const path = node.openingElement.attributes.find(a => a.name?.name === 'path')?.value?.value
      if (path) {
        paths.push(path)
        const element = node.openingElement.attributes.find(a => a.name?.name === 'element')?.value?.expression
        const page = element?.children?.find(child => child.type === 'JSXElement')?.openingElement.name.name
        if (components.has(page)) entries[path] = components.get(page)
      }
    }
    for (const value of Object.values(node)) {
      for (const child of Array.isArray(value) ? value : [value]) visit(child)
    }
  }
  visit(ast)
  const config = JSON.parse(readFileSync(new URL('vercel.json', projectRoot), 'utf8'))
  const routes = paths.filter(path => path !== '*').map(path => ({ path }))
  function isValidPage(pathname) {
    const match = matchRoutes(routes, pathname)?.at(-1)
    if (!match) return false
    if (match.route.path === '/blog/:slug') {
      return blogPosts.some(post => post.slug === match.params.slug)
    }
    return true
  }
  return { paths, entries, redirects: config.redirects, isValidPage }
}

// The committed production sitemap is the inventory; fail closed on drift.
export function readInventory() {
  const xml = readFileSync(new URL('public/sitemap.xml', projectRoot), 'utf8')
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
  if (urls.length !== 31 || new Set(urls).size !== 31) throw Error('Expected exactly 31 unique sitemap URLs')
  const routing = readRouting()
  return urls.map(value => {
    const url = new URL(value)
    if (url.origin !== site || url.search || url.hash || value !== site + url.pathname) throw Error('Unexpected sitemap URL: ' + value)
    if (routing.redirects.some(rule => rule.source === url.pathname)) throw Error('Redirect in sitemap: ' + value)
    const route = matchRoutes(Object.keys(routing.entries).filter(path => path !== '*').map(path => ({ path })), url.pathname)?.at(-1)
    if (!route || !routing.isValidPage(url.pathname)) throw Error('Sitemap URL has no approved page: ' + value)
    return { path: url.pathname, canonical: value, route: route.route.path, entry: routing.entries[route.route.path] }
  })
}
export const prototypePaths = Object.freeze(readInventory().map(page => page.path))
