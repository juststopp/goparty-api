import express from 'express';
import { get } from 'lodash';

import { createMessage, deleteMessageById, getMessageById, getMessagesFromGroupid } from '../db/Message';
import { getGroupById } from '../db/Groups';
import { getUserById } from '../db/Users';

export const getMessage = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        
        if(!id) return res.sendStatus(400);

        const message = await getMessageById(id);

        if(!message) return res.sendStatus(400);

        return res.status(200).json(message).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getGroupMessages = async (req: express.Request, res: express.Response) => {
    try {
        const { groupId } = req.params;

        if(!groupId) return res.sendStatus(400);

        const messages = await getMessagesFromGroupid(groupId);

        return res.status(200).json(messages).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    } 
}

export const createGroupMessage = async (req: express.Request, res: express.Response) => {
    try {
        const { text, groupId } = req.body;

        if(!text || !groupId) return res.sendStatus(400);

        const group = await getGroupById(groupId);
        const sender = await getUserById(get(req, 'identity._id') as String);

        if(!group || !sender) return res.sendStatus(400);

        const message = await createMessage({
            text,
            groupId,
            senderId: sender.id
        })

        return res.status(200).json(message).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteMessage = async (req: express.Request, res: express.Response) => {
    try {
        const { messageId } = req.params;

        if(!messageId) return res.sendStatus(400);

        const message = await getMessageById(messageId);

        if(!message) return res.sendStatus(400);

        const deletedMessage = await deleteMessageById(messageId);

        return res.status(200).json(deletedMessage).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}