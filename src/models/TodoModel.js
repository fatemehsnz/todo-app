import {Schema , model, models} from "mongoose";

const todoSchema = new Schema({
    todo: {
        type: String,
        required : true
    },
});

const Todo = models.Todo || model("Todo",todoSchema)

export default Todo;