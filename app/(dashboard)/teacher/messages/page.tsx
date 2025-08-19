'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
  MessageSquare, 
  Search, 
  Plus,
  Send,
  User,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function TeacherMessages() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('inbox');

  // Datos mock de mensajes
  const messages = [
    {
      id: 1,
      from: 'Laura Martínez',
      fromEmail: 'laura.martinez@email.com',
      subject: 'Duda sobre el proyecto React',
      content: 'Hola profesor, tengo una duda sobre el proyecto final de React. ¿Podríamos agendar una sesión?',
      timestamp: '2024-01-20T10:30:00',
      status: 'unread',
      type: 'student'
    },
    {
      id: 2,
      from: 'Juan Pérez',
      fromEmail: 'juan.perez@email.com',
      subject: 'Entrega de tarea JavaScript',
      content: 'He completado la tarea del módulo 2. ¿Podría revisarla cuando tenga tiempo?',
      timestamp: '2024-01-20T09:15:00',
      status: 'read',
      type: 'student'
    },
    {
      id: 3,
      from: 'María González',
      fromEmail: 'maria.gonzalez@email.com',
      subject: 'Problema con la instalación de Node.js',
      content: 'No puedo instalar Node.js en mi computadora. ¿Me puede ayudar?',
      timestamp: '2024-01-19T16:45:00',
      status: 'read',
      type: 'student'
    },
    {
      id: 4,
      from: 'Carlos Rodríguez',
      fromEmail: 'carlos.rodriguez@email.com',
      subject: 'Feedback sobre mi evaluación',
      content: 'Gracias por la retroalimentación. He corregido los errores que mencionó.',
      timestamp: '2024-01-19T14:20:00',
      status: 'read',
      type: 'student'
    },
    {
      id: 5,
      from: 'Ana Silva',
      fromEmail: 'ana.silva@email.com',
      subject: 'Consulta sobre el próximo módulo',
      content: '¿Cuándo comenzaremos con el módulo de bases de datos?',
      timestamp: '2024-01-19T11:30:00',
      status: 'unread',
      type: 'student'
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'unread' && message.status === 'unread') ||
                      (selectedTab === 'read' && message.status === 'read');
    return matchesSearch && matchesTab;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return 'Ayer';
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mensajes
            </h1>
            <p className="text-gray-600">
              Comunícate con tus estudiantes y administra mensajes
            </p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => router.push('/teacher/messages/new')}
          >
            <Plus className="h-4 w-4" />
            Nuevo Mensaje
          </Button>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar mensajes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedTab === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTab('all')}
          >
            Todos ({messages.length})
          </Button>
          <Button
            variant={selectedTab === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTab('unread')}
          >
            No leídos ({unreadCount})
          </Button>
          <Button
            variant={selectedTab === 'read' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTab('read')}
          >
            Leídos ({messages.length - unreadCount})
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Mensajes</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No Leídos</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leídos</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length - unreadCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(messages.map(m => m.fromEmail)).size}
                </p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Bandeja de Entrada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                }`}
                onClick={() => router.push(`/teacher/messages/${message.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{message.from}</p>
                          {message.status === 'unread' && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Nuevo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{message.fromEmail}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</p>
                      </div>
                    </div>
                    
                    <div className="ml-11">
                      <h3 className="font-medium text-gray-900 mb-1">{message.subject}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3 ml-11">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/teacher/messages/${message.id}/reply`);
                    }}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Responder
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/teacher/messages/${message.id}`);
                    }}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron mensajes
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay mensajes en esta categoría'}
              </p>
              {!searchTerm && (
                <Button onClick={() => router.push('/teacher/messages/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Enviar Primer Mensaje
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
