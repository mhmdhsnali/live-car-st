import { Home, PlusCircle, Stethoscope, Calendar, Wallet, User, Video, Moon, Sun, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useState } from 'react';
import AIAssistant from "./AIAssistant";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui-primitives";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navItems = [
    { icon: Home, label: "الرئيسية", path: "/" },
    { icon: ShoppingBag, label: "المتجر", path: "/market" },
    { icon: PlusCircle, label: "إضافة", path: "/add-vehicle", isMain: true },
    { icon: Calendar, label: "مواعيدي", path: "/appointments" },
    { icon: Wallet, label: "محفظتي", path: "/wallet" },
  ];

  const desktopNavItems = [
    { icon: Home, label: "الرئيسية", path: "/" },
    { icon: ShoppingBag, label: "المتجر", path: "/market" },
    { icon: Calendar, label: "مواعيدي", path: "/appointments" },
    { icon: Wallet, label: "محفظتي", path: "/wallet" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row relative overflow-hidden transition-colors duration-500 font-sans" dir="rtl">
      {/* Video Background with Blur Overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover sm:object-center object-bottom min-w-full min-h-full transition-transform duration-1000",
            isModalOpen ? "scale-105 opacity-10 dark:opacity-20" : "opacity-20 dark:opacity-30"
          )}
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
        </video>
        {/* Apple Glass Blur Overlay */}
        <div className={cn(
          "absolute inset-0 transition-all duration-700 ease-out",
          isModalOpen 
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-3xl" 
            : "bg-white/60 dark:bg-black/60 backdrop-blur-xl"
        )} />
        
        {/* Ambient Gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px]" />
      </div>

      {/* Theme Toggle - Positioned top left for RTL */}
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

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 z-40 p-6 border-l border-white/20 dark:border-white/5 glass dark:glass-dark">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-teal-400 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-blue/30">
            LC
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">لايف كار</h2>
        </div>

        <nav className="flex-1 space-y-2">
          {desktopNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                  isActive 
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "fill-current/20")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link to="/add-vehicle" className="mt-auto">
          <Button className="w-full rounded-xl gap-2 shadow-brand-blue/30 h-12 bg-gradient-to-r from-brand-blue to-blue-500 hover:opacity-90">
            <PlusCircle className="w-5 h-5" />
            إضافة سيارة جديدة
          </Button>
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto min-h-screen relative z-10 pb-28 md:pb-8 pt-4 px-0 md:px-8">
        {children}
      </main>

      <AIAssistant onOpenChange={setIsModalOpen} />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="max-w-md mx-auto px-4 pb-6">
          <div className="glass dark:glass-dark rounded-3xl flex items-center justify-between px-2 py-2 shadow-2xl shadow-brand-blue/10 dark:shadow-black/50 border border-white/20 dark:border-white/5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              if (item.isMain) {
                return (
                  <Link to={item.path} key={item.path} className="relative -top-8">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-blue-500 flex items-center justify-center shadow-lg shadow-brand-blue/40 border-4 border-slate-50 dark:border-slate-900"
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
                    "flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-2xl transition-all duration-300",
                    isActive ? "text-brand-blue" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{ y: isActive ? -4 : 0 }}
                  >
                    <item.icon className={cn("w-6 h-6", isActive && "fill-current/20")} />
                  </motion.div>
                  <span className="text-[10px] font-medium mt-1">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator-mobile"
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

