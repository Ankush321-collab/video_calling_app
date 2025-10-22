import axios from "axios";

export const axiosinstance=axios.create({
    baseURL:"https://video-calling-app-10pu.onrender.com/",
    withCredentials:true
})