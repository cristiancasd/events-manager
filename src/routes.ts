// routes.ts
import { Router } from 'express';
import { commerceRoutes, levelRoutes } from './features';
import { eventsRoutes } from './features/events/presentation/routes/events.routes';
import { userRoutes } from './features/user/presentation/routes/users.routes';

const router = Router();

// Configuración de CORS u otros middlewares comunes

// Montar las rutas específicas de cada feature
router.use('/commerce', commerceRoutes);
router.use('/event', eventsRoutes);
router.use('/level', levelRoutes);
router.use('/user', userRoutes);



/*router.use('/user', userRoutes);
router.use('/clients', clientsRoutes);
router.use('/assistants', assistantsRoutes);
router.use('/events', eventsRoutes);*/

export default router;
