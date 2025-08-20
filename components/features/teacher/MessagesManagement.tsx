'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Reply, 
  Archive,
  Trash2,
  Star,
  User,
  Clock,
  Mail,
  Phone,
  BookOpen
} from 'lucide-react';

interface Message {
  id: string;
  from: {
    id: string;
    name: string;
    email: string;
    type: 'student' | 'parent' | 'teacher' | 'admin';
    avatar?: string;
  };
  to: {
    id: string;
    name: string;
    email: string;
    type: 'student' | 'parent' | 'teacher' | 'admin';
  };
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'academic' | 'behavioral' | 'administrative' | 'general';
  courseId?: string;
  courseName?: string;
  createdAt: string;
  readAt?: string;
  isStarred: boolean;
}

interface MessagesManagementProps {
  messages?: Message[];
  onMessageSend?: (message: Omit<Message, 'id' | 'createdAt' | 'readAt'>) => void;
  onMessageReply?: (messageId: string, reply: string) => void;
  onMessageArchive?: (messageId: string) => void;
  onMessageDelete?: (messageId: string) => void;
  onMessageStar?: (messageId: string) => void;
  onMessageMarkAsRead?: (messageId: string) => void;
}

export const MessagesManagement: React.FC<MessagesManagementProps> = ({
  messages = [
    {
      id: '1',
      from: {
        id: '1',
        name: 'María García',
        email: 'maria.garcia@email.com',
        type: 'student'
      },
      to: {
        id: 'teacher1',
        name: 'Prof. Rodríguez',
        email: 'prof.rodriguez@kaledacademy.com',
        type: 'teacher'
      },
      subject: 'Consulta sobre el tema de derivadas',
      content: 'Hola profesor, tengo una duda sobre el tema de derivadas que vimos en la última clase. ¿Podría explicarme mejor el concepto de derivada como límite?',
      status: 'unread',
      priority: 'medium',
      category: 'academic',
      courseId: '1',
      courseName: 'Matemáticas Avanzadas',
      createdAt: '2024-01-28T10:30:00Z',
      isStarred: false
    },
    {
      id: '2',
      from: {
        id: 'parent1',
        name: 'Sra. López',
        email: 'sra.lopez@email.com',
        type: 'parent'
      },
      to: {
        id: 'teacher1',
        name: 'Prof. Rodríguez',
        email: 'prof.rodriguez@kaledacademy.com',
        type: 'teacher'
      },
      subject: 'Progreso de Ana en Matemáticas',
      content: 'Buenos días profesor, me gustaría saber cómo va el progreso de mi hija Ana en la clase de matemáticas. ¿Está participando bien en clase?',
      status: 'read',
      priority: 'low',
      category: 'academic',
      courseId: '1',
      courseName: 'Matemáticas Avanzadas',
      createdAt: '2024-01-27T15:45:00Z',
      readAt: '2024-01-28T09:15:00Z',
      isStarred: true
    },
    {
      id: '3',
      from: {
        id: '2',
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        type: 'student'
      },
      to: {
        id: 'teacher1',
        name: 'Prof. Rodríguez',
        email: 'prof.rodriguez@kaledacademy.com',
        type: 'teacher'
      },
      subject: 'Problema con la tarea de física',
      content: 'Profesor, estoy teniendo problemas para resolver los ejercicios de la tarea de física. ¿Podría ayudarme con el ejercicio 3 del capítulo 5?',
      status: 'unread',
      priority: 'high',
      category: 'academic',
      courseId: '2',
      courseName: 'Física Básica',
      createdAt: '2024-01-28T08:20:00Z',
      isStarred: false
    },
    {
      id: '4',
      from: {
        id: 'admin1',
        name: 'Administración',
        email: 'admin@kaledacademy.com',
        type: 'admin'
      },
      to: {
        id: 'teacher1',
        name: 'Prof. Rodríguez',
        email: 'prof.rodriguez@kaledacademy.com',
        type: 'teacher'
      },
      subject: 'Reunión de profesores - Viernes 2 de Febrero',
      content: 'Estimado profesor, le recordamos que el próximo viernes 2 de febrero tendremos una reunión de profesores a las 3:00 PM en el salón de conferencias.',
      status: 'read',
      priority: 'medium',
      category: 'administrative',
      createdAt: '2024-01-26T14:00:00Z',
      readAt: '2024-01-26T16:30:00Z',
      isStarred: false
    }
  ],
  onMessageSend,
  onMessageReply,
  onMessageArchive,
  onMessageDelete,
  onMessageStar,
  onMessageMarkAsRead
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isMessageDetailOpen, setIsMessageDetailOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: '',
    toName: '',
    subject: '',
    content: '',
    priority: 'medium' as const,
    category: 'general' as const
  });
  const [replyContent, setReplyContent] = useState('');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleSendMessage = () => {
    if (onMessageSend) {
      onMessageSend({
        from: {
          id: 'teacher1',
          name: 'Prof. Rodríguez',
          email: 'prof.rodriguez@kaledacademy.com',
          type: 'teacher'
        },
        to: {
          id: newMessage.to,
          name: newMessage.toName,
          email: newMessage.to,
          type: 'student'
        },
        subject: newMessage.subject,
        content: newMessage.content,
        status: 'unread',
        priority: newMessage.priority,
        category: newMessage.category,
        isStarred: false
      });
    }
    setNewMessage({
      to: '',
      toName: '',
      subject: '',
      content: '',
      priority: 'medium',
      category: 'general'
    });
    setIsComposeDialogOpen(false);
  };

  const handleReply = () => {
    if (selectedMessage && onMessageReply) {
      onMessageReply(selectedMessage.id, replyContent);
    }
    setReplyContent('');
    setIsReplyDialogOpen(false);
    setSelectedMessage(null);
  };

  const openMessageDetail = (message: Message) => {
    setSelectedMessage(message);
    setIsMessageDetailOpen(true);
    if (message.status === 'unread' && onMessageMarkAsRead) {
      onMessageMarkAsRead(message.id);
    }
  };

  const openReplyDialog = (message: Message) => {
    setSelectedMessage(message);
    setIsReplyDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'behavioral':
        return 'bg-red-100 text-red-800';
      case 'administrative':
        return 'bg-purple-100 text-purple-800';
      case 'general':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return 'Ayer';
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mensajes</h1>
          <p className="text-gray-600 mt-1">Gestiona la comunicación con estudiantes y padres</p>
        </div>
        <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Nuevo Mensaje
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Componer Mensaje</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Para</label>
                <Input
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                  placeholder="Email del destinatario"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Asunto</label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Asunto del mensaje"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Mensaje</label>
                <Textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Escribe tu mensaje..."
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Prioridad</label>
                  <Select value={newMessage.priority} onValueChange={(value: any) => setNewMessage({ ...newMessage, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Categoría</label>
                  <Select value={newMessage.category} onValueChange={(value: any) => setNewMessage({ ...newMessage, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Académica</SelectItem>
                      <SelectItem value="behavioral">Conductual</SelectItem>
                      <SelectItem value="administrative">Administrativa</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar mensajes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Estado</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="unread">No leídos</SelectItem>
                  <SelectItem value="read">Leídos</SelectItem>
                  <SelectItem value="archived">Archivados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Prioridad</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Categoría</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="academic">Académica</SelectItem>
                  <SelectItem value="behavioral">Conductual</SelectItem>
                  <SelectItem value="administrative">Administrativa</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Bandeja de Entrada ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => openMessageDetail(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{message.from.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {message.from.type === 'student' ? 'Estudiante' : 
                           message.from.type === 'parent' ? 'Padre' : 
                           message.from.type === 'teacher' ? 'Profesor' : 'Admin'}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Badge className={getPriorityColor(message.priority)}>
                          {message.priority === 'urgent' ? 'Urgente' : 
                           message.priority === 'high' ? 'Alta' : 
                           message.priority === 'medium' ? 'Media' : 'Baja'}
                        </Badge>
                        <Badge className={getCategoryColor(message.category)}>
                          {message.category === 'academic' ? 'Académica' : 
                           message.category === 'behavioral' ? 'Conductual' : 
                           message.category === 'administrative' ? 'Administrativa' : 'General'}
                        </Badge>
                      </div>
                    </div>
                    <h3 className={`font-semibold mb-1 ${message.status === 'unread' ? 'text-blue-900' : 'text-gray-900'}`}>
                      {message.subject}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {message.content}
                    </p>
                    {message.courseName && (
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {message.courseName}
                      </div>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {message.isStarred && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMessageStar?.(message.id);
                      }}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openReplyDialog(message);
                      }}
                    >
                      <Reply className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMessageArchive?.(message.id);
                      }}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMessageDelete?.(message.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={isMessageDetailOpen} onOpenChange={setIsMessageDetailOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles del Mensaje</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(selectedMessage.priority)}>
                      {selectedMessage.priority === 'urgent' ? 'Urgente' : 
                       selectedMessage.priority === 'high' ? 'Alta' : 
                       selectedMessage.priority === 'medium' ? 'Media' : 'Baja'}
                    </Badge>
                    <Badge className={getCategoryColor(selectedMessage.category)}>
                      {selectedMessage.category === 'academic' ? 'Académica' : 
                       selectedMessage.category === 'behavioral' ? 'Conductual' : 
                       selectedMessage.category === 'administrative' ? 'Administrativa' : 'General'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    De: {selectedMessage.from.name} ({selectedMessage.from.email})
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                </div>
                {selectedMessage.courseName && (
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Curso: {selectedMessage.courseName}
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsMessageDetailOpen(false)}>
                  Cerrar
                </Button>
                <Button onClick={() => openReplyDialog(selectedMessage)}>
                  <Reply className="h-4 w-4 mr-2" />
                  Responder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Responder Mensaje</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Para</label>
                <p className="text-sm text-gray-600">{selectedMessage.from.name} ({selectedMessage.from.email})</p>
              </div>
              <div>
                <label className="text-sm font-medium">Asunto</label>
                <p className="text-sm text-gray-600">Re: {selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Mensaje Original</label>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 mb-3">
                  {selectedMessage.content}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Tu Respuesta</label>
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleReply}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Respuesta
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
