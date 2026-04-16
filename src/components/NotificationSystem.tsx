import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, Bell, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, title: string, message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: Bell,
  info: Info,
};

const colors = {
  success: "bg-green-500/10 border-green-500/20 text-green-600",
  error: "bg-red-500/10 border-red-500/20 text-red-600",
  warning: "bg-brand-orange/10 border-brand-orange/20 text-brand-orange",
  info: "bg-brand-blue/10 border-brand-blue/20 text-brand-blue",
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((type: NotificationType, title: string, message: string, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    // Trigger In-App Notification
    setNotifications((prev) => [...prev, { id, type, title, message, duration }]);

    // Trigger Native Notification (Push)
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, { body: message, icon: "/vite.svg" }); // Use a default icon for now
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, { body: message, icon: "/vite.svg" });
          }
        });
      }
    }

    // Auto dismiss
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-4 left-4 right-4 z-50 flex flex-col gap-2 pointer-events-none sm:max-w-sm sm:left-auto">
        <AnimatePresence>
          {notifications.map((notification) => {
            const Icon = icons[notification.type];
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                layout
                className={cn(
                  "pointer-events-auto relative w-full overflow-hidden rounded-2xl border p-4 shadow-lg backdrop-blur-xl transition-all",
                  "bg-white/80 dark:bg-slate-900/80", // Glass effect
                  colors[notification.type]
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("rounded-full p-1", colors[notification.type].replace("text-", "bg-").replace("/10", "/20"))}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{notification.title}</h3>
                    <p className="text-xs opacity-90 mt-1 leading-relaxed">{notification.message}</p>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Progress bar animation */}
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: notification.duration ? notification.duration / 1000 : 5, ease: "linear" }}
                  className={cn("absolute bottom-0 left-0 h-1 opacity-30", colors[notification.type].replace("text-", "bg-").replace("/10", ""))}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
