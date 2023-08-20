import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isAccountOwner } from '../middlewares';

/**
 * User routes:
 * 
 * GET /users/:name : Get the first 20 users with a name starting with the name param. User must be authenticated.
 * 
 * PATH /users/:userId : Update the user matching the userId. User must be authenticated and must own the account.
 * 
 * DELETE /users/:userId : Delete the user matching the userId. ser must be authenticated and must own the account.
 */

export default (router: express.Router) => {
    router.get('/users/:name', isAuthenticated, getAllUsers);
    
    router.patch('/users/:userId', isAuthenticated, isAccountOwner, updateUser);

    router.delete('/users/:userId', isAuthenticated, isAccountOwner, deleteUser);
}