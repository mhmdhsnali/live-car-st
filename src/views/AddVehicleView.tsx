import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Check, ChevronRight, ScanLine, Zap } from "lucide-react";
import { Button, Input, Card } from "@/components/ui-primitives";
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function AddVehicleView() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'scan' | 'details' | 'success'>('scan');
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep('details');
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">إضافة مركبة جديدة</h1>
      </div>

      <AnimatePresence mode="wait">
        {step === 'scan' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="relative flex-1 bg-slate-900 rounded-3xl overflow-hidden mb-6 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                alt="VIN Scan"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-40 border-2 border-brand-blue/50 rounded-xl relative">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-blue"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-blue"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-blue"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-blue"></div>
                  
                  {scanning && (
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-0.5 bg-brand-blue shadow-[0_0_15px_rgba(0,123,255,0.8)]"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              </div>
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-white/80 text-sm">وجه الكاميرا نحو رقم الهيكل (VIN)</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full mb-4" 
              onClick={handleScan}
              disabled={scanning}
            >
              {scanning ? "جاري المسح..." : "مسح رقم الهيكل"}
              {!scanning && <ScanLine className="mr-2 w-5 h-5" />}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep('details')}>
              إدخال البيانات يدوياً
            </Button>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">رقم الهيكل (VIN)</label>
                  <Input defaultValue="JM1NK41A5K029384" className="font-mono tracking-widest uppercase" />
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <Check className="w-3 h-3 ml-1" /> تم التحقق بنجاح
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">الشركة المصنعة</label>
                    <Input defaultValue="Toyota" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">الموديل</label>
                    <Input defaultValue="Camry" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">سنة الصنع</label>
                  <Input defaultValue="2023" type="number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">قراءة العداد (كم)</label>
                  <div className="px-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="200000" 
                      defaultValue="15000" 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                      <span>0 كم</span>
                      <span className="text-brand-blue font-bold">15,000 كم</span>
                      <span>200k+ كم</span>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-blue shadow-sm">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">القيمة التقديرية للصيانة السنوية</p>
                    <p className="font-bold text-slate-900">1,200 - 1,500 ريال</p>
                  </div>
                </div>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                حفظ المركبة
              </Button>
            </form>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8"
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600"
              animate={{ boxShadow: ["0 0 0 0px rgba(74, 222, 128, 0.4)", "0 0 0 20px rgba(74, 222, 128, 0)"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Check className="w-12 h-12" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">تمت الإضافة بنجاح!</h2>
            <p className="text-slate-500 mb-8">تم تسجيل تويوتا كامري 2023 في حسابك وهي جاهزة للتشخيص.</p>
            
            <div className="w-full space-y-3">
              <Button size="lg" className="w-full" onClick={() => navigate('/diagnosis')}>
                تشخيص المركبة الآن
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
                العودة للرئيسية
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
