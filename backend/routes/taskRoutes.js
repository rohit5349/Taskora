import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Create Task (Admin)

router.post("/", async (req , res) => {
      try {
         const task = await Task.create(req.body);
         res.status(200).json(task);
      } catch (error) {
         res.status(500).json({message : error.message});
      }
});


// Get all task

router.get("/" , async (req , res) => {
       try {
          const tasks = await Task.find();
          res.status(200).json(tasks);
       } catch (error) {
          res.status(500).json({message : error.message});
       }
});


// Update status

router.put("/:id", async (req , res) => {
       try {
         const { title , status , assignedTo, dueDate } = req.body;

         const updatedTask = await Task.findByIdAndUpdate(
             req.params.id,
             {
               title,
               status,
               assignedTo,
               dueDate
             },
             { new: true }
         );
         
         res.status(200).json(updatedTask);

       } catch (error) {
          res.status(500).json({ message : error.message });
       }
});


router.delete("/:id", async (req , res) => {
      try {
          const deleteUser = await Task.findByIdAndDelete(
             req.params.id
          );
          res.status(200).json(deleteUser);
      } catch (error) {
          res.status(500).json({ message : error.message });
      }
})

export default router;





