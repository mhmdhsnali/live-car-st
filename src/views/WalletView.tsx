import { motion } from "motion/react";
import { Wallet, ArrowUpRight, ArrowDownLeft, QrCode, History, ChevronRight, CreditCard } from "lucide-react";
import { Button, Card } from "@/components/ui-primitives";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const transactions = [
  { id: 1, title: "شحن رصيد", date: "اليوم، 10:30 ص", amount: "+500.00", type: "credit" },
  { id: 2, title: "صيانة دورية - ورشة الخبراء", date: "أمس، 04:15 م", amount: "-340.00", type: "debit" },
  { id: 3, title: "شراء قطع غيار", date: "20 مارس، 09:00 ص", amount: "-120.00", type: "debit" },
  { id: 4, title: "استرداد نقدي", date: "15 مارس، 02:30 م", amount: "+50.00", type: "credit" },
];

export default function WalletView() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">المحفظة</h1>
      </div>

      {/* Digital Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full aspect-[1.586] rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/30 mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-blue-900"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] animate-[shimmer_3s_infinite]"></div>

        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">الرصيد الحالي</p>
              <h2 className="text-3xl font-bold tracking-tight">1,247.00 <span className="text-lg font-normal opacity-80">ريال</span></h2>
            </div>
            <Wallet className="w-8 h-8 opacity-80" />
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-200 text-xs mb-1">رقم المحفظة</p>
              <p className="font-mono tracking-wider opacity-90">**** 8492</p>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-8 h-5 bg-white/20 rounded-sm" />
               <div className="w-8 h-5 bg-orange-500/80 rounded-sm" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Button className="h-14 bg-slate-900 text-white hover:bg-slate-800 shadow-none">
          <ArrowUpRight className="ml-2 w-5 h-5" />
          شحن الرصيد
        </Button>
        <Button variant="outline" className="h-14 border-slate-200">
          <QrCode className="ml-2 w-5 h-5" />
          دفع سريع
        </Button>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">آخر العمليات</h3>
          <Button variant="ghost" size="sm" className="text-slate-500">عرض الكل</Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 flex items-center justify-between border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    tx.type === 'credit' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"
                  )}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{tx.title}</h4>
                    <p className="text-xs text-slate-500">{tx.date}</p>
                  </div>
                </div>
                <span className={cn(
                  "font-bold font-mono",
                  tx.type === 'credit' ? "text-green-600" : "text-slate-900"
                )}>
                  {tx.amount}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
