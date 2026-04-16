import { motion } from "motion/react";
import { Calendar, Clock, MapPin, ChevronRight, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui-primitives";

const appointments = [
  {
    id: 1,
    service: "صيانة دورية (10,000 كم)",
    workshop: "مركز الخبراء المعتمد",
    date: "غداً، 25 أكتوبر",
    time: "04:00 م",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    service: "تغيير زيت وفلتر",
    workshop: "ورشة السرعة القصوى",
    date: "12 أكتوبر 2023",
    time: "10:30 ص",
    status: "completed",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    service: "فحص كمبيوتر شامل",
    workshop: "ماستر كار للصيانة",
    date: "05 سبتمبر 2023",
    time: "02:15 م",
    status: "cancelled",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500&auto=format&fit=crop&q=60"
  }
];

const statusConfig = {
  upcoming: { label: "قادم", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Calendar },
  completed: { label: "مكتمل", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle2 },
  cancelled: { label: "ملغي", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
};

export default function AppointmentsView() {
  return (
    <div className="p-6 space-y-6 min-h-screen pb-32">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">مواعيدي</h1>
        <Button variant="outline" size="sm" className="rounded-full">
          السجل الكامل
        </Button>
      </div>

      <div className="space-y-4">
        {appointments.map((apt, index) => {
          const StatusIcon = statusConfig[apt.status as keyof typeof statusConfig].icon;
          
          return (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                    <img src={apt.image} alt={apt.workshop} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">{apt.service}</h3>
                      <Badge className={`border ${statusConfig[apt.status as keyof typeof statusConfig].color}`}>
                        {statusConfig[apt.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{apt.workshop}</p>
                    
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {apt.status === 'upcoming' && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                    <Button className="flex-1 bg-brand-blue hover:bg-blue-600 text-white h-9 text-xs">
                      تعديل الموعد
                    </Button>
                    <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-9 text-xs">
                      إلغاء
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
