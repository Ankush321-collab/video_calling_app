import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { axiosinstance } from '../lib/AxiosInstances'

 const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();

  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosinstance.post("/login", {
        email: formdata.email,
        password: formdata.password
      }, {
        withCredentials: true,
      });

      const data = res.data;

      toast.success(`Welcome back ${data.user.fullname}`);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setAuthUser(data.user);
      navigate("/");

    } catch (error) {
      const msg =
        error?.response?.data?.errors ||
        error?.response?.data?.message ||
        "Login Failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gradient-to-br from-black via-gray-900 to-black'>
      <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-800 transform-gpu transition-all duration-300 hover:scale-105'>
        <h1 className='text-2xl sm:text-3xl font-bold bg-clip-text text-center mb-6 sm:mb-8 bg-gradient-to-r from-[#7a6ff0] via-[#7a69f0] to-[#5e8bff] text-transparent'>
          Login To Your Account
        </h1>

        <div className='mb-4 sm:mb-6'>
          <label className='block text-sm font-medium text-gray-300 mb-2'>Email</label>
          <input
            name="email"
            value={formdata.email}
            onChange={handleChange}
            type="text"
            placeholder='Enter your email'
            className='w-full h-8 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-md'
          />
        </div>

        <div className='mb-4 sm:mb-6'>
          <label className='block text-sm font-medium text-gray-300 mb-2'>Password</label>
          <input
            name="password"
            value={formdata.password}
            onChange={handleChange}
            type="password"
            placeholder='Enter your password'
            className='w-full h-8 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-md'
          />
        </div>

        {/* Show Error */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className='mb-4 sm:mb-6 flex justify-center items-center'>
          <button
            disabled={loading}
            onClick={handleLogin}
            className="btn btn-active btn-primary"
          >
            {loading ? "Login..." : "Login"}
          </button>
        </div>

        <div className='text-center text-sm text-gray-400'>
          Don&apos;t have an Account?{' '}
          <Link
            to={'/signup'}
            className='text-[#7a6ff0] font-medium hover:underline transition-colors duration-200'
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;


