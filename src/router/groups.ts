import express from 'express';

import { createGroups, getGroupsById, getGroupsByName, updateGroup, deleteGroup } from '../controllers/groups';
import { isAuthenticated, isGroupOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/groups/name/:name', isAuthenticated, getGroupsByName);
    router.get('/groups/id/:id',isAuthenticated, getGroupsById);

    router.post('/groups/create', isAuthenticated, createGroups);

    router.patch('/groups/:id', isAuthenticated, isGroupOwner, updateGroup)
    router.delete('/groups/:id', isAuthenticated, isGroupOwner, deleteGroup)
}