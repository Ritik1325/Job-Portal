import express from 'express';
import protect from '../middleware/protect.js';
import checkRole from '../middleware/checkRole.js';
import  { UserAsRole } from '../controllers/userController.js';


const router=express.Router();


router.get('/user',protect,checkRole('employer','jobseeker'),UserAsRole);








export default router;