import { Router } from 'express';
import TestController from '../controllers/test.controller';

const { testFunc } = new TestController();

const router = Router();

router.get('/test', testFunc);

export default router;
