import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/9771444000"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-sans px-4 py-3 rounded-full shadow-lg transition-colors duration-300"
    style={{ boxShadow: '0 8px 30px rgba(34,197,94,0.4)' }}
  >
    <MessageCircle size={16} />
    <span className="hidden sm:inline">WhatsApp</span>
  </motion.a>
)

export default WhatsAppButton
