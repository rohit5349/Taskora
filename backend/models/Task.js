import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
      title : {
         type : String,
         required : true,
      },

      description : String,

      assignedTo : {
         type : String,
         required : true,
      },

      status : {
         type : String,
         enum : ["Pending", "Completed"],
         default : "Pending",
      },

      dueDate : {
         type : Date,
         required : true,
      },
    } , {timestamps : true});

    export default mongoose.model("Task", taskSchema);