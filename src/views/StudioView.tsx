import { useState } from "react";
import { motion } from "motion/react";
import { Image as ImageIcon, Video, Wand2, Download, Share2, Loader2, Play } from "lucide-react";
import { Button, Card, Input } from "@/components/ui-primitives";
import { geminiService } from "@/services/gemini";
import { useNotifications } from "@/components/NotificationSystem";

export default function StudioView() {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { showNotification } = useNotifications();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResultUrl(null);
    
    try {
      if (activeTab === 'image') {
        const url = await geminiService.generateCarImage(prompt, "16:9");
        if (url) {
          setResultUrl(url);
          showNotification("success", "تم إنشاء الصورة", "تم إنشاء صورة سيارتك بنجاح!");
        } else {
          showNotification("error", "فشل الإنشاء", "لم نتمكن من إنشاء الصورة. حاول مرة أخرى.");
        }
      } else {
        // Video generation (Veo)
        // Note: This might take time and requires a paid key usually, but we implemented the service wrapper
        try {
            const url = await geminiService.generateCarVideo(prompt);
            if (url) {
                // In a real app we would fetch the video blob, but here we might get a URI
                // For demo purposes, if the service returns a URI we use it, otherwise we might need to handle the download
                setResultUrl(url); 
                showNotification("success", "تم إنشاء الفيديو", "تم إنشاء الفيديو بنجاح!");
            }
        } catch (e) {
             // Fallback for demo if Veo fails or takes too long in this environment
             showNotification("warning", "محاكاة الفيديو", "جاري عرض فيديو توضيحي (Veo يتطلب وقتاً طويلاً)");
             setResultUrl("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"); // Placeholder
        }
      }
    } catch (error) {
      console.error(error);
      showNotification("error", "خطأ", "حدث خطأ أثناء المعالجة");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 min-h-screen pb-32">
      <h1 className="text-2xl font-black mb-2">استوديو Live Car</h1>
      <p className="text-slate-500 mb-6">صمم، عدل، وأنشئ محتوى بصري لسيارتك باستخدام الذكاء الاصطناعي.</p>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('image')}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'image' ? "bg-white shadow text-brand-blue" : "text-slate-500"
          )}
        >
          <ImageIcon className="w-4 h-4" />
          توليد صور
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'video' ? "bg-white shadow text-brand-orange" : "text-slate-500"
          )}
        >
          <Video className="w-4 h-4" />
          توليد فيديو (Veo)
        </button>
      </div>

      {/* Input Area */}
      <Card className="mb-8 overflow-visible">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {activeTab === 'image' ? 'وصف الصورة' : 'وصف الفيديو'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={activeTab === 'image' 
                ? "مثال: سيارة تويوتا كامري 2024 لون أحمر في الصحراء وقت الغروب، إضاءة سينمائية" 
                : "مثال: فيديو لسيارة رياضية تنطلق بسرعة على طريق ساحلي، تصوير درون"}
              className="w-full h-32 rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className={cn(
              "w-full h-12 text-lg shadow-lg",
              activeTab === 'image' ? "bg-brand-blue" : "bg-brand-orange"
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin ml-2" />
                جاري المعالجة...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 ml-2" />
                {activeTab === 'image' ? 'توليد الصورة' : 'إنشاء الفيديو'}
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Result Area */}
      {resultUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-bold text-lg mb-4">النتيجة</h3>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 relative group">
            {activeTab === 'image' ? (
              <img src={resultUrl} alt="Generated" className="w-full h-auto" />
            ) : (
              <video src={resultUrl} controls className="w-full h-auto" poster="https://via.placeholder.com/1280x720?text=Video+Preview" />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur">
                <Download className="w-4 h-4 ml-2" />
                حفظ
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur">
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
