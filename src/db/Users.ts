import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },

    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },

    friends: [
        {
            id: { type: String, required: true }
        }
    ]
})

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = (starts: string) => UserModel.find({ username: new RegExp("^" + starts) }).limit(20);
export const getUserByEmail = (email: String) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: String) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: String) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const deleteUserById = (id: String) => UserModel.findByIdAndDelete({ _id: id });

export const usersListener = UserModel.watch();