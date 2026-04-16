import { useState } from "react";
import { motion } from "motion/react";
import { Button, Input } from "@/components/ui-primitives";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
import React from 'react';

export default function LoginView() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 bg-gradient-to-tr from-brand-blue to-brand-orange rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-blue/30 mb-6 relative"
          >
            <Car className="w-12 h-12 text-white" />
            <motion.div
              className="absolute inset-0 border-4 border-white/20 rounded-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Live Car</h1>
          <p className="text-slate-400 text-lg">رفيقك الذكي لصيانة سيارتك</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium pr-1">رقم الجوال</label>
            <Input 
              type="tel" 
              placeholder="05xxxxxxxx" 
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-14 text-lg text-center tracking-widest"
              dir="ltr"
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg bg-gradient-to-r from-brand-blue to-blue-600 hover:to-blue-500 border-0 shadow-lg shadow-brand-blue/25"
            isLoading={isLoading}
          >
            تسجيل الدخول
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            ليس لديك حساب؟ <button className="text-brand-orange font-bold hover:underline">سجل الآن</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
