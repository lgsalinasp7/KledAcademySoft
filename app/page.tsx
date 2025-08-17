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
  GitBranch,
  Sparkles,
  Target,
  Rocket,
  Brain,
  Lightbulb,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';

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
      <header className="relative z-10 backdrop-blur-sm bg-black/20 border-b border-white/10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
                         <div className="hidden md:flex items-center space-x-8">
               <a href="#cursos" className="text-gray-300 hover:text-white transition-colors font-medium">Cursos</a>
               <a href="#metodologia" className="text-gray-300 hover:text-white transition-colors font-medium">Metodología</a>
               <a href="#beneficios" className="text-gray-300 hover:text-white transition-colors font-medium">Beneficios</a>
               <a href="#contacto" className="text-gray-300 hover:text-white transition-colors font-medium">Contacto</a>
             </div>
                                                   <Button 
                onClick={handleWhatsAppRedirect}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl flex items-center space-x-2 shadow-lg shadow-green-500/25"
              >
                <MessageCircle size={16} />
                <span>Contactar</span>
              </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <Sparkles size={16} />
              <span>Bootcamp más completo de Córdoba</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                Domina
              </span>
              <span className="block text-white">el Desarrollo Web</span>
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                en Córdoba
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Únete al bootcamp más completo de desarrollo web en Córdoba. 
              Aprende con clases presenciales los sábados y online de lunes a viernes. 
              ¡Conviértete en desarrollador web profesional!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                onClick={() => setIsFormVisible(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 text-lg font-bold rounded-xl flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/25 transform hover:scale-105 transition-all duration-200"
              >
                <Rocket size={20} />
                <span>¡Inscríbete Ahora!</span>
                <ArrowRight size={20} />
              </Button>
                                                           <Button 
                  onClick={handleWhatsAppRedirect}
                  className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 text-lg font-semibold rounded-xl flex items-center justify-center space-x-3 shadow-lg shadow-green-500/25"
                >
                  <MessageCircle size={20} />
                  <span>Consulta por WhatsApp</span>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: '500+', label: 'Estudiantes Graduados', icon: Users },
                { number: '95%', label: 'Tasa de Empleo', icon: Target },
                { number: '6', label: 'Meses de Duración', icon: Clock },
                { number: '24/7', label: 'Soporte', icon: Shield }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <stat.icon className="text-blue-400" size={28} />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-900 to-purple-900/50 rounded-2xl p-8 max-w-md w-full border border-blue-500/30 backdrop-blur-sm"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Rocket className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Únete a KaledAcademy!</h3>
              <p className="text-gray-400">
                Completa tus datos y te contactaremos para resolver todas tus dudas sobre el bootcamp.
              </p>
            </div>
            <form onSubmit={handleLeadCapture} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                required
              />
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-xl"
                >
                  Enviar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormVisible(false)}
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 rounded-xl"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Metodología */}
      <section id="metodologia" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain size={16} />
              <span>Metodología Innovadora</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Metodología
              </span>
              <span className="text-white"> Híbrida</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Combina lo mejor de las clases presenciales y online para maximizar tu aprendizaje
            </p>
          </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="group"
             >
               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-blue-700/30 to-purple-600/20 border border-blue-400/40 backdrop-blur-sm hover:border-blue-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                 {/* Background Glow Effect */}
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 
                 <div className="relative p-8">
                   <div className="flex items-center space-x-6 mb-8">
                     <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                       <Wifi className="text-white" size={32} />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-white mb-2">Clases Online</h3>
                       <p className="text-blue-200 font-medium">Lunes a Viernes</p>
                     </div>
                   </div>
                   
                   <div className="space-y-6">
                     {[
                       'Clases en vivo de 2 horas',
                       'Acceso a grabaciones 24/7',
                       'Soporte en tiempo real',
                       'Proyectos prácticos'
                     ].map((item, index) => (
                       <div key={index} className="flex items-center space-x-4 group/item">
                         <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-200">
                           <CheckCircle className="text-white" size={16} />
                         </div>
                         <span className="text-white font-medium text-lg">{item}</span>
                       </div>
                     ))}
                   </div>
                   
                   {/* Bottom accent */}
                   <div className="mt-8 pt-6 border-t border-blue-400/30">
                     <div className="flex items-center justify-between">
                       <span className="text-blue-200 font-semibold">Horario Flexible</span>
                       <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="group"
             >
               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/20 via-orange-600/30 to-red-500/20 border border-yellow-400/40 backdrop-blur-sm hover:border-yellow-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                 {/* Background Glow Effect */}
                 <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 
                 <div className="relative p-8">
                   <div className="flex items-center space-x-6 mb-8">
                     <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
                       <Users className="text-white" size={32} />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-white mb-2">Clases Presenciales</h3>
                       <p className="text-yellow-200 font-medium">Todos los Sábados</p>
                     </div>
                   </div>
                   
                   <div className="space-y-6">
                     {[
                       'Práctica intensiva',
                       'Networking con compañeros',
                       'Resolución de dudas directa',
                       'Proyectos en equipo'
                     ].map((item, index) => (
                       <div key={index} className="flex items-center space-x-4 group/item">
                         <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-200">
                           <CheckCircle className="text-white" size={16} />
                         </div>
                         <span className="text-white font-medium text-lg">{item}</span>
                       </div>
                     ))}
                   </div>
                   
                   {/* Bottom accent */}
                   <div className="mt-8 pt-6 border-t border-yellow-400/30">
                     <div className="flex items-center justify-between">
                       <span className="text-yellow-200 font-semibold">Experiencia Real</span>
                       <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Code size={16} />
              <span>Stack Tecnológico</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tecnologías
              </span>
              <span className="text-white"> que Aprenderás</span>
            </h2>
            <p className="text-xl text-gray-400">
              Stack completo para convertirte en desarrollador web profesional
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'HTML5 & CSS3', icon: Code, color: 'from-orange-400 to-red-500' },
              { name: 'JavaScript', icon: Code, color: 'from-yellow-400 to-orange-500' },
              { name: 'React.js', icon: Zap, color: 'from-blue-400 to-cyan-500' },
              { name: 'Node.js', icon: Code, color: 'from-green-400 to-emerald-500' },
              { name: 'MongoDB', icon: Database, color: 'from-green-500 to-teal-500' },
              { name: 'Git & GitHub', icon: GitBranch, color: 'from-gray-400 to-slate-500' },
              { name: 'Deployment', icon: Globe, color: 'from-purple-400 to-pink-500' },
              { name: 'APIs REST', icon: Zap, color: 'from-blue-500 to-indigo-500' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${tech.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  <tech.icon size={36} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

             {/* Beneficios */}
       <section className="py-24 px-6">
         <div className="container mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center mb-20"
           >
             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
               <Lightbulb size={16} />
               <span>Ventajas Únicas</span>
             </div>
             <h2 className="text-5xl font-bold mb-6">
               <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                 ¿Por qué Elegir
               </span>
               <span className="text-white"> KaledAcademy?</span>
             </h2>
             <p className="text-xl text-gray-400">
               Ventajas únicas que te harán destacar en el mercado laboral
             </p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
             {[
               {
                 icon: MapPin,
                 title: 'Local y Accesible',
                 description: 'Clases presenciales en Córdoba, cerca de tu casa. Sin necesidad de viajar a otras ciudades.',
                 color: 'from-blue-400 to-cyan-500'
               },
               {
                 icon: GraduationCap,
                 title: 'Certificación Oficial',
                 description: 'Recibe un certificado reconocido por empresas locales y nacionales del sector tecnológico.',
                 color: 'from-yellow-400 to-orange-500'
               },
               {
                 icon: Users,
                 title: 'Comunidad Activa',
                 description: 'Únete a una red de más de 500 desarrolladores en Córdoba. Networking real y oportunidades laborales.',
                 color: 'from-green-400 to-emerald-500'
               },
               {
                 icon: Shield,
                 title: 'Garantía de Empleo',
                 description: '95% de nuestros graduados consiguen empleo en los primeros 3 meses. Te ayudamos a encontrar trabajo.',
                 color: 'from-purple-400 to-pink-500'
               },
               {
                 icon: Clock,
                 title: 'Horarios Flexibles',
                 description: 'Clases online de lunes a viernes y presenciales los sábados. Compatible con tu trabajo actual.',
                 color: 'from-red-400 to-pink-500'
               },
               {
                 icon: Award,
                 title: 'Proyectos Reales',
                 description: 'Desarrolla proyectos reales para empresas locales. Construye un portafolio profesional.',
                 color: 'from-orange-400 to-red-500'
               }
             ].map((benefit, index) => (
               <motion.div
                 key={benefit.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="text-center group"
               >
                 <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                   <benefit.icon size={36} className="text-white" />
                 </div>
                 <h3 className="text-white font-bold text-xl mb-4">{benefit.title}</h3>
                 <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>

               {/* Próximos Testimonios */}
        <section id="proximos-testimonios" className="py-24 px-6 bg-gray-900">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>Próximos Éxitos</span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Próximos
                </span>
                <span className="text-white"> Testimonios</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Nuestros primeros estudiantes están en proceso de formación. 
                ¡Pronto compartiremos sus historias de éxito!
              </p>
            </motion.div>

            {/* Call to Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/20 via-orange-600/30 to-red-500/20 border border-yellow-400/40 backdrop-blur-sm hover:border-yellow-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <Rocket className="text-white" size={40} />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6">¡Sé el Primero!</h3>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Únete a nuestra primera cohorte y conviértete en uno de nuestros primeros graduados exitosos. 
                    Tu historia de éxito será la primera que inspire a futuros estudiantes.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {[
                      { icon: Users, title: 'Primera Cohorte', description: 'Grupo exclusivo de estudiantes pioneros' },
                      { icon: Award, title: 'Certificación', description: 'Diploma oficial de KaledAcademy' },
                      { icon: Target, title: 'Empleo Garantizado', description: 'Apoyo en la búsqueda de trabajo' }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl flex items-center justify-center">
                          <item.icon className="text-yellow-400" size={28} />
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => setIsFormVisible(true)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 text-lg font-bold rounded-xl flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/25 transform hover:scale-105 transition-all duration-200 mx-auto"
                  >
                    <Rocket size={20} />
                    <span>¡Inscríbete Ahora!</span>
                    <ArrowRight size={20} />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-12">¿Por Qué Confiar en Nosotros?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { icon: Shield, title: 'Metodología Probada', description: 'Basada en las mejores prácticas del mercado' },
                  { icon: GraduationCap, title: 'Instructores Expertos', description: 'Profesionales con años de experiencia' },
                  { icon: Users, title: 'Comunidad Activa', description: 'Red de desarrolladores en Córdoba' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <item.icon className="text-blue-400" size={28} />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket size={16} />
              <span>¡El Momento es Ahora!</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
              ¿Listo para Cambiar tu Futuro?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Únete a cientos de estudiantes que ya transformaron sus carreras con KaledAcademy. 
              ¡El momento es ahora!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                             <Button 
                 onClick={handleWhatsAppRedirect}
                 className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 text-lg font-bold rounded-xl flex items-center justify-center space-x-3 shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all duration-200"
               >
                 <MessageCircle size={20} />
                 <span>¡Consulta Ahora por WhatsApp!</span>
               </Button>
                             <Button 
                 onClick={() => setIsFormVisible(true)}
                 className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 text-lg font-bold rounded-xl flex items-center justify-center space-x-3 shadow-lg transform hover:scale-105 transition-all duration-200"
               >
                 <Mail size={20} />
                 <span>Solicitar Información</span>
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-6 border-t border-blue-500/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-6">
                <Logo size="md" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                La mejor academia de desarrollo web en Córdoba, Colombia.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Contacto</h3>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-blue-400" />
                  WhatsApp: +57 300 123 4567
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-400" />
                  Email: info@kaledacademy.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-400" />
                  Córdoba, Colombia
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Horarios</h3>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center gap-2">
                  <Wifi size={16} className="text-yellow-400" />
                  Online: Lunes - Viernes
                </p>
                <p className="flex items-center gap-2">
                  <Users size={16} className="text-yellow-400" />
                  Presencial: Sábados
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-yellow-400" />
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
            
                         <div>
               <h3 className="text-white font-bold text-lg mb-6">Síguenos</h3>
               <div className="flex space-x-4">
                 <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                   <img src="/facebook-logo.svg" alt="Facebook" className="w-6 h-6" />
                 </a>
                 <a href="#" className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                   <img src="/instagram-logo.svg" alt="Instagram" className="w-6 h-6" />
                 </a>
                 <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                   <img src="/linkedin-logo.svg" alt="LinkedIn" className="w-6 h-6" />
                 </a>
               </div>
             </div>
          </div>
          
          <div className="border-t border-blue-500/20 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KaledAcademy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
