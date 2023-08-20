import express from 'express';

import authentication from './authentication';
import users from './users';
import groups from './groups';
import messages from './messages';

const router = express.Router();

/**
 * Multiple routes for the different actions:
 * 
 * Authentication: Everyting about user authentication, login and register ;
 * Users: Every routes used to manage the users ;
 * Groups: Every routes users to manage the groups ;
 * Message: Every routes used to manage the messages.
 */

/**
 * Default function to register the routes.
 * @returns {express.Router}: The router used accross the app.
 */

export default (): express.Router => {
    authentication(router);
    users(router);
    groups(router);
    messages(router);
    return router;
}