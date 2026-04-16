import { motion } from "motion/react";
import { Car, Wrench, CalendarCheck, ChevronLeft, Bell, Search, ShoppingBag } from "lucide-react";
import { Button, Card } from "@/components/ui-primitives";
import { Link } from "react-router-dom";
import { useNotifications } from "@/components/NotificationSystem";
import { useEffect } from "react";

export default function HomeView() {
  const { showNotification } = useNotifications();

  // Simulate an upcoming appointment reminder on load (just once for demo)
  useEffect(() => {
    const timer = setTimeout(() => {
      showNotification(
        "warning",
        "تذكير بموعد صيانة",
        "لديك موعد صيانة غداً الساعة 4:00 م في مركز الخبراء المعتمد.",
        8000
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, [showNotification]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-orange p-[2px]">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">مرحباً بك 👋</p>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">أحمد محمد</h1>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/50 dark:bg-black/50 backdrop-blur shadow-sm hover:bg-white/80 dark:hover:bg-black/80">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-black" />
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h2 className="text-3xl font-black leading-tight text-slate-900 dark:text-white mb-2">
            تشخيص سيارتك <br />
            <span className="text-gradient">في 60 ثانية</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-[200px]">
            تقنية AI المتطورة لفحص الأعطال وتقدير التكلفة فوراً
          </p>
          <Link to="/diagnosis">
            <Button className="rounded-full px-8 shadow-brand-blue/40">
              ابدأ التشخيص الآن
            </Button>
          </Link>
        </motion.div>
        
        {/* 3D Car Placeholder Animation */}
        <motion.div 
          className="absolute -left-12 top-0 w-[300px] h-[200px] z-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop" 
            alt="Car" 
            className="w-full h-full object-contain drop-shadow-2xl transform scale-x-[-1]"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,123,255,0.2))" }}
          />
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4 mt-12">
        <Link to="/market">
          <Card className="p-4 h-40 flex flex-col justify-between group hover:border-brand-blue/50 transition-colors dark:bg-slate-900/60 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors text-brand-blue dark:text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">سوق القطع</h3>
              <p className="text-xs text-slate-400 mt-1">عروض حصرية</p>
            </div>
          </Card>
        </Link>
        
        <Link to="/bookings">
          <Card className="p-4 h-40 flex flex-col justify-between group hover:border-brand-orange/50 transition-colors dark:bg-slate-900/60 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors text-brand-orange dark:text-orange-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">احجز ورشة</h3>
              <p className="text-xs text-slate-400 mt-1">أقرب الورش المعتمدة</p>
            </div>
          </Card>
        </Link>
      </section>

      {/* My Vehicles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">مركباتي</h3>
          <Button variant="ghost" size="sm" className="text-brand-blue">عرض الكل</Button>
        </div>
        
        <motion.div 
          className="glass dark:glass-dark p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-brand-blue"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=200&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Camry" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-900 dark:text-white">تويوتا كامري</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">2023 • LE Hybrid</p>
          </div>
          <div className="text-right">
            <span className="block text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full font-medium">حالة ممتازة</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
