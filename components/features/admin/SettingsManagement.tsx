"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Mail, CreditCard, Palette, Bell, Shield, Database, Globe, Zap, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Switch } from '../../ui/switch';
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

interface SettingsManagementProps {
  user: User;
}

interface SystemSettings {
  email: {
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  payments: {
    stripeEnabled: boolean;
    stripeKey: string;
    paypalEnabled: boolean;
    paypalClientId: string;
    currency: string;
  };
  branding: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    companyName: string;
    websiteUrl: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    weeklyReports: boolean;
    dailyDigest: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordPolicy: string;
    ipWhitelist: string[];
  };
}

const defaultSettings: SystemSettings = {
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@kaledacademy.com',
    smtpPassword: '********',
    fromEmail: 'noreply@kaledacademy.com',
    fromName: 'KaledAcademy'
  },
  payments: {
    stripeEnabled: true,
    stripeKey: 'pk_test_...',
    paypalEnabled: false,
    paypalClientId: '',
    currency: 'USD'
  },
  branding: {
    logoUrl: '/logo-simple.svg',
    primaryColor: '#fbbf24',
    secondaryColor: '#1f2937',
    companyName: 'KaledAcademy',
    websiteUrl: 'https://kaledacademy.com'
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    dailyDigest: false
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    ipWhitelist: []
  }
};

export function SettingsManagement({ user }: SettingsManagementProps) {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  const updateSetting = (category: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="flex-1 bg-black p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Configuración del Sistema
          </h1>
          <p className="text-gray-400 text-lg">
            Configuraciones globales de la plataforma
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-gray-900 border-gray-700">
              <TabsTrigger value="general" className="text-white">General</TabsTrigger>
              <TabsTrigger value="email" className="text-white">Email</TabsTrigger>
              <TabsTrigger value="payments" className="text-white">Pagos</TabsTrigger>
              <TabsTrigger value="branding" className="text-white">Marca</TabsTrigger>
              <TabsTrigger value="notifications" className="text-white">Notificaciones</TabsTrigger>
              <TabsTrigger value="security" className="text-white">Seguridad</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-400" />
                    Configuración General
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configuraciones básicas del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">Nombre de la Empresa</Label>
                      <Input
                        id="companyName"
                        value={settings.branding.companyName}
                        onChange={(e) => updateSetting('branding', 'companyName', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl" className="text-white">URL del Sitio Web</Label>
                      <Input
                        id="websiteUrl"
                        value={settings.branding.websiteUrl}
                        onChange={(e) => updateSetting('branding', 'websiteUrl', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Settings */}
            <TabsContent value="email" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="h-5 w-5 text-green-400" />
                    Configuración de Email
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configuración del servidor SMTP para envío de emails
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost" className="text-white">Servidor SMTP</Label>
                      <Input
                        id="smtpHost"
                        value={settings.email.smtpHost}
                        onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort" className="text-white">Puerto SMTP</Label>
                      <Input
                        id="smtpPort"
                        value={settings.email.smtpPort}
                        onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpUser" className="text-white">Usuario SMTP</Label>
                      <Input
                        id="smtpUser"
                        value={settings.email.smtpUser}
                        onChange={(e) => updateSetting('email', 'smtpUser', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword" className="text-white">Contraseña SMTP</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.email.smtpPassword}
                        onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Settings */}
            <TabsContent value="payments" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-400" />
                    Configuración de Pagos
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configuración de gateways de pago
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Stripe</Label>
                        <p className="text-sm text-gray-400">Procesamiento de pagos con tarjeta</p>
                      </div>
                      <Switch
                        checked={settings.payments.stripeEnabled}
                        onCheckedChange={(checked) => updateSetting('payments', 'stripeEnabled', checked)}
                      />
                    </div>
                    {settings.payments.stripeEnabled && (
                      <div className="space-y-2">
                        <Label htmlFor="stripeKey" className="text-white">Clave Pública de Stripe</Label>
                        <Input
                          id="stripeKey"
                          value={settings.payments.stripeKey}
                          onChange={(e) => updateSetting('payments', 'stripeKey', e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">PayPal</Label>
                        <p className="text-sm text-gray-400">Procesamiento de pagos con PayPal</p>
                      </div>
                      <Switch
                        checked={settings.payments.paypalEnabled}
                        onCheckedChange={(checked) => updateSetting('payments', 'paypalEnabled', checked)}
                      />
                    </div>
                    {settings.payments.paypalEnabled && (
                      <div className="space-y-2">
                        <Label htmlFor="paypalClientId" className="text-white">Client ID de PayPal</Label>
                        <Input
                          id="paypalClientId"
                          value={settings.payments.paypalClientId}
                          onChange={(e) => updateSetting('payments', 'paypalClientId', e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Settings */}
            <TabsContent value="branding" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Palette className="h-5 w-5 text-pink-400" />
                    Personalización de Marca
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configuración visual y de marca
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor" className="text-white">Color Primario</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          value={settings.branding.primaryColor}
                          onChange={(e) => updateSetting('branding', 'primaryColor', e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <div 
                          className="w-10 h-10 rounded border border-gray-600"
                          style={{ backgroundColor: settings.branding.primaryColor }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor" className="text-white">Color Secundario</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          value={settings.branding.secondaryColor}
                          onChange={(e) => updateSetting('branding', 'secondaryColor', e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <div 
                          className="w-10 h-10 rounded border border-gray-600"
                          style={{ backgroundColor: settings.branding.secondaryColor }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="h-5 w-5 text-yellow-400" />
                    Configuración de Notificaciones
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configuración de notificaciones del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Notificaciones por Email</Label>
                        <p className="text-sm text-gray-400">Enviar notificaciones por correo electrónico</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Notificaciones Push</Label>
                        <p className="text-sm text-gray-400">Notificaciones en tiempo real</p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Reportes Semanales</Label>
                        <p className="text-sm text-gray-400">Enviar reportes semanales por email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.weeklyReports}
                        onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-400" />
                    Configuración de Seguridad
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configuraciones de seguridad y autenticación
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Autenticación de Dos Factores</Label>
                        <p className="text-sm text-gray-400">Requerir 2FA para todos los usuarios</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout" className="text-white">Tiempo de Sesión (minutos)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordPolicy" className="text-white">Política de Contraseñas</Label>
                      <Select 
                        value={settings.security.passwordPolicy}
                        onValueChange={(value) => updateSetting('security', 'passwordPolicy', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weak">Débil</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="strong">Fuerte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Save Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-end"
        >
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
