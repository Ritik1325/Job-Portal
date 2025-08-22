import express from 'express';
import protect from '../middleware/protect.js';
import checkRole from '../middleware/checkRole.js';
import userAsRole, { getUser } from '../controllers/userController.js';


const router=express.Router();


router.get('/userole',protect,checkRole('employer','jobseeker'),userAsRole);
router.get('/user',getUser);









export default router;