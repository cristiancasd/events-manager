import express from 'express';
import { validateRequest } from '../../../../core';
import { configureDependencies } from '../../../../config';

const { seedCtrl } = configureDependencies();
const seedRoutes = express.Router();

seedRoutes.get('/create', [], validateRequest, seedCtrl.insertCtrl);

export { seedRoutes };
