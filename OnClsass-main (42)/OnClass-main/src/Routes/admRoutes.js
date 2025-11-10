import express from 'express';
import * as admController from '../Controllers/admController.js';

const admRoutes = express.Router();

admRoutes.post('/', admController.criarAdm);
admRoutes.get('/', admController.listarAdms);
admRoutes.post('/login', admController.logarAdm);

export default admRoutes;
