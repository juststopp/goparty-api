import express from 'express';

import { isAuthenticated } from '../middlewares';
import { getMessage } from '../controllers/messages';

export default (router: express.Router) => {
    router.get('/messages/:id', isAuthenticated, getMessage)
}