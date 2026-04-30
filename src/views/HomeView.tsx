import { motion } from "motion/react";
import { Car, Wrench, CalendarCheck, ChevronLeft, Bell, Search, ShoppingBag, Badge as BadgeIcon, Calendar } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui-primitives";
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
    <div className="p-4 md:p-8 pt-6 space-y-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-blue to-brand-orange p-[2px] shadow-lg shadow-brand-blue/20">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">مرحباً بك 👋</p>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">أحمد محمد</h1>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/50 dark:bg-black/50 backdrop-blur shadow-sm hover:bg-white/80 dark:hover:bg-black/80 h-10 w-10 relative">
          <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative mt-8 md:mt-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/40 dark:border-white/5 shadow-2xl shadow-brand-blue/5 overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full md:w-1/2"
        >
          <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 mb-4 rounded-full px-4 py-1.5 text-sm font-medium">الذكاء الاصطناعي</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.2] text-slate-900 dark:text-white mb-4">
            تشخيص سيارتك <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-blue to-teal-400">في 60 ثانية</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-sm leading-relaxed">
            استخدم تقنية الذكاء الاصطناعي المتطورة لفحص الأعطال المخفية وتقدير تكلفة الصيانة فوراً.
          </p>
          <Link to="/diagnosis">
            <Button className="rounded-full px-8 py-6 text-lg font-bold shadow-xl shadow-brand-blue/40 bg-gradient-to-r from-brand-blue to-blue-600 hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
              ابدأ التشخيص الآن
            </Button>
          </Link>
        </motion.div>
        
        {/* 3D Car Placeholder Animation */}
        <motion.div 
          className="relative w-full md:w-1/2 h-[250px] md:h-[400px] mt-12 md:mt-0 z-0 flex justify-center items-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-brand-blue/20 blur-[100px] rounded-full scale-75" />
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop" 
            alt="Car" 
            className="w-full h-full object-contain drop-shadow-2xl transform scale-x-[-1] relative z-10 hover:scale-105 transition-transform duration-700"
            style={{ filter: "drop-shadow(0 30px 40px rgba(0,123,255,0.25))" }}
          />
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white">الخدمات السريعة</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Link to="/market" className="group block h-full">
            <Card className="p-6 h-full min-h-[160px] flex flex-col justify-between group-hover:border-brand-blue/50 group-hover:shadow-lg group-hover:shadow-brand-blue/10 transition-all duration-300 dark:bg-slate-900/60 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-brand-blue group-hover:scale-110 group-hover:text-white transition-all duration-300 text-brand-blue dark:text-blue-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">سوق القطع</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">منتجات أصلية</p>
              </div>
            </Card>
          </Link>
          
          <Link to="/bookings" className="group block h-full">
            <Card className="p-6 h-full min-h-[160px] flex flex-col justify-between group-hover:border-brand-orange/50 group-hover:shadow-lg group-hover:shadow-brand-orange/10 transition-all duration-300 dark:bg-slate-900/60 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-brand-orange group-hover:scale-110 group-hover:text-white transition-all duration-300 text-brand-orange dark:text-orange-400">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">احجز ورشة</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">الورش المعتمدة</p>
              </div>
            </Card>
          </Link>

          <Link to="/add-vehicle" className="group block h-full">
            <Card className="p-6 h-full min-h-[160px] flex flex-col justify-between group-hover:border-teal-500/50 group-hover:shadow-lg group-hover:shadow-teal-500/10 transition-all duration-300 dark:bg-slate-900/60 dark:border-white/10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center group-hover:bg-teal-500 group-hover:scale-110 group-hover:text-white transition-all duration-300 text-teal-500 dark:text-teal-400">
                <Car className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">أضف مركبة</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">إضافة لملفك</p>
              </div>
            </Card>
          </Link>

          <Link to="/appointments" className="group block h-full">
            <Card className="p-6 h-full min-h-[160px] flex flex-col justify-between group-hover:border-purple-500/50 group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300 dark:bg-slate-900/60 dark:border-white/10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 group-hover:text-white transition-all duration-300 text-purple-600 dark:text-purple-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">مواعيدي</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">جدولة الصيانة</p>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* My Vehicles */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white">مركباتي</h3>
          <Button variant="ghost" size="sm" className="text-brand-blue hover:bg-brand-blue/10">عرض الكل</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <motion.div 
            className="glass dark:glass-dark p-6 rounded-3xl flex items-center gap-6 border-r-4 border-r-brand-blue hover:shadow-lg transition-shadow cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-20 h-20 rounded-2xl shadow-inner bg-slate-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center overflow-hidden">
               <img src="https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=200&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Camry" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">تويوتا كامري</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Car className="w-3 h-3" /> 2023 • LE Hybrid
              </p>
            </div>
            <div className="text-left flex flex-col items-end gap-2">
              <span className="inline-block text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full font-medium border border-green-200 dark:border-green-800">حالة ممتازة</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
