import express from 'express';

import { createGroups, getGroupsById, getGroupsByName, updateGroup, deleteGroup } from '../controllers/groups';
import { isAuthenticated, isGroupOwner } from '../middlewares';

/**
 * Groups routes:
 * 
 * GET /groups/name/:name : Get groups starting with the name param. User must be authenticated.
 * GET /groups/id/:id : Get group with the id matching the id param. User must be authenticated.
 * 
 * POST /groups : Create a group. User must be authenticated.
 * 
 * PATCH /groups/:id : Update the group with the id matching the id param. User must be authenticated and must own the group.
 * 
 * DELETE /groups/:id : Delete the group with the id matching the id param. User must be authenticated and must own the group.
 */

export default (router: express.Router) => {
    router.get('/groups/name/:name', isAuthenticated, getGroupsByName);
    router.get('/groups/id/:id',isAuthenticated, getGroupsById);

    router.post('/groups', isAuthenticated, createGroups);

    router.patch('/groups/:id', isAuthenticated, isGroupOwner, updateGroup);

    router.delete('/groups/:id', isAuthenticated, isGroupOwner, deleteGroup);
}