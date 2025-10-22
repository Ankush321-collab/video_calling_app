import axios from "axios";

// Use env override in deployments; fallback to production API; strip trailing slash
const RAW = import.meta.env?.VITE_API_URL || "https://video-calling-app-10pu.onrender.com/api";
const API_BASE_URL = RAW.replace(/\/$/, "");

export const axiosinstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});