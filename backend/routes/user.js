import express from "express";
import { signUp , login } from "../controller/auth.js";
import { UpdateUser , deleteUser , getUser, getUsers} from "../controller/user.js";

const router = express.Router();

router.post('/signup' , signUp);
router.post('/login' , login);


router.get('/', getUsers);
router.get('/:id', getUser);

export default router;