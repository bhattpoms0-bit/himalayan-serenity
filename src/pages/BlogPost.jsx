import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogPosts } from '../data/blogPosts'

const EASE = [0.25, 0.46, 0.45, 0.94]

function parseContent(raw) {
  const lines = raw.trim().split('\n')
  const elements = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 28,
            color: '#F0E8D8',
            fontWeight: 400,
            marginTop: '2.5rem',
            marginBottom: '1rem',
            lineHeight: 1.25,
          }}
        >
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p
          key={key++}
          className="font-sans"
          style={{ fontSize: 16, color: '#F0E8D8', fontWeight: 600, marginBottom: '0.5rem' }}
        >
          {line.replace(/\*\*/g, '')}
        </p>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <li
          key={key++}
          className="font-sans"
          style={{
            fontSize: 16,
            color: '#999999',
            lineHeight: 2,
            marginLeft: '1.25rem',
            listStyleType: 'disc',
          }}
        >
          {line.replace('- ', '')}
        </li>
      )
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      elements.push(
        <p
          key={key++}
          className="font-sans"
          style={{ fontSize: 16, color: '#999999', lineHeight: 2, marginBottom: '1.5rem' }}
        >
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} style={{ color: '#F0E8D8' }}>{part.replace(/\*\*/g, '')}</strong>
              : part
          )}
        </p>
      )
    }
  }

  return elements
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

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
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)'
        }} />

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
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
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
          {parseContent(post.content)}
        </motion.article>

        {/* ── Related Posts ─────────────────────────────────────── */}
        <div className="mt-20">
          <div className="mb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
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
