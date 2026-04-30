import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Tag, Search, Filter, Star, Plus, Check } from "lucide-react";
import { Button, Card, Input, Badge } from "@/components/ui-primitives";
import { useNotifications } from "@/components/NotificationSystem";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "زيت محرك تويوتا الأصلي 5W-40",
    price: "45 ر.س",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600045550278-cb75b1d44fd2?w=500&auto=format&fit=crop&q=60",
    category: "زيوت",
    discount: "10%"
  },
  {
    id: 2,
    name: "فحمات فرامل أمامية - كامري",
    price: "280 ر.س",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1628186178300-84cf959cfd22?w=500&auto=format&fit=crop&q=60",
    category: "فرامل",
    discount: null
  },
  {
    id: 3,
    name: "فلتر هواء رياضي K&N",
    price: "150 ر.س",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=500&auto=format&fit=crop&q=60",
    category: "فلاتر",
    discount: "15%"
  },
  {
    id: 4,
    name: "طقم مساحات زجاج",
    price: "85 ر.س",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1518331393661-1e967a53c9e6?w=500&auto=format&fit=crop&q=60",
    category: "اكسسوارات",
    discount: null
  }
];

const featuredProducts = [
  {
    id: 101,
    title: "عروض الصيف",
    description: "خصم 20% على إطارات ميشلان",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=60",
    badge: "تخفيضات"
  },
  {
    id: 102,
    title: "باقة العناية الشاملة",
    description: "تغيير زيت + فحص مجاني لـ 10 نقاط",
    image: "https://images.unsplash.com/photo-1632823462943-26f0b2f5674c?w=800&auto=format&fit=crop&q=60",
    badge: "الأكثر طلباً"
  }
];

const categoriesList = ["الكل", "زيوت", "فرامل", "إطارات", "فلاتر", "اكسسوارات"];

export default function MarketView() {
  const { showNotification } = useNotifications();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === "الكل" || p.category === activeCategory;
    const matchesSearch = p.name.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    if (addedItems.includes(product.id)) return;
    setAddedItems(prev => [...prev, product.id]);
    showNotification(
      "success",
      "تمت الإضافة للسلة",
      `تم إضافة ${product.name} إلى سلة المشتريات بنجاح.`
    );
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== product.id));
    }, 2000);
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
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن قطعة..." 
            className="pr-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" 
          />
        </div>
        <Button variant="outline" size="icon" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Featured Products Carousel */}
      <div className="-mx-6 md:-mx-8 px-6 md:px-8 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 md:gap-6 w-max">
          {featuredProducts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-[85vw] sm:w-[320px] md:w-[480px] snap-center relative rounded-3xl overflow-hidden aspect-[2/1] md:aspect-[21/9] shadow-lg flex-shrink-0 group cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 md:p-8 flex flex-col justify-end">
                <Badge className="absolute top-4 right-4 bg-brand-orange text-white border-0 px-3 py-1">{item.badge}</Badge>
                <h3 className="text-white font-black text-xl md:text-3xl mb-1 md:mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm md:text-base mb-4 md:mb-6">{item.description}</p>
                <Button size="sm" className="w-fit bg-brand-blue border-0 shadow-lg shadow-brand-blue/30 text-white hover:bg-blue-600 px-6 py-4 md:py-5 rounded-full text-sm md:text-base font-bold">
                  تصفح العرض
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide py-2">
        {categoriesList.map((cat, i) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-bold whitespace-nowrap transition-colors hover:shadow-md ${
                isActive 
                  ? "bg-brand-blue text-white shadow-brand-blue/30 shadow-lg" 
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-0 overflow-hidden h-full flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 group">
              <div className="relative h-40 md:h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {product.discount && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0 shadow-lg font-bold">
                    {product.discount}
                  </Badge>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{product.rating}</span>
                </div>
                <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white line-clamp-2 mb-4 flex-1 leading-relaxed">
                  {product.name}
                </h3>
                <div className="flex flex-col gap-3 mt-auto pt-2">
                  <span className="font-black text-brand-blue text-lg">{product.price}</span>
                  <Button 
                    size="sm" 
                    className={`w-full rounded-xl text-white transition-all shadow-sm h-10 gap-2 font-bold overflow-hidden relative ${
                      addedItems.includes(product.id) 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-slate-900 dark:bg-brand-blue hover:bg-slate-800 dark:hover:bg-blue-600'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {addedItems.includes(product.id) ? (
                        <motion.div
                          key="checked"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          تمت الإضافة
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          أضف للسلة
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            لا توجد منتجات تطابق بحثك
          </div>
        )}
      </div>
    </div>
  );
}
