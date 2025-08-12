import express from 'express'
import { appliedJobs, applyJobs, bookmarkJob, createJobs, deleteJobs, getAllJobs, getBookmarkJobs, myJobs, updateJobs, withdrawReq } from '../controllers/jobControllers.js';
import protect from '../middleware/protect.js';
import checkRole from '../middleware/checkRole.js';



const router=express.Router();


router.get('/jobs',getAllJobs);
router.post('/jobs',protect,checkRole("employer"),createJobs);
router.delete('/jobs/:id',protect,checkRole("employer"),deleteJobs);
router.put('/jobs/:id',protect,checkRole("employer"),updateJobs);
router.post('/jobs/apply/:id',protect,checkRole("jobseeker"),applyJobs);
router.get('/jobs/appliedjobs',protect,checkRole("jobseeker"),appliedJobs);
router.get('/jobs/myjobs',protect,checkRole("employer"),myJobs);
router.post('/jobs/withdraw/:id',protect,checkRole("jobseeker"),withdrawReq);

router.post('/jobs/bookmarks/:id',protect,checkRole("jobseeker"),bookmarkJob);


router.get('/jobs/bookmarks',protect,checkRole("jobseeker"),getBookmarkJobs)







export default router;
