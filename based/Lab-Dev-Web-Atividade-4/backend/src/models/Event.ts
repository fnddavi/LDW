import mongoose, { Schema } from "mongoose";

interface IEvent extends Document{
    description: string;
    title: string;
    local: string;
    date: Date;
}

const Event = new Schema<IEvent>({
    description:{
        type: String,
        maxLength: 200,
        minlength: 3,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    local: {
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: Date,
        required: true,
    }
});

export default mongoose.model("Event", Event, "event")