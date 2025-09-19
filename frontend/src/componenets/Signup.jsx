import React, { useState } from 'react'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { axiosinstance } from '../lib/AxiosInstances'
 const Signup = () => {
    const[loading,setloading]=useState(false);
    const[error,seterror]=useState(false)
    const navigate=useNavigate();

    const[formdata,setformdata]=useState({
        fullname:"",
        email:"",
        password:""


    })


    const handlechange=(e)=>{
        const{name,value}=e.target
        setformdata({
            ...formdata,
            [name]:value
        })
        
    }


    const handlesignup=async()=>{
        setloading(true);
            seterror("")
        try{
            const data=await axiosinstance.post("/signup",{
                fullname:formdata.fullname,
                email:formdata.email,
                password:formdata.password
            },{
                withCredentials:true,
            })
              toast.success("Signup Succesfull done")
       navigate("/login")
            

        }
     
        catch(error){
            const msg=error?.response?.data?.errors || "SignUp Failed"
            seterror(msg)
            toast.error("Something went wrong")

        }

        finally{
            setloading(false)

        }
    }

  return (
    <div className='min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gradient-to-br from-black via-gray-900 to-black'>
  <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-800 transform-gpu transition-all duration-300 hover:scale-105'>
    <h1 className='text-2xl sm:text-3xl font-bold bg-clip-text text-center mb-6 sm:mb-8 bg-gradient-to-r from-[#7a6ff0] via-[#7a69f0] to-[#5e8bff] text-transparent'>
      Create your Account
    </h1>
    {/* firstname */}
    <div className='mb-4 sm:mb-6'>
        <label className='block text-sm font-medium text-grahy-300 mb-2'>
            Fullname
        </label>
        <input
        name="fullname"
        value={formdata.fullname}
        onChange={handlechange}
        type="text"
        placeholder='Enter your fullName'
        className='w-full h-8 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-md'
        />
        
        

    </div>
     <div className='mb-4 sm:mb-6'>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
            Email
        </label>
        <input
        name="email"
        value={formdata.email}
        onChange={handlechange}
        type="text"
        placeholder='Enter your fullName'
        className='w-full h-8 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-md'
        />
        
        

    </div>
     <div className='mb-4 sm:mb-6'>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
            Password
        </label>
        <input
        name="password"
        value={formdata.password}
        onChange={handlechange}
        type="password"
        placeholder='Enter your fullName'
        className='w-full h-8 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-md'
        />
        
        

    </div>
     <div className='mb-4 sm:mb-6 flex justify-center items-center'>
        {error}
     </div>

     <div className='mb-4 sm:mb-6 flex justify-center items-center'>
      
      <button
      disabled={loading}
      onClick={handlesignup}
       className="btn btn-active btn-primary">{loading? "Creating Account..." : "Signup"}</button>
        
        

    </div>
    {/* link */}
    <div className='text-center text-sm text-gray-400'>
        Already have an Account?{' '}
        <Link 
        to={'/login'}
        className='text-[#7a6ff0] font-medium hover:underline transition-colors duration-200'
        >
            Log in
        </Link>
    </div>
  </div>

</div>

  )
}

export default Signup;


