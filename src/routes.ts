// routes.ts
import { Router } from 'express';
import {commerceRoutes} from './features/commerce';


const router = Router();

// Configuración de CORS u otros middlewares comunes

// Montar las rutas específicas de cada feature
router.use('/commerce', commerceRoutes);
/*router.use('/user', userRoutes);
router.use('/clients', clientsRoutes);
router.use('/assistants', assistantsRoutes);
router.use('/events', eventsRoutes);*/

export default router;
