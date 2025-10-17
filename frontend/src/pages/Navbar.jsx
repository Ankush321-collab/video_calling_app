import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { axiosinstance } from '../lib/AxiosInstances';
import Cookies from 'js-cookie';
import ThemeSelector from './ThemeSelector'
import { toast } from 'react-toastify';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';

const Navbar = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const {authuser} = useAuth();
    const ischatpage=location.pathname?.startsWith('/chat');

    const handlelogout=async()=>{
        try{
           await axiosinstance.post('/logout',{},{
            withCredentials:true
           })
           localStorage.removeItem('user');
           Cookies.remove('jwt');
           localStorage.removeItem("token")
           toast.success("Logout successful");
           navigate('/login');
        }
        catch(error){
          console.log("error:", error);
          toast.error("Logout failed");
        }
    }

  return (
    <nav className="bg-gradient-to-r from-base-200 via-base-100 to-base-200 border-b border-base-300/50 backdrop-blur-lg sticky top-0 z-50 h-16 flex items-center shadow-lg shadow-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {ischatpage && (
            <div className="flex-1">
              <Link 
                to="/" 
                className="flex items-center gap-3 group relative"
              >
                {/* Floating bubble effect */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                  <div className="relative transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out">
                    <ShipWheelIcon className="size-9 text-primary drop-shadow-lg" />
                  </div>
                </div>
                
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider relative">
                  Streamify
                  {/* Underline animation */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500 ease-out"></span>
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Notifications with bubble animation */}
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle relative group transform hover:scale-110 transition-all duration-300 ease-out hover:bg-primary/10 rounded-2xl">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                <BellIcon className="h-6 w-6 text-base-content/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                
                {/* Hover tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-base-300 text-base-content px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-base-300/50">
                  Notifications
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-base-300 rotate-45"></div>
                </div>
              </button>
            </Link>

            {/* Theme Selector */}
            <div className="transform hover:scale-110 transition-all duration-300">
              <ThemeSelector />
            </div>

            {/* Avatar with 3D hover effect */}
            <div className="relative group">
              <div className="avatar">
                <div className="w-10 rounded-2xl border-2 border-transparent group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500 ease-out transform group-hover:scale-110 cursor-pointer overflow-hidden">
                  <img 
                    src={authuser?.profilepic} 
                    alt="User Avatar" 
                    className="transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Floating user info */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-base-300 border border-base-300/50 rounded-xl p-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none min-w-[120px] text-center">
                <div className="text-sm font-semibold text-base-content whitespace-nowrap">
                  {authuser?.username || 'User'}
                </div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-base-300 rotate-45"></div>
              </div>
            </div>

            {/* Logout button with enhanced hover effects */}
            <button 
              className="btn btn-ghost btn-circle group relative transform hover:scale-110 transition-all duration-300 ease-out hover:bg-error/10 rounded-2xl"
              onClick={handlelogout}
            >
              <LogOutIcon className="h-6 w-6 text-base-content/80 group-hover:text-error group-hover:rotate-12 transition-all duration-300" />
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-error/0 group-hover:bg-error/10 rounded-2xl transition-all duration-300"></div>
              
              {/* Hover tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-base-300 text-base-content px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-base-300/50">
                Logout
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-base-300 rotate-45"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/10 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-2 -right-2 w-6 h-6 bg-secondary/10 rounded-full animate-float animation-delay-1000 opacity-40"></div>
        <div className="absolute -bottom-2 left-1/4 w-4 h-4 bg-accent/10 rounded-full animate-float animation-delay-2000 opacity-50"></div>
      </div>
    </nav>
  );
}

export default Navbar;