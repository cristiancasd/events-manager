"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes.ts
const express_1 = require("express");
const features_1 = require("./features");
const events_routes_1 = require("./features/events/presentation/routes/events.routes");
const users_routes_1 = require("./features/user/presentation/routes/users.routes");
const auth_routes_1 = require("./features/auth/presentation/routes/auth.routes");
const router = (0, express_1.Router)();
// Feature routes
router.use('/commerce', features_1.commerceRoutes);
router.use('/event', events_routes_1.eventsRoutes);
router.use('/level', features_1.levelRoutes);
router.use('/user', users_routes_1.userRoutes);
router.use('/auth', auth_routes_1.authRoutes);
exports.default = router;
