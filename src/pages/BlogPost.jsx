import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogPosts } from '../data/blogPosts'

const EASE = [0.25, 0.46, 0.45, 0.94]

const renderContent = (content) => {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="font-serif text-3xl text-brand-cream mt-12 mb-5">
          {line.replace('## ', '')}
        </h2>
      )
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-sans font-semibold text-brand-cream text-base mb-2">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    }
    if (line.trim() === '') return <br key={i} />
    return (
      <p key={i} className="font-sans text-[#999] text-base leading-8 mb-4">
        {line}
      </p>
    )
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle || post.title

      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = post.metaDescription || post.excerpt

      const setOG = (property, content) => {
        let el = document.querySelector(`meta[property="${property}"]`)
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute('property', property)
          document.head.appendChild(el)
        }
        el.content = content
      }

      setOG('og:title', post.metaTitle || post.title)
      setOG('og:description', post.metaDescription || post.excerpt)
      setOG('og:image', post.image)
      setOG('og:type', 'article')

      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "author": {
          "@type": "Organization",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Himalayan Serenity",
          "logo": {
            "@type": "ImageObject",
            "url": "https://himalayan-serenity.vercel.app/favicon.svg"
          }
        },
        "datePublished": post.date,
        "keywords": post.keywords?.join(', '),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://himalayan-serenity.vercel.app/blog/${post.slug}`
        }
      }

      let schemaScript = document.getElementById('blog-schema')
      if (!schemaScript) {
        schemaScript = document.createElement('script')
        schemaScript.id = 'blog-schema'
        schemaScript.type = 'application/ld+json'
        document.head.appendChild(schemaScript)
      }
      schemaScript.textContent = JSON.stringify(schema)
    }

    return () => {
      document.title = 'Himalayan Serenity | Sacred Mountain Journeys'
    }
  }, [post])

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="font-sans text-brand-text-muted mb-4">Post not found.</p>
          <Link to="/blog" className="text-brand-orange font-sans text-sm">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 2)

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* ── Hero Image ───────────────────────────────────────────── */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt || post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span
              className="inline-block mb-4 px-3 py-1 rounded-full"
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 10,
                letterSpacing: '0.15em',
                color: '#e07b2a',
                backgroundColor: 'rgba(224,123,42,0.15)',
                border: '1px solid rgba(224,123,42,0.3)',
              }}
            >
              {post.category}
            </span>

            <h1
              className="max-w-3xl mx-auto"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
                color: '#F0E8D8',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                marginBottom: '1rem',
              }}
            >
              {post.title}
            </h1>

            <p className="font-sans" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              {post.date} · {post.readTime} · {post.author}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-block font-sans mb-10 transition-colors duration-200"
          style={{ fontSize: 13, color: '#e07b2a' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#f09040')}
          onMouseLeave={e => (e.currentTarget.style.color = '#e07b2a')}
        >
          ← Back to Blog
        </Link>

        {/* Author bar */}
        <div
          className="flex items-center gap-4 py-5 my-2 mb-10"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full font-sans font-semibold text-sm"
            style={{
              width: 44,
              height: 44,
              backgroundColor: 'rgba(224,123,42,0.15)',
              border: '1px solid rgba(224,123,42,0.3)',
              color: '#e07b2a',
            }}
          >
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-sans text-sm" style={{ color: '#cccccc' }}>{post.author}</p>
            <p className="font-sans" style={{ fontSize: 12, color: '#555555' }}>{post.date} · {post.readTime}</p>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="font-sans mb-10 leading-relaxed"
          style={{ fontSize: 18, color: '#777777', fontStyle: 'italic' }}
        >
          {post.subtitle}
        </p>

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          <div className="prose-content">
            {renderContent(post.content)}
          </div>
        </motion.article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/8">
          <span className="font-sans text-xs text-brand-text-muted">Tags:</span>
          {post.keywords?.map(tag => (
            <span
              key={tag}
              className="text-xs font-sans border border-white/10 rounded-full px-3 py-1 text-brand-text-muted hover:border-brand-orange/30 hover:text-brand-orange transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-12 p-8 bg-brand-dark-card border border-brand-dark-border rounded-2xl text-center">
          <p className="section-tag mb-3">Ready to Experience It?</p>
          <h3 className="font-serif text-2xl text-brand-cream mb-4">
            Begin Your Sacred Journey
          </h3>
          <p className="font-sans text-brand-text-muted text-sm mb-6">
            Join thousands of spiritual seekers who have transformed their lives
            through our Himalayan expeditions.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/contact#consultation" className="btn-primary text-sm">View Packages</a>
            <a href="/contact" className="btn-secondary text-sm">Book Consultation</a>
          </div>
        </div>

        {/* ── Related Posts ─────────────────────────────────────── */}
        <div className="mt-20">
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p
              className="mt-8 mb-6 uppercase"
              style={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '0.2em', color: '#e07b2a' }}
            >
              Continue Reading
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map(rp => (
              <motion.div
                key={rp.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Link
                  to={`/blog/${rp.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden"
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5">
                    <p
                      className="mb-2 uppercase"
                      style={{ fontFamily: '"Cinzel", serif', fontSize: 9, letterSpacing: '0.15em', color: '#e07b2a' }}
                    >
                      {rp.category}
                    </p>
                    <h4
                      className="leading-snug"
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 16,
                        color: '#F0E8D8',
                        fontWeight: 400,
                      }}
                    >
                      {rp.title}
                    </h4>
                    <p className="font-sans mt-2" style={{ fontSize: 11, color: '#555555' }}>
                      {rp.date} · {rp.readTime}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
