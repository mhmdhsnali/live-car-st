import { Home, PlusCircle, Stethoscope, Calendar, Wallet, User, Video, Moon, Sun, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from 'react';
import AIAssistant from "./AIAssistant";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui-primitives";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const navItems = [
    { icon: Home, label: "الرئيسية", path: "/" },
    { icon: ShoppingBag, label: "المتجر", path: "/market" },
    { icon: PlusCircle, label: "إضافة", path: "/add-vehicle", isMain: true },
    { icon: Calendar, label: "مواعيدي", path: "/appointments" },
    { icon: Wallet, label: "محفظتي", path: "/wallet" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 relative overflow-hidden transition-colors duration-500">
      {/* Video Background with Blur Overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-30"
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
        </video>
        {/* Apple Glass Blur Overlay */}
        <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-xl" />
        
        {/* Ambient Gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px]" />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/30 dark:hover:bg-black/30 text-slate-800 dark:text-white"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      <main className="max-w-md mx-auto min-h-screen relative z-10">
        {children}
      </main>

      <AIAssistant />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto px-4 pb-4">
          <div className="glass dark:glass-dark rounded-3xl flex items-center justify-between px-2 py-2 shadow-2xl shadow-brand-blue/10 dark:shadow-black/50 border border-white/20 dark:border-white/5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              if (item.isMain) {
                return (
                  <Link to={item.path} key={item.path} className="relative -top-8">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-blue-400 flex items-center justify-center shadow-lg shadow-brand-blue/40 border-4 border-slate-50 dark:border-slate-900"
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300",
                    isActive ? "text-brand-blue" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{ y: isActive ? -4 : 0 }}
                  >
                    <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
                  </motion.div>
                  <span className="text-[10px] font-medium mt-1">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-blue"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
