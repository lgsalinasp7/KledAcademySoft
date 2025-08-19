"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, MessageCircle } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { logger } from "@/lib/logger";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    logger.debug('Iniciando proceso de login', { email });
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      logger.debug('Llamando a signIn...');
      const result = await signIn(email, password);
      
      if (result.success) {
        logger.info('Login exitoso', { email });
        router.push("/dashboard");
      } else {
        logger.warn('Login fallido', { error: result.error });
        setError(result.error || "Credenciales inválidas");
      }
    } catch (err) {
      logger.error('Error en login', { error: err });
      setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      "¡Hola! Necesito ayuda para acceder a mi cuenta de KaledAcademy. ¿Podrían ayudarme?"
    );
    window.open(`https://wa.me/573001234567?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">K</span>
            </div>
            <span className="text-white font-bold text-3xl">KaledAcademy</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-gray-400">
            Inicia sesión en tu cuenta para continuar
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-xl">Iniciar Sesión</CardTitle>
              <CardDescription className="text-gray-400">
                Accede a tu plataforma educativa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-3"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>

              {/* WhatsApp Support */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <Button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  variant="outline"
                  className="w-full border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                >
                  <MessageCircle size={16} className="mr-2" />
                  ¿Necesitas ayuda? Contacta por WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Demo Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Usuarios de Prueba</CardTitle>
              <CardDescription className="text-gray-400">
                Utiliza estas credenciales para probar la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-yellow-400 font-semibold">Estudiante:</span>
                    <span className="text-gray-300 ml-2">estudiante@gmail.com</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logger.debug('Configurando credenciales de estudiante');
                      setEmail("estudiante@gmail.com");
                      setPassword("demo123");
                    }}
                    className="text-blue-400 hover:text-blue-300 bg-transparent border-none cursor-pointer px-2 py-1 rounded"
                  >
                    Usar
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-green-400 font-semibold">Profesor:</span>
                    <span className="text-gray-300 ml-2">teacher@gmail.com</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEmail("teacher@gmail.com");
                      setPassword("teacher123");
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Usar
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-red-400 font-semibold">Admin:</span>
                    <span className="text-gray-300 ml-2">admin@gmail.com</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEmail("admin@gmail.com");
                      setPassword("admin123");
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Usar
                  </Button>
                </div>
                
                <div className="text-center p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-400 font-semibold">Contraseñas:</span>
                  <div className="text-white mt-1">
                    <div>Estudiante: demo123</div>
                    <div>Profesor: teacher123</div>
                    <div>Admin: admin123</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            ¿No tienes cuenta?{" "}
            <button
              onClick={handleWhatsAppRedirect}
              className="text-yellow-400 hover:text-yellow-300 underline"
            >
              Contáctanos por WhatsApp
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
