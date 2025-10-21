import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { axiosinstance } from "../lib/AxiosInstances";

const getallfriendrequest=()=>{

    const[friendrequest,setfriendrequest]=useState([]);
    const[loading,setloading]=useState(false);


    useEffect(()=>{

        const getrequest=async()=>{

            const response=await axiosinstance("")

        }

    },[])



}