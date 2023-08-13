import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isAccountOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:userId', isAuthenticated, isAccountOwner, deleteUser);
    router.patch('/users/:userId', isAuthenticated, isAccountOwner, updateUser);
}