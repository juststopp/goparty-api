import express from 'express';

import authentication from './authentication';
import users from './users';
import groups from './groups';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    groups(router);
    return router;
}