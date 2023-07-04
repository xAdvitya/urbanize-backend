import { Router } from 'express';
import DevController from '../controllers/dev.controller';

const { devFunc } = new DevController();

const router = Router();

router.get('/', devFunc);



export default router;
