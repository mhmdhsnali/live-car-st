import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Send, X, Bot, Image as ImageIcon, MapPin, Loader2, Volume2, Sparkles, Video } from "lucide-react";
import { Button, Input, Card } from "@/components/ui-primitives";
import { geminiService } from "@/services/gemini";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  type?: 'text' | 'image' | 'map' | 'audio';
  data?: any;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'مرحباً! أنا مساعد Live Car الذكي. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Check for special triggers (simple heuristic for demo)
      let responseText = "";
      let responseType: Message['type'] = 'text';
      let responseData = null;

      if (input.includes("ورش") || input.includes("مكان") || input.includes("map")) {
        // Maps Grounding
        const location = { lat: 21.543333, lng: 39.172778 }; // Jeddah
        const result = await geminiService.findWorkshops(location, input);
        responseText = result.text;
        responseType = 'map';
        responseData = result.maps;
      } else if (input.includes("بحث") || input.includes("search")) {
        // Search Grounding
        const result = await geminiService.search(input);
        responseText = result.text;
      } else {
        // General Chat
        responseText = await geminiService.chat(input);
      }

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        text: responseText,
        type: responseType,
        data: responseData
      };
      setMessages(prev => [...prev, aiMsg]);
      
      // Auto-play TTS for short responses if in voice mode (simulated)
      if (mode === 'voice') {
        const audioData = await geminiService.speak(responseText.substring(0, 200)); // Limit length
        if (audioData) {
          const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
          audio.play();
        }
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', text: 'عذراً، حدث خطأ في الاتصال.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        className="fixed bottom-24 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-brand-blue to-brand-orange shadow-lg flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={() => setIsOpen(false)} />
            
            <Card className="w-full max-w-md h-[600px] flex flex-col pointer-events-auto shadow-2xl border-0 overflow-hidden bg-white dark:bg-slate-900 relative">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-brand-blue to-blue-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold">مساعد Live Car</h3>
                    <p className="text-xs text-blue-100">مدعوم بواسطة Gemini 2.5 & 3.0</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex w-full",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-2xl text-sm",
                        msg.role === 'user'
                          ? "bg-brand-blue text-white rounded-br-none"
                          : "bg-white text-slate-800 shadow-sm rounded-bl-none border border-slate-100"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      
                      {/* Map Data Rendering */}
                      {msg.type === 'map' && msg.data && (
                        <div className="mt-3 space-y-2">
                          {msg.data.map((chunk: any, i: number) => {
                            if (!chunk.maps) return null;
                            return (
                              <div key={i} className="bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                                <p className="font-bold text-brand-blue">{chunk.maps.title}</p>
                                <p className="text-slate-500 truncate">{chunk.maps.address}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                      <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    variant={mode === 'voice' ? 'secondary' : 'ghost'}
                    onClick={() => setMode(mode === 'chat' ? 'voice' : 'chat')}
                    className={mode === 'voice' ? "animate-pulse" : ""}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                {mode === 'voice' && (
                  <div className="mt-2 text-center text-xs text-brand-orange animate-pulse">
                    جاري الاستماع... (Live API Demo)
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
