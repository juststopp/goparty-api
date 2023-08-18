import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    groupId: { type: String, required: true },
    senderId: { type: String, required: true },

    likes: [
        {
            userId: { type: String, required: true }
        }
    ]
});

export const MessagesModel = mongoose.model('Message', MessageSchema);

export const getGroupMessages = (groupId: string) => MessagesModel.find({ groupId: groupId });
export const getMessageById = (id: string) => MessagesModel.findById(id);
export const createMessage = (values: Record<string, any>) => new MessagesModel(values).save().then((message) => message.toObject());
export const updateMessageById = (id: string, values: Record<string, any>) => MessagesModel.findByIdAndUpdate(id, values);
export const deleteMessageById  = (id: string) => MessagesModel.findByIdAndDelete({ _id: id });
export const getMessagesFromGroupid = (id: string) => MessagesModel.find({ groupId: id });

export const messagesListener = MessagesModel.watch();