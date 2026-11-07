'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight, Sparkles, Check, ShieldCheck, HeartPulse } from 'lucide-react';

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-amber-500 selection:text-black border-emerald-800/80 flex h-10 w-full min-w-0 rounded-xl border bg-emerald-950/40 px-3.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white placeholder:text-emerald-300/40",
        "focus-visible:border-amber-400 focus-visible:ring-amber-400/30 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  )
}

interface ComponentProps {
  title?: string;
  subtitle?: string;
  onSuccess?: (user: { email: string }) => void;
  onClose?: () => void;
  bgImageUrl?: string;
}

export function Component({
  title = "നമ്മുടെ അവകാശം – ലോഗിൻ",
  subtitle = "കേരള ക്ഷേമ & ആരോഗ്യ സേവനങ്ങൾക്കായി പ്രവേശിക്കുക",
  onSuccess,
  onClose,
  bgImageUrl = ""
}: ComponentProps = {}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // For 3D card tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) {
        onSuccess({ email: email || 'citizen@kerala.gov.in' });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen w-screen bg-[#021811] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Kerala Rainforest gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b]/90 via-[#022c22]/95 to-[#01140e] pointer-events-none" />

      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Close button if rendered as a modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-amber-300 border border-amber-400/30 transition-all backdrop-blur-md cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>
      )}

      {/* Top radial glow in Kasavu Gold & Emerald */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[55vh] rounded-b-[50%] bg-emerald-600/15 blur-[90px] pointer-events-none" />
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[50vh] rounded-b-full bg-amber-500/10 blur-[80px] pointer-events-none"
        animate={{ 
          opacity: [0.15, 0.28, 0.15],
          scale: [0.98, 1.02, 0.98]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ z: 10 }}
        >
          <div className="relative group">
            {/* Card glow effect */}
            <motion.div 
              className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                boxShadow: [
                  "0 0 15px 2px rgba(217,119,6,0.15)",
                  "0 0 25px 4px rgba(245,158,11,0.25)",
                  "0 0 15px 2px rgba(217,119,6,0.15)"
                ],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut", 
                repeatType: "mirror" 
              }}
            />

            {/* Traveling Kasavu Gold light beam effect */}
            <div className="absolute -inset-[1px] rounded-3xl overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80"
                animate={{ left: ["-50%", "100%"] }}
                transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80"
                animate={{ right: ["-50%", "100%"] }}
                transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.4 }}
              />
            </div>

            {/* Glass card background - Rainforest Green & Kasavu Gold border */}
            <div className="relative bg-[#06261c]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border-2 border-amber-400/40 shadow-2xl overflow-hidden">
              
              {/* Header Badge & Title */}
              <div className="text-center space-y-1.5 mb-6">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-emerald-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/80"
                >
                  🌴
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xl font-black text-white tracking-tight"
                >
                  {title}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-emerald-200/80 text-xs font-medium leading-relaxed"
                >
                  {subtitle}
                </motion.p>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  {/* Email input */}
                  <div className="relative">
                    <div className="relative flex items-center overflow-hidden rounded-xl">
                      <Mail className={`absolute left-3.5 w-4 h-4 transition-colors ${
                        focusedInput === "email" ? 'text-amber-400' : 'text-emerald-300/60'
                      }`} />
                      
                      <Input
                        type="email"
                        placeholder="ഇമെയിൽ / റേഷൻ കാർഡ് നമ്പർ"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10.5 pr-3.5"
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="relative">
                    <div className="relative flex items-center overflow-hidden rounded-xl">
                      <Lock className={`absolute left-3.5 w-4 h-4 transition-colors ${
                        focusedInput === "password" ? 'text-amber-400' : 'text-emerald-300/60'
                      }`} />
                      
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="രഹസ്യവാക്ക് / പാസ്‌വേഡ്"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10.5 pr-11"
                      />
                      
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3.5 p-1 text-emerald-300/60 hover:text-amber-300 transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-emerald-200/80 hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 rounded border-emerald-700 bg-emerald-950/60 text-amber-500 focus:ring-amber-400"
                    />
                    <span>ഓർക്കുക (Remember me)</span>
                  </label>
                  
                  <Link href="/forgot-password" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors">
                    പാസ്‌വേഡ് മറന്നോ?
                  </Link>
                </div>

                {/* Sign in button - Kasavu Gold Gradient */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group mt-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-sm tracking-wide shadow-lg border-2 border-white/60 transition-all flex items-center justify-center gap-2"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                        <span>പരിശോധിക്കുന്നു...</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="button-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-1.5"
                      >
                        <span>സൈൻ ഇൻ ചെയ്യുക (Sign In)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Minimal Divider */}
                <div className="relative my-4 flex items-center">
                  <div className="flex-grow border-t border-emerald-800/80"></div>
                  <span className="mx-3 text-[11px] font-bold text-emerald-400/60 uppercase">അല്ലെങ്കിൽ</span>
                  <div className="flex-grow border-t border-emerald-800/80"></div>
                </div>

                {/* Citizen e-Sevanam / Google Sign In */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      if (onSuccess) onSuccess({ email: 'citizen.kerala@nic.in' });
                    }, 1000);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>കേരള സിംഗിൾ സൈൻ ഓൺ (e-Sevanam SSO)</span>
                </button>

                {/* Sign up link */}
                <p className="text-center text-xs text-emerald-200/70 mt-3 pt-2 border-t border-emerald-900/60">
                  അക്കൗണ്ട് ഇല്ലേ?{' '}
                  <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-bold underline transition-colors">
                    രജിസ്റ്റർ ചെയ്യുക (Register)
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Component;
