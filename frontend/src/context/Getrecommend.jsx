import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { axiosinstance } from "../lib/AxiosInstances";



const getallrecommend=()=>{

    const [allrecommend,setallrecommend]=useState([])
    const [loading,setlaoding]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        const getrecommend=async()=>{
            setlaoding(true);

            try{
                const response=await axiosinstance.get("recommendfriend",{
                    withCredentials:true
                });
            
            setallrecommend(response.data);
            }
            catch(error){
if (error.response && error.response.status === 401) {
          navigate('/login')
            }

        }

        finally{
            setlaoding(false);
        }
};
getrecommend();
},[navigate])
return {allrecommend,loading};
}

export default getallrecommend;