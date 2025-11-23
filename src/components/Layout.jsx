import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-secondary-500/30 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=3348&auto=format&fit=crop')`,
          }}
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/10 bg-slate-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-6 h-6 text-secondary-400" />
              </motion.div>
              <span className="text-xl font-bold text-white tracking-wide">
                WIZZIO.AI
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20 bg-slate-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400 font-semibold">WIZZIO.AI</span>
            </div>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-slate-500">
              © 2024 Wizzio AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
