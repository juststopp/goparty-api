import { Server } from 'socket.io'

import { getUserById, usersListener } from './db/Users';
import { getMessageById, messagesListener } from './db/Message';
import { getGroupById, groupsListener } from './db/Groups';

export default () => {
    const io = new Server(8001);

    io.on('connection', (socket) => {
        console.log('Nouveau client connecté. SocketID: ' + socket.id);
    });

    messagesListener.on('change', async (newMessage) => {
        const id = newMessage.documentKey._id.toHexString();

        const message = await getMessageById(id);
        io.emit(`message-${newMessage.operationType}`, message);
    });

    usersListener.on('change', async (newUser) => {
        const id = newUser.documentKey._id.toHexString();

        const user = await getUserById(id);
        io.emit(`useer-${newUser.operationType}`, user);
    });

    groupsListener.on('change', async (newGroup) => {
        const id = newGroup.documentKey._id.toHexString();

        const group = await getGroupById(id);
        io.emit(`group-${newGroup.operationType}`, group);
    });
}