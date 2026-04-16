import { motion } from "motion/react";
import { ShoppingBag, Tag, Search, Filter, Star, Plus } from "lucide-react";
import { Button, Card, Input, Badge } from "@/components/ui-primitives";
import { useNotifications } from "@/components/NotificationSystem";

const products = [
  {
    id: 1,
    name: "زيت محرك تويوتا الأصلي 5W-40",
    price: "45 ر.س",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1599256621730-535171e28e50?w=500&auto=format&fit=crop&q=60",
    category: "زيوت وسوائل",
    discount: "10%"
  },
  {
    id: 2,
    name: "فحمات فرامل أمامية - كامري",
    price: "280 ر.س",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&auto=format&fit=crop&q=60",
    category: "فرامل",
    discount: null
  },
  {
    id: 3,
    name: "فلتر هواء رياضي K&N",
    price: "150 ر.س",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1626125345510-4703ee9238b2?w=500&auto=format&fit=crop&q=60",
    category: "فلاتر",
    discount: "15%"
  },
  {
    id: 4,
    name: "طقم مساحات زجاج",
    price: "85 ر.س",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1605218427306-6354db696fc3?w=500&auto=format&fit=crop&q=60",
    category: "اكسسوارات",
    discount: null
  }
];

export default function MarketView() {
  const { showNotification } = useNotifications();

  const handleAddToCart = (productName: string) => {
    showNotification(
      "success",
      "تمت الإضافة للسلة",
      `تم إضافة ${productName} إلى سلة المشتريات بنجاح.`
    );
  };

  return (
    <div className="p-6 space-y-6 min-h-screen pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">سوق قطع الغيار</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">عروض حصرية لسيارتك</p>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="w-6 h-6 text-slate-900 dark:text-white" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-brand-orange text-[10px] text-white rounded-full flex items-center justify-center">2</span>
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="ابحث عن قطعة..." className="pr-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
        </div>
        <Button variant="outline" size="icon" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["الكل", "زيوت", "فرامل", "إطارات", "بطاريات", "اكسسوارات"].map((cat, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0 
                ? "bg-brand-blue text-white" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-0 overflow-hidden h-full flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="relative h-32 bg-slate-100 dark:bg-slate-800">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.discount && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0">
                    {product.discount}
                  </Badge>
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-slate-500">{product.rating}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 mb-2 flex-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-brand-blue">{product.price}</span>
                  <Button 
                    size="icon" 
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-brand-blue hover:text-white text-slate-900 dark:text-white transition-colors"
                    onClick={() => handleAddToCart(product.name)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
