import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../db/Users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params;
        const users = await getUsers(name);

        return res.status(200).json(users);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params;

        const deletedUser = await deleteUserById(userId);

        return res.status(200).json(deletedUser);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params;
        const { username, email } = req.body;

        if(!username || !email) return res.sendStatus(400);

        const user = await getUserById(userId);

        user.username = username;
        user.email = email;

        await user.save();

        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}