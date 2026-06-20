# Backend Deployment Guide

## Opción 1: Railway (Recomendado - Gratis)

### Paso 1: Crear cuenta en Railway
1. Ve a https://railway.app
2. Inicia sesión con GitHub
3. Autoriza el acceso a tus repositorios

### Paso 2: Crear proyecto
1. Click en "New Project"
2. Selecciona "Deploy from GitHub"
3. Selecciona el repositorio `spence-dust-control`

### Paso 3: Configurar variables de entorno
En el dashboard de Railway, agrega:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=tu-secreto-aleatorio-muy-largo
JWT_EXPIRATION=24h
CORS_ORIGIN=https://tu-frontend.vercel.app
DATABASE_PATH=/data/spence.db
```

### Paso 4: Deploy
Railway hace deploy automáticamente en cada push a main

### Acceder a tu API
Tu API estará disponible en: `https://<tu-railway-domain>/api`

---

## Opción 2: Heroku (Alternativa)

### Paso 1: Heroku CLI
```bash
npm install -g heroku
heroku login
```

### Paso 2: Crear app
```bash
cd backend
heroku create spence-dust-control-api
```

### Paso 3: Configurar variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=tu-secreto-aleatorio
heroku config:set CORS_ORIGIN=https://tu-frontend.vercel.app
```

### Paso 4: Deploy
```bash
git push heroku main
```

---

## Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-----------|---------|
| `NODE_ENV` | Entorno de ejecución | `production` |
| `PORT` | Puerto (Railway asigna automáticamente) | `3000` |
| `JWT_SECRET` | Clave para firmar JWT | `abc123xyz...` |
| `JWT_EXPIRATION` | Expiración de tokens | `24h` |
| `CORS_ORIGIN` | Origen permitido para CORS | `https://app.vercel.app` |
| `DATABASE_PATH` | Ruta de la DB SQLite | `/data/spence.db` |

---

## Health Check

Verifica que tu backend esté funcionando:
```bash
curl https://tu-api.railway.app/api/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "timestamp": "2026-06-20T22:00:00.000Z"
}
```

---

## Monitoreo

### Railway
- Dashboard: https://railway.app/dashboard
- Logs en tiempo real en la plataforma

### Heroku
```bash
heroku logs --tail
```

---

## Troubleshooting

### Error: Base de datos no persiste
- En Railway, la base de datos necesita almacenamiento persistente
- Configura un volumen en: `/data/spence.db`

### Error: CORS
- Verifica que `CORS_ORIGIN` coincida exactamente con tu frontend URL
- Incluye `https://` o `http://`

### Error: JWT inválido
- Asegúrate que `JWT_SECRET` es la misma en todas las instancias
- No cambies la clave en producción sin avisar a los usuarios

---

## Próximos pasos

1. Conectar base de datos PostgreSQL (opcional, para producción)
2. Agregar logging centralizado
3. Configurar monitoreo y alertas
4. Implementar CI/CD con tests automáticos
