// routes.ts
import { Router } from 'express';
import { commerceRoutes, levelRoutes } from './features';
import { eventsRoutes } from './features/events/presentation/routes/events.routes';
import { userRoutes } from './features/user/presentation/routes/users.routes';
import { authRoutes } from './features/auth/presentation/routes/auth.routes';

const router = Router();

// Feature routes
router.use('/commerce', commerceRoutes);
router.use('/event', eventsRoutes);
router.use('/level', levelRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;
