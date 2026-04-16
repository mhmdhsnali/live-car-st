import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, AlertTriangle, CheckCircle, AlertOctagon, Info } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui-primitives";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/components/NotificationSystem";

const questions = [
  {
    id: 1,
    title: "ما هي المشكلة الرئيسية؟",
    options: ["أصوات غريبة", "اهتزاز", "لمبات التحذير", "تسريب سوائل", "ضعف العزم", "أخرى"]
  },
  {
    id: 2,
    title: "من أين يصدر الصوت؟",
    options: ["المحرك (الأمام)", "أسفل السيارة", "الإطارات", "الفرامل", "غير متأكد"]
  },
  {
    id: 3,
    title: "متى تحدث المشكلة؟",
    options: ["عند التشغيل", "عند الفرملة", "عند السرعات العالية", "في المطبات", "دائماً"]
  }
];

export default function DiagnosisView() {
  const navigate = useNavigate();
  const { showNotification } = useNotifications();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [step]: option });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      analyze();
    }
  };

  const analyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        severity: "high",
        issue: "تآكل في فحمات الفرامل الأمامية",
        confidence: 92,
        estimatedCost: 340,
        parts: 240,
        labor: 100,
        recommendation: "يجب تغيير الفحمات فوراً لتجنب تلف الهوبات"
      });
      showNotification(
        "success",
        "تم اكتمال التشخيص",
        "تم تحديد المشكلة بنجاح. يمكنك الآن حجز موعد للصيانة."
      );
    }, 2500);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-32 h-32 mb-8">
          <motion.div 
            className="absolute inset-0 border-4 border-slate-100 rounded-full"
          />
          <motion.div 
            className="absolute inset-0 border-4 border-brand-blue rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/logo-placeholder.png" className="w-12 h-12 opacity-50" alt="" /> 
            {/* Using a placeholder or icon here */}
            <AlertTriangle className="w-10 h-10 text-brand-blue animate-pulse" />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">جاري تحليل الأعراض...</h2>
        <p className="text-slate-500">يقوم الذكاء الاصطناعي بمقارنة الأعراض مع قاعدة بيانات تضم +5000 عطل</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="p-6 pb-32 min-h-screen">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setResult(null)}>
            <ChevronRight className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">نتيجة التشخيص</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-red-50 border-red-100 mb-6 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge variant="danger" className="mb-2">عالي الخطورة</Badge>
                <h2 className="text-xl font-bold text-slate-900">{result.issue}</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertOctagon className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">{result.recommendation}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4" />
              <span>دقة التشخيص: {result.confidence}%</span>
            </div>
          </Card>

          <h3 className="font-bold text-lg mb-4">تفاصيل التكلفة التقديرية</h3>
          <Card className="mb-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">قطع الغيار (أصلي)</span>
                <span className="font-mono font-bold">{result.parts} ر.س</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">أجور اليد</span>
                <span className="font-mono font-bold">{result.labor} ر.س</span>
              </div>
              <div className="h-px bg-slate-100 my-2" />
              <div className="flex justify-between items-center">
                <span className="font-bold">الإجمالي التقريبي</span>
                <span className="text-xl font-black text-brand-blue">{result.estimatedCost} ر.س</span>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Button size="lg" className="w-full shadow-brand-blue/30" onClick={() => navigate('/bookings')}>
              حجز موعد صيانة
            </Button>
            <Button variant="outline" className="w-full">
              استشارة خبير (مكالمة فيديو)
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>خطوة {step + 1} من {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-blue"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex-1"
        >
          <h2 className="text-2xl font-bold mb-8 leading-relaxed">
            {questions[step].title}
          </h2>

          <div className="space-y-3">
            {questions[step].options.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionSelect(option)}
                className="w-full p-4 rounded-xl bg-white border border-slate-100 shadow-sm text-right hover:border-brand-blue hover:bg-blue-50 transition-all flex items-center justify-between group"
              >
                <span className="font-medium text-slate-700 group-hover:text-brand-blue">{option}</span>
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-brand-blue" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
