"use client";

import React from 'react';

interface LessonContentProps {
  activeSection: string;
  currentLessonNumber: number;
}

export function LessonContent({ activeSection, currentLessonNumber }: LessonContentProps) {
  const renderAboutModule = () => (
    <div>
      <div className="bg-gray-100 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sobre el Módulo 0</h1>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold">K</span>
          </div>
          <span className="font-medium text-gray-700">KALED</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Objetivo del módulo</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Con este módulo preparatorio podrás adquirir los conocimientos y habilidades técnicas básicas sobre Full Stack.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            En cada uno de estos recursos, que llamamos lectures, encontrarás el material y los conceptos necesarios para desarrollar competencias a partir de prácticas y el desarrollo progresivo de un Proyecto Integrador de módulo.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            A la vez, contarás con acompañamiento de un instructor en sesiones en vivo de Hands On para revisar las prácticas realizadas, evacuar tus dudas y afianzar lo aprendido.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Objetivos de aprendizaje</h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>• Instalar y configurar herramientas necesarias para la cursada en KALED ACADEMY.</li>
            <li>• Conocer Node JS y su importancia como entorno de ejecución de Javascript.</li>
            <li>• Comprender qué son los editores de texto o código e identificar las principales potencialidades de VS Code.</li>
            <li>• Introducir Git y Github.</li>
            <li>• Aprender a ejecutar los primeros comandos en la terminal.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderToolsInstallation = () => (
    <div>
      <div className="bg-green-100 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Instalación de herramientas</h1>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold">K</span>
          </div>
          <span className="font-medium text-gray-700">KALED</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Objetivo de aprendizaje:</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Durante esta clase aprenderás a <strong>instalar las aplicaciones (software)</strong> y <strong>configurar las herramientas</strong> necesarias para desarrollar con éxito tu Módulo 0 en KaledAcademy.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Herramientas necesarias</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Durante este Módulo 0 vamos a usar 5 aplicaciones imprescindibles que debemos conocer y configurar correctamente, las cuales son:
          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-lg mb-2"></div>
                <span className="text-sm">Slack</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-lg mb-2"></div>
                <span className="text-sm">Editor de texto (VSC)</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-lg mb-2"></div>
                <span className="text-sm">Node-js</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-lg mb-2"></div>
                <span className="text-sm">Git</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mb-2"></div>
                <span className="text-sm">GitHub</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Todas estas herramientas las podrás instalar y utilizar en cualquier sistema operativo: <strong>Mac, Linux, Windows</strong>. Para el sistema operativo Windows te recomendamos que tengas la versión <strong>Windows 10</strong>.
          </p>

          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Los requisitos mínimos del hardware de tu computador son:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Procesador ARM64 o procesador x64 de 2,5 GHz o superior.</li>
              <li>• 4 GB de memoria RAM, como mínimo. Recomendado 8GB de RAM</li>
              <li>• Espacio en disco duro: mínimo de 25 GB de espacio disponible</li>
              <li>• Cámara web, audífonos y micrófono funcional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSlackContent = () => (
    <div>
      <div className="bg-green-100 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-6xl opacity-20">🤝</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-30">⭐</div>
        <div className="absolute top-1/2 right-1/4 text-4xl opacity-20">💡</div>

        <h1 className="text-6xl font-bold text-gray-800 mb-4">Slack</h1>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold">K</span>
          </div>
          <span className="font-medium text-gray-700">KALED</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Qué es?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>Slack</strong> es una aplicación de mensajería para empresas que conecta a las personas con la 
            información que necesitan. Slack es el <strong>medio de comunicación principal</strong> que utilizamos 
            en KaledAcademy para mantenernos conectados entre aplicantes, instructores y el staff.
          </p>
        </div>

        <div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Vía Slack podrás despejar tus dudas sobre cada clase y podrás mantenerte al tanto sobre 
            las <strong>novedades</strong> de la Carrera.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Paso a paso para instalar Slack y conectar con la comunidad
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 text-lg">
              -Nos dirigimos al sitio oficial de <a href="#" className="text-blue-600 underline">slack.com</a>
            </p>
            <p className="text-gray-700 text-lg">
              - Al ingresar, el sitio <strong>detectará nuestro Sistema Operativo y nos sugerirá que descarguemos el</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Lesson Badge */}
      <div className="mb-6">
        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
          Lección {currentLessonNumber} de 12
        </span>
      </div>

      {/* Render content based on active section */}
      {activeSection === 'about-module' && renderAboutModule()}
      {activeSection === 'tools' && renderToolsInstallation()}
      {activeSection === 'slack' && renderSlackContent()}
    </>
  );
}
