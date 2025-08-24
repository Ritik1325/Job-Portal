import Job from "../models/Jobmodel.js";
import User from "../models/usermodel.js";




export const getAllJobs=async(req,res)=>{
    try {
        const jobs= await Job.find({}).populate("createdBy",'name email').sort({createdAt:-1});
        if(!jobs){
            return res.status(401).json({message:"error fetching jobs"});
        }
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({message:error});
        
    }

}

export const createJobs = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({message:"Login first"});
        }
        const { title, description, location, company, mode } = req.body;

        const newJob = await  Job.create({
            title,
            description,
            location,
            company,
            mode,
            createdBy: userId,

        })

        const user=await User.findById(userId);
        const jobId=newJob.id || newJob._id;
        

        user.jobs.push(jobId);
        await user.save();

        return res.status(201).json({newJob});


    } catch (error) {
        console.log("Rendering")
        return res.status(500).json({message:error.message});

    }
}

export const deleteJobs = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);
        const userId=req.user.id || req.user._id;
        const user=await User.findById(userId);
        

        if (!job) {
            return res.status(401).json({message:"error deleting Job"});
        }

        if (job.createdBy.toString() !== (req.user?.id || req.user._id).toString()) {
            return res.status(403).json({message:'not authorized to delete'});
        }

        user.jobs=user.jobs.filter(Job=>Job.toString() !== id.toString());
        await user.save();

        await job.deleteOne();



        return res.status(200).json({message:"deleted successfully"});



    } catch (error) {

        return res.status(500).json(error);

    }
}


export const updateJobs = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, company, mode ,location} = req.body;

        const job = await Job.findById(id);


        if (!job) {
            return res.status(401).json({message:"error updating Job"});
        }

        if (job.createdBy.toString() !== (req.user?.id || req.user._id).toString()) {
            return res.status(403).json({message:'not authorized to update'});
        }



        job.title = title || job.title;
        job.description = description || job.description;
        job.company = company || job.company;
        job.location=location || job.location;
        job.mode=mode || job.mode;


        await job.save();



        return res.status(200).json({message:"updated successfully"});



    } catch (error) {

        return res.status(500).json(error);

    }
}


export const applyJobs = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const userId = req.user?.id || req.user?._id;

        const job = await Job.findById(jobId);
        const user = await User.findById(userId);


        if (!job || !user) {
            return res.status(401).json({message:"not Authorized to apply"})
        }

        if (job.createdBy.toString() === userId.toString()) {
            return res.status(403).json({message:"not Authorized to apply"});
        }

        if (job.applicants.includes(userId) && user.jobs.includes(jobId)) {
            return res.status(400).json({message:"Already applied"});
        }

        job.applicants.push(userId);
        user.jobs.push(jobId);

        await job.save();
        await user.save();

        return res.status(200).json({message:"applied"})




    } catch (error) {
        return res.status(500).json({message:error})

    }

}


export const appliedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id || req.user?._id).populate('jobs', 'title location company mode');

        if (!user) {
            return res.status(401).json({message:"error fetching user"});
        }

        return res.status(200).json({Jobs:user.jobs});



    } catch (error) {
        return res.status(500).json({message:error});


    }

}

export const myJobs = async (req, res) => {
    try {
        const userId=req.user.id || req.user._id;
        const user = await User.findById(userId).populate("jobs",'title description mode location company');

        if (!user) {
            return res.status(401).json({message:"error getting User"});
        }

        
            return res.status(200).json({Jobs:user.jobs});
      



    } catch (error) {

        return res.status(500).json({message: error.message});


    }


}


export const withdrawReq = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id || req.user?._id;

        const job = await Job.findById(id);
        const user = await User.findById(userId);


        if (!job || !user) {
            return res.status(401).json({message:"error getting Jobs "})
        }

        if(!job.applicants.includes(userId)){
            return res.status(400).json({message:"Not Applied"});
        }


        job.applicants = job.applicants.filter(applicant => applicant.toString() !== userId.toString());
        user.jobs = user.jobs.filter(job => job.toString() !== id.toString());


        await job.save();
        await user.save();

        return res.status(200).json({message:"withdrawn"});


    } catch (error) {

        return res.status(500).json({message:error})

    }

}


export const bookmarkJob = async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id || req.user?._id;


        const job=await Job.findById(id);
        const user=await User.findById(userId);

        if(!job || !user){
            return res.status(400).json({message:"Job or User not found"});
        }

        if(user.bookmarks.includes(id)){
           user.bookmarks=user.bookmarks.filter(bookmark=>bookmark.toString() !== id.toString());
           await user.save();
           return res.status(200).json({message:"removed from bookmark"});
           
        }else{
             user.bookmarks.push(id);
             await user.save();
        }

       

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({message:error});

    }


}



  


export const getBookmarkJobs=async(req,res)=>{
    try {
        const user=await User.findById(req.user?.id || req.user?._id).populate('bookmarks','title company location mode');

        if(!user){
            return res.status(403).json("error getting user");
        }

        return res.status(200).json({Jobs:user.bookmarks});
        
    } catch (error) {

        return res.status(500).send({message:error});
        
    }
}


