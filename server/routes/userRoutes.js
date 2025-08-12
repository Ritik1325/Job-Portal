import express from 'express';
import protect from '../middleware/protect.js';
import checkRole from '../middleware/checkRole.js';
import userAsRole from '../controllers/userController.js';


const router=express.Router();


router.get('/user',protect,checkRole('employer','jobseeker'),userAsRole);








export default router;