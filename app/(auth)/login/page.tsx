"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, MessageCircle } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, password });
    setIsLoading(true);
    setError("");

    try {
      console.log('Calling signIn...');
      const result = await signIn(email, password);
      console.log('SignIn result:', result);
      if (result.success) {
        console.log('Login successful, redirecting...');
        router.push("/dashboard");
      } else {
        setError(result.error || "Credenciales inválidas");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    console.log('Test login clicked');
    setIsLoading(true);
    setError("");

    try {
      console.log('Calling signIn with test credentials...');
      const result = await signIn('student@gmail.com', '123456');
      console.log('Test login result:', result);
      if (result.success) {
        console.log('Test login successful, redirecting...');
        router.push("/dashboard");
      } else {
        setError(result.error || "Credenciales inválidas");
      }
    } catch (err) {
      console.error('Test login error:', err);
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </label>
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
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
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

                {/* Botón de prueba para debug */}
                <Button
                  type="button"
                  onClick={handleTestLogin}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-2"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Probando login...
                    </div>
                  ) : (
                    "🔧 Probar Login (Debug)"
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
                    <span className="text-gray-300 ml-2">student@gmail.com</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEmail("student@gmail.com");
                      setPassword("123456");
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Usar
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-green-400 font-semibold">Profesor:</span>
                    <span className="text-gray-300 ml-2">teacher@kaledacademy.com</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEmail("teacher@kaledacademy.com");
                      setPassword("123456");
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Usar
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-red-400 font-semibold">Admin:</span>
                    <span className="text-gray-300 ml-2">admin@kaledacademy.com</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEmail("admin@kaledacademy.com");
                      setPassword("123456");
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Usar
                  </Button>
                </div>
                
                <div className="text-center p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-400 font-semibold">Contraseña para todos:</span>
                  <span className="text-white ml-2">123456</span>
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
