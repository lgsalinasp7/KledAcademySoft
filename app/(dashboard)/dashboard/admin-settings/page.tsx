"use client";

import React from 'react';

export default function AdminSettingsPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Configuraciones</h1>
          <p className="text-gray-400">Administra la configuración general de la plataforma</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Configuración General</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Nombre de la Plataforma</h3>
                  <p className="text-gray-400 text-sm">Nombre que aparece en la plataforma</p>
                </div>
                <input
                  type="text"
                  defaultValue="KaledAcademy"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">URL de la Plataforma</h3>
                  <p className="text-gray-400 text-sm">URL principal de la plataforma</p>
                </div>
                <input
                  type="text"
                  defaultValue="https://kaledacademy.com"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Zona Horaria</h3>
                  <p className="text-gray-400 text-sm">Zona horaria por defecto</p>
                </div>
                <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
                  <option>America/Mexico_City</option>
                  <option>America/New_York</option>
                  <option>Europe/Madrid</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Configuración de Email</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Servidor SMTP</h3>
                  <p className="text-gray-400 text-sm">Servidor de correo electrónico</p>
                </div>
                <input
                  type="text"
                  defaultValue="smtp.gmail.com"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Puerto SMTP</h3>
                  <p className="text-gray-400 text-sm">Puerto del servidor SMTP</p>
                </div>
                <input
                  type="number"
                  defaultValue="587"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email de Remitente</h3>
                  <p className="text-gray-400 text-sm">Email desde el cual se envían los correos</p>
                </div>
                <input
                  type="email"
                  defaultValue="noreply@kaledacademy.com"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Configuración de Seguridad</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Autenticación de Dos Factores</h3>
                  <p className="text-gray-400 text-sm">Requerir 2FA para todos los usuarios</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Sesiones Múltiples</h3>
                  <p className="text-gray-400 text-sm">Permitir múltiples sesiones por usuario</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Tiempo de Sesión</h3>
                  <p className="text-gray-400 text-sm">Tiempo de inactividad antes del logout</p>
                </div>
                <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
                  <option>30 minutos</option>
                  <option>1 hora</option>
                  <option>2 horas</option>
                  <option>4 horas</option>
                  <option>8 horas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Configuración de Pagos</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Moneda por Defecto</h3>
                  <p className="text-gray-400 text-sm">Moneda principal de la plataforma</p>
                </div>
                <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
                  <option>USD - Dólar Estadounidense</option>
                  <option>EUR - Euro</option>
                  <option>MXN - Peso Mexicano</option>
                  <option>COP - Peso Colombiano</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Stripe - Modo de Prueba</h3>
                  <p className="text-gray-400 text-sm">Activar modo de prueba para Stripe</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">PayPal - Modo de Prueba</h3>
                  <p className="text-gray-400 text-sm">Activar modo de prueba para PayPal</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
