import express, { Request, Response } from 'express';
import { db } from '../db/init';
import { verifyToken } from '../middleware/auth';
import { catchAsync } from '../middleware/errorHandler';

const router = express.Router();

router.get('/dashboard', verifyToken, catchAsync(async (req: Request, res: Response) => {
  db.all(
    `SELECT * FROM registros_diarios WHERE usuario_id = ? AND estado = 'finalizado' ORDER BY fecha DESC LIMIT 7`,
    [req.userId],
    (err: any, registros: any) => {
      if (err || !registros) {
        return res.json({
          colectores_disponibilidad: 0,
          colectores_utilizacion: 0,
          supresores_disponibilidad: 0,
          supresores_utilizacion: 0,
          registros: [],
        });
      }

      db.all(
        `SELECT AVG(disponibilidad) as disp, AVG(utilizacion_pct) as util FROM colectores_datos WHERE registro_id IN (${registros.map(() => '?').join(',')})`,
        registros.map((r: any) => r.id),
        (err: any, colData: any) => {
          const colDisp = colData?.[0]?.disp || 0;
          const colUtil = colData?.[0]?.util || 0;

          db.all(
            `SELECT AVG(disponibilidad) as disp, AVG(utilizacion_pct) as util FROM supresores_datos WHERE registro_id IN (${registros.map(() => '?').join(',')})`,
            registros.map((r: any) => r.id),
            (err: any, supData: any) => {
              const supDisp = supData?.[0]?.disp || 0;
              const supUtil = supData?.[0]?.util || 0;

              res.json({
                colectores_disponibilidad: Math.round(colDisp * 100) / 100,
                colectores_utilizacion: Math.round(colUtil * 100) / 100,
                supresores_disponibilidad: Math.round(supDisp * 100) / 100,
                supresores_utilizacion: Math.round(supUtil * 100) / 100,
                registros,
              });
            }
          );
        }
      );
    }
  );
}));

export default router;
