import User from "../model/user.model"

export const getrecommend=async(req,res)=>{
    try{
        const currentid=req.user.id
        const currentuser=req.user

        const recommenduser=await User.findById({
            $and:[
                {_id:{$ne:currentid}},
                {_id:{$nin:currentuser.friends}},
                {
                    isonboarded:true
                }

        ]})
        res.status(200).json(recommenduser)

    }
    catch(error){

    }
}