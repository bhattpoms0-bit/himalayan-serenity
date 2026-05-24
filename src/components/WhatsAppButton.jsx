import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WA_MSG = encodeURIComponent(
  "Hello! I found your website and I am interested in your Himalayan travel packages. Please share more details."
)

export default function WhatsAppButton() {
  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(37,211,102,0.55); }
          70%  { box-shadow: 0 0 0 12px rgba(37,211,102,0);   }
          100% { box-shadow: 0 0 0 0   rgba(37,211,102,0);    }
        }
        .wa-float {
          position:       fixed;
          bottom:         32px;
          left:           24px;
          right:          auto;
          z-index:        9999;
          display:        flex;
          align-items:    center;
          gap:            8px;
          background:     #25D366;
          color:          #ffffff;
          text-decoration: none;
          border-radius:  50px;
          padding:        12px 20px;
          font-size:      14px;
          font-weight:    600;
          font-family:    sans-serif;
          animation:      wa-pulse 2s infinite;
          box-shadow:     0 4px 20px rgba(37,211,102,0.35);
          transition:     transform 0.2s ease, background 0.2s ease;
          user-select:    none;
        }
        .wa-float:hover  { background: #20c05a; transform: scale(1.05); }
        .wa-float:active { transform: scale(0.96); }
        .wa-label { display: inline; white-space: nowrap; }

        @media (max-width: 767px) {
          .wa-float {
            bottom:        90px;
            left:          16px;
            right:         auto;
            padding:       14px;
            border-radius: 50%;
          }
          .wa-label { display: none; }
        }
      `}</style>

      <motion.a
        href={`https://wa.me/919084642557?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={20} strokeWidth={2} />
        <span className="wa-label">Chat on WhatsApp</span>
      </motion.a>
    </>
  )
}
