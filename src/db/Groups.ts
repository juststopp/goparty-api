import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    
    thingsToBrought: [
        {
            name: { type: String, required: true },
            users: [
                {
                    id: { type: String, required: true },
                    number: { type: Number, required: true }
                }
            ]
        }
    ],
    users: { type: [String], required: false, default: [] }
})

export const GroupModel = mongoose.model('Group', GroupSchema);

export const getGroups = (starts: String = "") => GroupModel.find({ name: new RegExp("^" + starts) }).limit(20);
export const getGroupById = (id: String) => GroupModel.findById(id);
export const createGroup = (values: Record<string, any>) => new GroupModel(values).save().then((group) => group.toObject());
export const updateGroupById = (id: String, values: Record<string, any>) => GroupModel.findByIdAndUpdate(id, values);
export const deleteGroupById = (id: String) => GroupModel.findByIdAndDelete({ _id: id });

export const groupsListener = GroupModel.watch();