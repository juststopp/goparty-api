import express from 'express';

import { isAuthenticated, isMessageSender } from '../middlewares';
import { createGroupMessage, getGroupMessages, getMessage, deleteMessage } from '../controllers/messages';

/**
 * Messages routes:
 * 
 * GET /messages/:id : Get the message with the id matching the id param. User must be authenticated.
 * GET /messages/group/:groupId : Get all messages from the group matching the groupId param. User must be authenticated.
 * 
 * POST /messages : Create a message. User must be authenticated.
 * 
 * DELETE /messages/:messagesId : Delete the message with the id matching the id param. User must be authenticated and be the sender of the message.
 */

export default (router: express.Router) => {
    router.get('/messages/:id', isAuthenticated, getMessage);
    router.get('/messages/group/:groupId', isAuthenticated, getGroupMessages);

    router.post('/messages', isAuthenticated, createGroupMessage);

    router.delete('/messages/:messageId', isAuthenticated, isMessageSender, deleteMessage);
}