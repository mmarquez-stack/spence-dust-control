import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db/init';
import authRoutes from './routes/auth';
import registrosRoutes from './routes/registros';
import colectoresRoutes from './routes/colectores';
import supresoresRoutes from './routes/supresores';
import maestrosRoutes from './routes/maestros';
import reportesRoutes from './routes/reportes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar base de datos
initDatabase();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/registros', registrosRoutes);
app.use('/api/colectores', colectoresRoutes);
app.use('/api/supresores', supresoresRoutes);
app.use('/api/maestros', maestrosRoutes);
app.use('/api/reportes', reportesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling
app.use(errorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
});

export default app;
