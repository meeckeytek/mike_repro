import { Router } from 'express';
import { Signup , SignIn , getUsers, updateUser,deleteUser} from '../UserController/userController.js';



const router = Router();

router.get('/get-users' , getUsers);
router.put('/update-user/:userId', updateUser);
router.delete('/delete-user/:userId',deleteUser);
router.post('/register-user',Signup);
router.post('/login-user',SignIn);




export default router;