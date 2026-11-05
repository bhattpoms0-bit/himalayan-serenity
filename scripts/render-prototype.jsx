// Build-time static rendering ONLY. No request-time renderer or new backend.
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import * as seo from '../src/hooks/useSEO'
import GlobalNav from '../src/components/GlobalNav'
import NotFound from '../src/pages/NotFound'
import { readRouting } from './prototype-routes.mjs'

const modules = import.meta.glob('../src/pages/**/*.jsx', { eager: true })
const entries = Object.entries(readRouting().entries).filter(([path]) => path !== '*')

export function renderPrototype(pathname, notFound = false) {
  seo.resetCapturedSEO()
  const markup = renderToStaticMarkup(
    <StaticRouter location={pathname}>
      <MotionConfig isStatic>
        <AnimatePresence initial={false}>
          <div key={pathname}>
            <GlobalNav />
            {notFound ? <NotFound /> : <Routes>{entries.map(([path, entry]) => {
              const Page = modules['../' + entry]?.default
              if (!Page) throw Error('Missing approved page component: ' + entry)
              return <Route key={path} path={path} element={<Page />} />
            })}</Routes>}
          </div>
        </AnimatePresence>
      </MotionConfig>
    </StaticRouter>,
  )
  return { markup, metadata: seo.capturedSEO }
}
