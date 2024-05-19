import { Router } from 'express';
import { commerceRoutes, levelRoutes } from './features';
import { eventsRoutes } from './features/events/presentation/routes/events.routes';
import { userRoutes } from './features/user/presentation/routes/users.routes';
import { authRoutes } from './features/auth/presentation/routes/auth.routes';
import { prospectRoutes } from './features/prospects/presentation/routes/prospects.routes';
import { attendeesUserRoutes } from './features/attendees-user/presentation/routes/attendeesUser.routes';
import { attendeesProspectRoutes } from './features/attendees-prospect/presentation/routes/attendeesProspect.routes';
import { ticketRoutes } from './features/tickets/presentation/routes/ticket.routes';
import { userTicketRoutes } from './features/user-ticket/presentation/routes/userTicket.routes';
import { seedRoutes } from './features/seed/presentation/routes/seed.routes';

const router = Router();

// Feature routes
router.use('/seed', seedRoutes);
router.use('/commerce', commerceRoutes);
router.use('/event', eventsRoutes);
router.use('/level', levelRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/prospect', prospectRoutes);
router.use('/attendee/user', attendeesUserRoutes);
router.use('/attendee/prospect', attendeesProspectRoutes);
router.use('/ticket', ticketRoutes);
router.use('/ticket/user', userTicketRoutes);

export default router;
