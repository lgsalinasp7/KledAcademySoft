"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Users, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight, 
  Phone,
  MessageCircle,
  Calendar,
  BookOpen,
  Code,
  Zap,
  DollarSign,
  Shield,
  Award,
  Globe,
  Wifi,
  GraduationCap,
  Database,
  GitBranch
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      "¡Hola! Estoy interesado en el Bootcamp de KaledAcademy. Me gustaría obtener más información sobre:\n\n" +
      "• Precios y formas de pago\n" +
      "• Horarios de clases\n" +
      "• Ubicación de clases presenciales\n" +
      "• Requisitos para inscribirme\n\n" +
      "¿Podrían ayudarme?"
    );
    window.open(`https://wa.me/573001234567?text=${message}`, '_blank');
  };

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se procesaría el lead
    handleWhatsAppRedirect();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">K</span>
              </div>
              <span className="text-white font-bold text-xl">KaledAcademy</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#cursos" className="text-gray-300 hover:text-white transition-colors">Cursos</a>
              <a href="#metodologia" className="text-gray-300 hover:text-white transition-colors">Metodología</a>
              <a href="#testimonios" className="text-gray-300 hover:text-white transition-colors">Testimonios</a>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a>
            </div>
            <Button 
              onClick={handleWhatsAppRedirect}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <MessageCircle size={16} />
              <span>Contactar</span>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Domina el Desarrollo Web
              <span className="block text-yellow-400">en Córdoba</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Únete al bootcamp más completo de desarrollo web en Córdoba. 
              Aprende con clases presenciales los sábados y online de lunes a viernes. 
              ¡Conviértete en desarrollador web profesional!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => setIsFormVisible(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center space-x-2"
              >
                <span>¡Inscríbete Ahora!</span>
                <ArrowRight size={20} />
              </Button>
              <Button 
                onClick={handleWhatsAppRedirect}
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Consulta por WhatsApp</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                <div className="text-gray-400">Estudiantes Graduados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
                <div className="text-gray-400">Tasa de Empleo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">6</div>
                <div className="text-gray-400">Meses de Duración</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-gray-400">Soporte</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-4">¡Únete a KaledAcademy!</h3>
            <p className="text-gray-400 mb-6">
              Completa tus datos y te contactaremos para resolver todas tus dudas sobre el bootcamp.
            </p>
            <form onSubmit={handleLeadCapture} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                required
              />
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                >
                  Enviar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormVisible(false)}
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Metodología */}
      <section id="metodologia" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Metodología Híbrida</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Combina lo mejor de las clases presenciales y online para maximizar tu aprendizaje
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Wifi className="text-white" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-white">Clases Online</CardTitle>
                    <CardDescription className="text-gray-400">Lunes a Viernes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Clases en vivo de 2 horas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Acceso a grabaciones 24/7</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Soporte en tiempo real</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Proyectos prácticos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-white">Clases Presenciales</CardTitle>
                    <CardDescription className="text-gray-400">Todos los Sábados</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Práctica intensiva</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Networking con compañeros</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Resolución de dudas directa</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>Proyectos en equipo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Tecnologías que Aprenderás</h2>
            <p className="text-xl text-gray-400">
              Stack completo para convertirte en desarrollador web profesional
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'HTML5 & CSS3', icon: Code, color: 'text-orange-400' },
              { name: 'JavaScript', icon: Code, color: 'text-yellow-400' },
              { name: 'React.js', icon: Zap, color: 'text-blue-400' },
              { name: 'Node.js', icon: Code, color: 'text-green-400' },
              { name: 'MongoDB', icon: Database, color: 'text-green-500' },
              { name: 'Git & GitHub', icon: GitBranch, color: 'text-gray-400' },
              { name: 'Deployment', icon: Globe, color: 'text-purple-400' },
              { name: 'APIs REST', icon: Zap, color: 'text-blue-500' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gray-800 flex items-center justify-center ${tech.color}`}>
                  <tech.icon size={32} />
                </div>
                <h3 className="text-white font-semibold">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">¿Por qué Elegir KaledAcademy?</h2>
            <p className="text-xl text-gray-400">
              Ventajas únicas que te harán destacar en el mercado laboral
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: MapPin,
                title: 'Local y Accesible',
                description: 'Clases presenciales en Córdoba, cerca de tu casa. Sin necesidad de viajar a otras ciudades.',
                color: 'text-blue-400'
              },
              {
                icon: GraduationCap,
                title: 'Certificación Oficial',
                description: 'Recibe un certificado reconocido por empresas locales y nacionales del sector tecnológico.',
                color: 'text-yellow-400'
              },
              {
                icon: Users,
                title: 'Comunidad Activa',
                description: 'Únete a una red de más de 500 desarrolladores en Córdoba. Networking real y oportunidades laborales.',
                color: 'text-green-400'
              },
              {
                icon: Shield,
                title: 'Garantía de Empleo',
                description: '95% de nuestros graduados consiguen empleo en los primeros 3 meses. Te ayudamos a encontrar trabajo.',
                color: 'text-purple-400'
              },
              {
                icon: Clock,
                title: 'Horarios Flexibles',
                description: 'Clases online de lunes a viernes y presenciales los sábados. Compatible con tu trabajo actual.',
                color: 'text-red-400'
              },
              {
                icon: Award,
                title: 'Proyectos Reales',
                description: 'Desarrolla proyectos reales para empresas locales. Construye un portafolio profesional.',
                color: 'text-orange-400'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gray-800 flex items-center justify-center ${benefit.color}`}>
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black mb-4">
              ¿Listo para Cambiar tu Futuro?
            </h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
              Únete a cientos de estudiantes que ya transformaron sus carreras con KaledAcademy. 
              ¡El momento es ahora!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppRedirect}
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>¡Consulta Ahora por WhatsApp!</span>
              </Button>
              <Button 
                onClick={() => setIsFormVisible(true)}
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold rounded-lg"
              >
                Solicitar Información
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">K</span>
                </div>
                <span className="text-white font-bold text-xl">KaledAcademy</span>
              </div>
              <p className="text-gray-400">
                La mejor academia de desarrollo web en Córdoba, Colombia.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-400">
                <p>📱 WhatsApp: +57 300 123 4567</p>
                <p>📧 Email: info@kaledacademy.com</p>
                <p>📍 Córdoba, Colombia</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Horarios</h3>
              <div className="space-y-2 text-gray-400">
                <p>🖥️ Online: Lunes - Viernes</p>
                <p>👥 Presencial: Sábados</p>
                <p>⏰ 9:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">WhatsApp</span>
                  💬
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KaledAcademy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
