# 🏭 Spence Dust Control System

Aplicación web full-stack para gestionar el "Reporte Sistema Control de Polvo" de la mina Spence (BHP).

## 🎯 Características principales

- 📊 Registro diario de equipos mitigadores de polvo (Colectores y Supresores)
- 📈 Cálculos automáticos de disponibilidad y utilización
- 📅 Dashboard semanal con leading indicators
- 📥 Generación de reportes Excel (diarios y compilado semanal)
- 👥 Autenticación de usuarios con roles
- 📱 Interfaz responsive para escritorio y móvil

## 🛠 Stack tecnológico

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Base de datos**: SQLite
- **Autenticación**: JWT

## 📦 Estructura del proyecto

```
spence-dust-control/
├── backend/          # API REST (Node.js/Express)
├── frontend/         # Aplicación React
├── docker-compose.yml
└── README.md
```

## 🚀 Inicio rápido (local)

### Prerequisites
- Node.js 18+
- npm o yarn

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend: `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## 📝 Credenciales de prueba

Email: `supervisor@spence.com`
Password: `password123`

## 🌐 Deploy

Ver instrucciones en cada carpeta (backend/ y frontend/)

## 📄 Licencia

MIT
