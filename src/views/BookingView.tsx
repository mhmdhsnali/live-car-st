import { motion } from "motion/react";
import { MapPin, Star, Navigation, Clock, ChevronRight } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui-primitives";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/components/NotificationSystem";

const workshops = [
  {
    id: 1,
    name: "مركز الخبراء المعتمد",
    rating: 4.8,
    reviews: 124,
    distance: "1.2 كم",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500&auto=format&fit=crop&q=60",
    specialty: "تويوتا، لكزس",
    price: "متوسط"
  },
  {
    id: 2,
    name: "ورشة السرعة القصوى",
    rating: 4.5,
    reviews: 89,
    distance: "3.5 كم",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60",
    specialty: "عام",
    price: "اقتصادي"
  },
  {
    id: 3,
    name: "ماستر كار للصيانة",
    rating: 4.9,
    reviews: 210,
    distance: "5.0 كم",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500&auto=format&fit=crop&q=60",
    specialty: "ألماني، أوروبي",
    price: "مرتفع"
  }
];

export default function BookingView() {
  const navigate = useNavigate();
  const { showNotification } = useNotifications();

  const handleBook = (workshopName: string) => {
    showNotification(
      "success",
      "تم تأكيد الحجز!",
      `تم حجز موعدك في ${workshopName} بنجاح. سنقوم بتذكيرك قبل الموعد بساعة.`
    );
    // Simulate navigation to bookings list or home
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Map Header Mockup */}
      <div className="h-64 relative bg-slate-200 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-60 grayscale"
          alt="Map"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50" />
        
        <div className="absolute top-6 right-6 left-6 flex items-center justify-between z-10">
          <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur rounded-full" onClick={() => navigate(-1)}>
            <ChevronRight className="w-6 h-6" />
          </Button>
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-blue" />
            <span className="text-sm font-medium">جدة، حي الروضة</span>
          </div>
        </div>

        {/* Map Pins Mockup */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-brand-blue rounded-full border-2 border-white shadow-lg animate-bounce" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black/20 rounded-full blur-[1px]" />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-10 relative z-10 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">الورش القريبة منك</h2>
          <Button variant="ghost" size="sm" className="text-brand-blue">تصفية</Button>
        </div>

        <div className="space-y-4">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-0 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex h-32">
                  <div className="w-32 relative">
                    <img src={workshop.image} className="w-full h-full object-cover" alt={workshop.name} />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {workshop.rating}
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 line-clamp-1">{workshop.name}</h3>
                        <Badge variant="default" className="bg-slate-100 text-[10px]">{workshop.price}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{workshop.specialty}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Navigation className="w-3 h-3" />
                        <span>{workshop.distance}</span>
                      </div>
                      <Button size="sm" className="h-8 px-4 rounded-lg" onClick={() => handleBook(workshop.name)}>
                        حجز
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
