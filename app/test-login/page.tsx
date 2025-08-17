"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function TestLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<string>("");
  
  const { signIn, user, isAuthenticated, isLoading } = useAuthStore();

  const handleTestLogin = async () => {
    console.log('🧪 Testing login with:', { email, password });
    setResult("Probando login...");
    
    try {
      const loginResult = await signIn(email, password);
      console.log('🧪 Login result:', loginResult);
      
      if (loginResult.success) {
        setResult(`✅ Login exitoso! Usuario: ${user?.name} (${user?.role})`);
      } else {
        setResult(`❌ Login falló: ${loginResult.error}`);
      }
    } catch (error) {
      console.error('🧪 Login error:', error);
      setResult(`❌ Error: ${error}`);
    }
  };

  const handleClearState = () => {
    useAuthStore.getState().signOut();
    setResult("Estado limpiado");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">🧪 Test Login Zustand</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              placeholder="student@gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              placeholder="123456"
            />
          </div>
          
          <button
            onClick={handleTestLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md disabled:opacity-50"
          >
            {isLoading ? "Probando..." : "Probar Login"}
          </button>
          
          <button
            onClick={handleClearState}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
          >
            Limpiar Estado
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-white font-semibold mb-2">Estado Actual:</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <div>Autenticado: {isAuthenticated ? "✅ Sí" : "❌ No"}</div>
            <div>Cargando: {isLoading ? "⏳ Sí" : "✅ No"}</div>
            <div>Usuario: {user ? `${user.name} (${user.role})` : "Ninguno"}</div>
          </div>
        </div>
        
        {result && (
          <div className="mt-4 p-4 bg-gray-700 rounded-md">
            <h3 className="text-white font-semibold mb-2">Resultado:</h3>
            <div className="text-sm text-gray-300">{result}</div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-white font-semibold mb-2">Usuarios de Prueba:</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <div>• student@gmail.com / 123456</div>
            <div>• teacher@kaledacademy.com / 123456</div>
            <div>• admin@kaledacademy.com / 123456</div>
          </div>
        </div>
      </div>
    </div>
  );
}
