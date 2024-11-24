import mongoose, { Schema } from "mongoose";

interface IExpense extends Document{
    description: string;
    amount: number;
    date: Date;
}

const Expense = new Schema<IExpense>({
    description:{
        type: String,
        maxLength: 200,
        minlength: 3,
        required: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true,
        min:1
    },
    date:{
        type: Date,
        required: true,
    }
});

export default mongoose.model("Expense", Expense, "expense")