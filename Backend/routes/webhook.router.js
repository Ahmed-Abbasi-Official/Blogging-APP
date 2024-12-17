import {Router} from 'express';
import webhooksController from '../controllers/webhook.controller.js';
import bodyParser from 'body-parser';

const webhooksRouter=Router();

webhooksRouter.post('/clerk', bodyParser.raw({ type: 'application/json' }) , webhooksController.clerWebHook);

export default webhooksRouter;
