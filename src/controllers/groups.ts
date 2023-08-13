import express from 'express';
import { get } from 'lodash';

import { createGroup, deleteGroupById, getGroupById, getGroups } from '../db/Groups';

export const getGroupsByName = async (req: express.Request, res: express.Response) => {
    try {
        
        const { name } = req.params;
        const groups = await getGroups(name);

        return res.status(200).json(groups);
        
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getGroupsById = async (req: express.Request, res: express.Response) => {

    try {

        const { id } = req.params;
        const group = await getGroupById(id);

        return res.status(200).json(group).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }

}

export const updateGroup = async (req: express.Request, res: express.Response) => {

    try {

        const { id } = req.params;
        const newGroup = req.body;

        if(!newGroup) return res.sendStatus(400);

        let group = await getGroupById(id);

        group = newGroup;

        await group.save();
        return res.status(200).json(group).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }

}

export const createGroups = async (req: express.Request, res: express.Response) => {
    try {

        const { name, date, location, thingsToBrought, users } = req.body;

        if(!name || !date || !location || !thingsToBrought || !users) return res.sendStatus(400);

        const group = await createGroup({
            name,
            date,
            location,
            owner: get(req, 'identity._id') as String,

            thingsToBrought,
            users
        });

        return res.status(200).json(group).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteGroup = async (req: express.Request, res: express.Response) => {
    try {
        
        const { id } = req.params;

        const deletedGroup = await deleteGroupById(id);

        return res.status(200).json(deleteGroup);

    } catch(error) {
        console.log(error);
        return res.sendStatus(200);
    }
}