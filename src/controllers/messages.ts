import express from 'express';

import { getMessageById, getMessagesFromGroupid } from '../db/Message';

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