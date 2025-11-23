import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, PlayCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-default">
          <Sparkles className="w-4 h-4 text-secondary-400 mr-2" />
          <span className="text-sm font-medium text-slate-300">AI-Powered Video Generation</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
          WIZZIO<span className="text-secondary-400">.AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Generate professional AI-powered reels from a single text prompt.
          <br className="hidden md:block" />
          No editing skills required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/studio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-slate-100 transition-colors shadow-lg shadow-white/10"
            >
              <PlayCircle className="w-6 h-6" />
              Create Reel
            </motion.button>
          </Link>
          
          <button className="px-8 py-4 bg-white/5 text-white rounded-full font-medium text-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm">
            Watch Demo <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

