"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotifications } from '@/stores/uiStore';

const notificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

const notificationColors = {
  success: 'bg-green-500 border-green-400 text-green-100',
  error: 'bg-red-500 border-red-400 text-red-100',
  warning: 'bg-yellow-500 border-yellow-400 text-yellow-100',
  info: 'bg-blue-500 border-blue-400 text-blue-100'
};

export function Notifications() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = notificationIcons[notification.type];
          const colors = notificationColors[notification.type];

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`${colors} border rounded-lg p-4 shadow-lg max-w-sm`}
            >
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-current hover:opacity-70 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
