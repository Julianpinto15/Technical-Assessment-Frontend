# 🎨 Technical Assessment Frontend

Una aplicación web moderna desarrollada con React, TypeScript y TailwindCSS que proporciona una interfaz de usuario intuitiva para la gestión de pronósticos, alertas y dashboards.

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Lenguaje de programación tipado
- **Vite** - Herramienta de construcción y desarrollo
- **TailwindCSS 4.0** - Framework de CSS utilitario
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para API
- **ApexCharts** - Biblioteca de gráficos interactivos
- **React Helmet** - Gestión de metadatos del documento
- **Date-fns** - Manipulación de fechas

## 📁 Estructura del Proyecto

```
julianpinto15-technical-assessment-frontend/
├── index.html                # Template HTML principal
├── package.json              # Dependencias y scripts
├── vite.config.ts           # Configuración de Vite
├── tailwind.config.js       # Configuración de TailwindCSS
├── tsconfig.json            # Configuración de TypeScript
└── src/
    ├── App.tsx              # Componente principal
    ├── main.tsx             # Punto de entrada
    ├── index.css            # Estilos globales
    ├── components/          # Componentes reutilizables
    │   ├── auth/            # Componentes de autenticación
    │   ├── charts/          # Gráficos y visualizaciones
    │   ├── common/          # Componentes comunes
    │   ├── ecommerce/       # Componentes de dashboard
    │   ├── form/            # Componentes de formularios
    │   ├── header/          # Header y navegación
    │   ├── tables/          # Componentes de tablas
    │   ├── ui/              # Componentes UI base
    │   └── UserProfile/     # Perfil de usuario
    ├── context/             # Contextos de React
    ├── hooks/               # Hooks personalizados
    ├── icons/               # Iconos SVG
    ├── layout/              # Componentes de layout
    └── pages/               # Páginas de la aplicación
        ├── AuthPages/       # Páginas de autenticación
        ├── Charts/          # Páginas de gráficos
        ├── Dashboard/       # Dashboard principal
        ├── Forms/           # Páginas de formularios
        ├── Tables/          # Páginas de tablas
        └── UiElements/      # Elementos de UI
```

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/julianpinto15-technical-assessment-frontend.git
cd julianpinto15-technical-assessment-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Construir para producción

```bash
npm run build
```

### 5. Previsualizar build de producción

```bash
npm run preview
```

## 🔗 Conexión con el Backend

### Configuración de Axios

El frontend está configurado para comunicarse con la API backend a través de Axios. Asegúrate de que:

1. **El backend esté ejecutándose** en `http://localhost:3000`
2. **Las variables de entorno** estén configuradas correctamente
3. **CORS esté habilitado** en el backend para `http://localhost:5173`

### Flujo de Autenticación

1. **Login**: Los usuarios se autentican a través de `/auth/signin`
2. **Token Storage**: Los tokens JWT se almacenan en localStorage
3. **Protected Routes**: Las rutas protegidas verifican la autenticación
4. **Auto-refresh**: Los tokens se renuevan automáticamente

## 🎯 Funcionalidades Principales

### 📊 Dashboard
- **Métricas generales**: Contadores de usuarios, pronósticos y alertas
- **Gráficos interactivos**: Visualización de datos con ApexCharts
- **Notificaciones**: Sistema de notificaciones en tiempo real
- **Filtros de fecha**: Selección de rangos de fecha personalizados

### 🔐 Autenticación
- **Sign In/Sign Up**: Formularios de registro e inicio de sesión
- **JWT Authentication**: Autenticación basada en tokens
- **Protected Routes**: Rutas protegidas por autenticación
- **User Profile**: Gestión de perfil de usuario

### 📈 Pronósticos
- **Configuración**: Configuración de horizontes y niveles de confianza
- **Simulación**: Simulación de pronósticos por SKU
- **Historial**: Visualización del historial de pronósticos
- **Métricas**: Análisis de precisión y rendimiento

### 🚨 Alertas
- **Gestión de alertas**: Crear, editar y eliminar alertas
- **Umbrales configurables**: Configuración de límites mínimos y máximos
- **Condiciones**: Alertas por encima/debajo de umbrales
- **Notificaciones**: Sistema de notificaciones por email/SMS

### 📋 Tablas y Formularios
- **Tablas dinámicas**: Visualización de datos tabulares
- **Formularios reactivos**: Validación en tiempo real
- **Filtros y búsqueda**: Funcionalidades de filtrado
- **Importación**: Importación de datos a CSV/Excel

## 🎨 Componentes UI

### Componentes Base
- **Buttons**: Botones con diferentes variantes y estados
- **Forms**: Inputs, selects, checkboxes, radio buttons
- **Alerts**: Notificaciones y mensajes de estado
- **Modals**: Ventanas modales y diálogos
- **Tables**: Tablas responsivas con paginación

### Gráficos y Visualizaciones
- **Line Charts**: Gráficos de líneas para tendencias
- **Bar Charts**: Gráficos de barras para comparaciones
- **Interactive Charts**: Gráficos con zoom y filtros
- **Real-time Updates**: Actualización en tiempo real

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 🔧 Configuración de Desarrollo

### ESLint
El proyecto incluye configuración de ESLint con reglas para:
- React Hooks
- TypeScript
- Mejores prácticas de React

### TailwindCSS
Configuración personalizada con:
- Paleta de colores personalizada
- Breakpoints responsivos
- Utilidades personalizadas
- Dark mode support

### Vite
Configuración optimizada con:
- Hot Module Replacement (HMR)
- Optimización de assets
- Code splitting automático
- SVG como componentes React

## 📱 Responsive Design

La aplicación está diseñada para ser completamente responsiva:
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Touch Friendly**: Elementos táctiles optimizados
- **Progressive Enhancement**: Funcionalidades progresivas

## 🌙 Dark Mode

Soporte completo para modo oscuro:
- **Toggle automático**: Botón de cambio de tema
- **Persistencia**: Preferencia guardada en localStorage
- **System preference**: Respeta la preferencia del sistema
- **Smooth transitions**: Transiciones suaves entre temas

## 📚 Estructura de Hooks

### Hooks Personalizados
- `useDashboardNotifications`: Gestión de notificaciones del dashboard
- `useDashboardTrends`: Análisis de tendencias y métricas
- `useGoBack`: Navegación hacia atrás con historial
- `useModal`: Gestión de estados de modales

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

### Variables de Entorno de Producción
```env
VITE_API_BASE_URL=https://tu-api-produccion.com/api
VITE_APP_TITLE=Technical Assessment
VITE_APP_DESCRIPTION=Dashboard de gestión de pronósticos y alertas
```

### Servicios Recomendados
- **Vercel**: Deployment automático desde Git
- **Netlify**: Hosting estático con CI/CD
- **AWS S3 + CloudFront**: Hosting escalable
- **Firebase Hosting**: Hosting rápido y seguro

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Desarrollado por:** Julián Pinto  
**Versión:** 2.0.2  
**Framework:** React 19 + TypeScript + TailwindCSS 4.0
