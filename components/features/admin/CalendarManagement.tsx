"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, BookOpen, Plus, Edit, Trash2, Bell, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface CalendarManagementProps {
  user: User;
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  type: 'live-session' | 'deadline' | 'assignment' | 'meeting' | 'exam';
  participants: string[];
  courseId?: string;
  cohortId?: string;
  location?: string;
  isRecurring: boolean;
  recurrence?: 'daily' | 'weekly' | 'monthly';
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Inicio Cohorte FS-Mar25',
    description: 'Sesión de bienvenida y presentación del curso',
    date: '2025-03-01',
    time: '19:00',
    duration: 180,
    type: 'live-session',
    participants: ['3', '4'],
    courseId: '1',
    cohortId: '3',
    location: 'Aula Virtual - Zoom',
    isRecurring: false
  },
  {
    id: '2',
    title: 'Checkpoint M1 - Data Science',
    description: 'Evaluación del módulo 1 de Data Science',
    date: '2025-01-20',
    time: '20:00',
    duration: 120,
    type: 'exam',
    participants: [],
    courseId: '2',
    location: 'Plataforma Online',
    isRecurring: false
  },
  {
    id: '3',
    title: 'Reunión de Profesores',
    description: 'Reunión semanal para coordinar actividades',
    date: '2025-01-18',
    time: '15:00',
    duration: 60,
    type: 'meeting',
    participants: ['3', '4'],
    location: 'Sala de Conferencias',
    isRecurring: true,
    recurrence: 'weekly'
  },
  {
    id: '4',
    title: 'Demo Day UX/UI',
    description: 'Presentación de proyectos finales',
    date: '2025-01-25',
    time: '18:00',
    duration: 240,
    type: 'live-session',
    participants: [],
    courseId: '3',
    location: 'Auditorio Principal',
    isRecurring: false
  }
];

export function CalendarManagement({ user }: CalendarManagementProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [activeTab, setActiveTab] = useState('calendar');
  const [showAddEvent, setShowAddEvent] = useState(false);

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'live-session': return 'bg-blue-500';
      case 'deadline': return 'bg-red-500';
      case 'assignment': return 'bg-yellow-500';
      case 'meeting': return 'bg-purple-500';
      case 'exam': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeLabel = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'live-session': return 'Sesión en Vivo';
      case 'deadline': return 'Fecha Límite';
      case 'assignment': return 'Tarea';
      case 'meeting': return 'Reunión';
      case 'exam': return 'Examen';
      default: return 'Evento';
    }
  };

  const formatTime = (time: string, duration: number) => {
    const startTime = time;
    const endTime = new Date(`2000-01-01T${time}`);
    endTime.setMinutes(endTime.getMinutes() + duration);
    return `${startTime} - ${endTime.toTimeString().slice(0, 5)}`;
  };

  const getEventsByDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="flex-1 bg-black p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Calendario Académico
              </h1>
              <p className="text-gray-400 text-lg">
                Gestiona eventos, clases, evaluaciones y fechas importantes
              </p>
            </div>
            <Button 
              onClick={() => setShowAddEvent(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Evento
            </Button>
          </div>
        </motion.div>

        {/* Calendar Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-700">
              <TabsTrigger value="calendar" className="text-white">Calendario</TabsTrigger>
              <TabsTrigger value="events" className="text-white">Eventos</TabsTrigger>
              <TabsTrigger value="schedule" className="text-white">Horarios</TabsTrigger>
            </TabsList>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-400" />
                        Vista de Calendario
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Enero 2025
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                          <div key={day} className="text-center text-gray-400 text-sm font-medium p-2">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, i) => {
                          const date = `2025-01-${String(i + 1).padStart(2, '0')}`;
                          const dayEvents = getEventsByDate(date);
                          const isToday = date === selectedDate;
                          
                          return (
                            <div
                              key={i}
                              className={`min-h-20 p-1 border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors ${
                                isToday ? 'bg-blue-600' : 'bg-gray-800'
                              }`}
                              onClick={() => setSelectedDate(date)}
                            >
                              <div className={`text-sm font-medium ${
                                isToday ? 'text-white' : 'text-gray-300'
                              }`}>
                                {i + 1}
                              </div>
                              {dayEvents.map(event => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded mt-1 truncate ${
                                    getEventTypeColor(event.type)
                                  } text-white`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Events for Selected Date */}
                <div>
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-400" />
                        Eventos del {new Date(selectedDate).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getEventsByDate(selectedDate).length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No hay eventos programados</p>
                      ) : (
                        <div className="space-y-3">
                          {getEventsByDate(selectedDate).map(event => (
                            <div key={event.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-white font-medium text-sm">{event.title}</h4>
                                  <p className="text-gray-400 text-xs mt-1">{event.description}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Clock className="h-3 w-3 text-gray-400" />
                                    <span className="text-gray-400 text-xs">
                                      {formatTime(event.time, event.duration)}
                                    </span>
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <MapPin className="h-3 w-3 text-gray-400" />
                                      <span className="text-gray-400 text-xs">{event.location}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs border-${getEventTypeColor(event.type).replace('bg-', '')} text-white`}
                                  >
                                    {getEventTypeLabel(event.type)}
                                  </Badge>
                                  {event.isRecurring && (
                                    <Badge variant="outline" className="text-xs border-purple-500 text-purple-400">
                                      Recurrente
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-400" />
                    Todos los Eventos
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Gestiona todos los eventos del calendario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                          <div>
                            <h4 className="text-white font-medium">{event.title}</h4>
                            <p className="text-gray-400 text-sm">{event.description}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-gray-400 text-xs">{event.date}</span>
                              <span className="text-gray-400 text-xs">{event.time}</span>
                              {event.location && (
                                <span className="text-gray-400 text-xs">{event.location}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {getEventTypeLabel(event.type)}
                          </Badge>
                          <Button size="sm" variant="outline" className="border-gray-600 text-white">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      Próximos Eventos
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Eventos programados para las próximas semanas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`} />
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm">{event.title}</h4>
                            <p className="text-gray-400 text-xs">{event.date} - {event.time}</p>
                          </div>
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Plus className="h-5 w-5 text-blue-400" />
                      Acciones Rápidas
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Crear eventos comunes rápidamente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: 'Nueva Clase', icon: BookOpen, type: 'live-session' },
                        { title: 'Nueva Evaluación', icon: Clock, type: 'exam' },
                        { title: 'Nueva Reunión', icon: Users, type: 'meeting' },
                        { title: 'Nueva Tarea', icon: Calendar, type: 'assignment' }
                      ].map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start border-gray-600 text-white hover:bg-gray-800"
                        >
                          <action.icon className="h-4 w-4 mr-2" />
                          {action.title}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
