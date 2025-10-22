import { axiosinstance } from "../lib/AxiosInstances"


export const getstreamtoken=async(req,res)=>{
    try{

        const response=await axiosinstance.get("/token",{
            withCredentials:true
        })
        return response.data

    }

    catch(error){
        console.error("Error fetching stream token:", error);
        return {success:false,message:"Failed to fetch token"}

    }
}