import User from '../models/user.js';


export const getUser = async (req , res , next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(error){
        next(error);
    }
};

export const getUsers = async (req , res , next) => {
       try {
         const users = await User.find();
         res.status(200).json(users);
       } catch (error) {
         next(error);
       }
}

export const UpdateUser = async (req , res , next)=>{
    try{
      const Updateuser = await User.findByIdAndUpdate(
             req.params.id,
             {$set : req.body},
             {new : true}
      );
      res.status(200).json(Updateuser);
    }catch(error){
         next(error);
    }
};


export const deleteUser = async (req , res , next)=>{
    try{
      const Deleteuser = await User.findByIdAndDelete(
          req.params.id
      );
      res.status(200).json("User has been deleted:");
    } catch(error){
         next(error);
    }
}


