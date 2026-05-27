import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogPosts } from '../data/blogPosts'

const EASE = [0.25, 0.46, 0.45, 0.94]

const featured = blogPosts[0]
const rest = blogPosts.slice(1)

export default function Blog() {
  useSEO({
    title: 'Adi Kailash Yatra Guide 2026 | Kumaon Trek Blog | Om Parvat Travel Tips',
    description: 'Complete guide for Adi Kailash Yatra 2026, Om Parvat darshan, Adi Kailash opening date, Dharchula to Adi Kailash distance, altitude sickness tips and Kumaon trekking guides.',
  })
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="blog" />

      {/* Visually hidden SEO h1 */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Himalayan Travel Blog — Guides, Tips &amp; Expedition Stories
      </h1>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')`,
            opacity: 0.2,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p
              className="mb-4 uppercase"
              style={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '0.22em', color: '#e07b2a' }}
            >
              Himalayan Insights
            </p>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                color: '#F0E8D8',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.018em',
                marginBottom: '1.25rem',
              }}
            >
              Stories from the Sacred Trail
            </h2>
            <p className="font-sans text-base max-w-lg mx-auto" style={{ color: '#888888', lineHeight: 1.8 }}>
              Guides, insights, and wisdom from the heart of the Himalayas.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── Featured Post ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12"
        >
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: EASE }}>
            <Link
              to={`/blog/${featured.slug}`}
              className="group flex flex-col lg:flex-row rounded-2xl overflow-hidden"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Image — 60% */}
              <div className="lg:w-[60%] h-64 lg:h-96 overflow-hidden flex-shrink-0">
                <img
                  src={featured.image}
                  alt={featured.imageAlt || featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content — 40% */}
              <div className="lg:w-[40%] flex flex-col justify-center p-8 lg:p-10">
                <span
                  className="inline-block self-start mb-4 px-3 py-1 rounded-full"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    color: '#e07b2a',
                    backgroundColor: 'rgba(224,123,42,0.12)',
                    border: '1px solid rgba(224,123,42,0.25)',
                  }}
                >
                  {featured.category}
                </span>

                <h2
                  className="mb-4 leading-tight"
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    color: '#F0E8D8',
                    fontWeight: 400,
                  }}
                >
                  {featured.title}
                </h2>

                <p
                  className="font-sans mb-6 leading-relaxed line-clamp-3"
                  style={{ fontSize: 14, color: '#888888' }}
                >
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className="font-sans font-semibold transition-colors duration-200"
                    style={{ fontSize: 13, color: '#e07b2a' }}
                  >
                    Read Article →
                  </span>
                  <span className="font-sans" style={{ fontSize: 12, color: '#555555' }}>
                    {featured.date} · {featured.readTime}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Grid of 4 ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group h-full"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex flex-col h-full rounded-2xl overflow-hidden"
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <p
                      className="mb-2 uppercase"
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: 9,
                        letterSpacing: '0.15em',
                        color: '#e07b2a',
                      }}
                    >
                      {post.category}
                    </p>

                    <h3
                      className="mb-2 leading-snug"
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 18,
                        color: '#F0E8D8',
                        fontWeight: 400,
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      className="font-sans mb-4 leading-relaxed line-clamp-2 flex-1"
                      style={{ fontSize: 13, color: '#777777' }}
                    >
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="font-sans" style={{ fontSize: 11, color: '#555555' }}>
                        {post.date} · {post.readTime}
                      </span>
                      <span
                        className="font-sans font-semibold"
                        style={{ fontSize: 12, color: '#e07b2a' }}
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  )
}
