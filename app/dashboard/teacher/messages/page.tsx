'use client';

import React from 'react';
import { MessagesManagement } from '@/components/features/teacher/MessagesManagement';

export default function TeacherMessagesPage() {
  const handleMessageSend = (message: any) => {
    console.log('Enviar mensaje:', message);
    // Aquí se implementaría la lógica para enviar el mensaje
  };

  const handleMessageReply = (messageId: string, reply: string) => {
    console.log('Responder mensaje:', messageId, reply);
    // Aquí se implementaría la lógica para responder el mensaje
  };

  const handleMessageArchive = (messageId: string) => {
    console.log('Archivar mensaje:', messageId);
    // Aquí se implementaría la lógica para archivar el mensaje
  };

  const handleMessageDelete = (messageId: string) => {
    console.log('Eliminar mensaje:', messageId);
    // Aquí se implementaría la lógica para eliminar el mensaje
  };

  const handleMessageStar = (messageId: string) => {
    console.log('Marcar como favorito:', messageId);
    // Aquí se implementaría la lógica para marcar como favorito
  };

  const handleMessageMarkAsRead = (messageId: string) => {
    console.log('Marcar como leído:', messageId);
    // Aquí se implementaría la lógica para marcar como leído
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <MessagesManagement
        onMessageSend={handleMessageSend}
        onMessageReply={handleMessageReply}
        onMessageArchive={handleMessageArchive}
        onMessageDelete={handleMessageDelete}
        onMessageStar={handleMessageStar}
        onMessageMarkAsRead={handleMessageMarkAsRead}
      />
    </div>
  );
}
