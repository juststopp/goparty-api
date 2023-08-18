import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/Users';
import { getGroupById } from '../db/Groups';
import { getMessageById } from '../db/Message';

export const isGroupOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { groupId } = req.params;

        if(!groupId) return res.sendStatus(400)
        
        const group = await getGroupById(groupId);

        if(!group) return res.sendStatus(400);

        const currentUserId = get(req, 'identity._id') as String;
        if(group.owner !== currentUserId) return res.sendStatus(403);

        return next();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isMessageSender = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { messageId } = req.params;

        if(!messageId) return res.sendStatus(400);

        const message = await getMessageById(messageId);

        if(!message) return res.sendStatus(400);
        if(message.senderId != (get(req, 'identity._id') as String)) return res.sendStatus(403);

        return next();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAccountOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { userId } = req.params;
        const currentUserId = get(req, 'identity._id') as String;

        if(!currentUserId) return res.sendStatus(403);
        if(currentUserId.toString() !== userId) return res.sendStatus(403);

        return next();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["API-AUTH"];

        if(!sessionToken) return res.sendStatus(403);

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) return res.sendStatus(403);

        merge(req, { identity: existingUser });

        return next();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}