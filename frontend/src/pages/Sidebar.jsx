import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { authUser } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/friends", icon: UsersIcon, label: "Friends" },
    { path: "/notifications", icon: BellIcon, label: "Notifications" }
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-base-200 via-base-100 to-base-300/80 border-r border-base-300/50 backdrop-blur-xl hidden lg:flex flex-col h-screen sticky top-0 shadow-2xl shadow-black/10">
      {/* Header with floating effects */}
      <div className="p-5 border-b border-base-300/30 relative overflow-hidden">
        {/* Animated background bubbles */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-secondary/5 rounded-full animate-pulse delay-1000"></div>
        
        <Link 
          to="/" 
          className="flex items-center gap-3 group relative z-10"
        >
          <div className="relative transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <ShipWheelIcon className="size-9 text-primary drop-shadow-lg relative z-10" />
          </div>
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider relative">
            Streamify
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-700 ease-out"></span>
          </span>
        </Link>
      </div>

      {/* Navigation with enhanced effects */}
      <nav className="flex-1 p-4 space-y-2 relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 ${
                isActive 
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-lg shadow-primary/10" 
                  : "hover:bg-base-300/50 hover:shadow-md border border-transparent"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full shadow-lg shadow-primary/30"></div>
              )}
              
              {/* Hover bubble effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                isActive ? "opacity-100" : ""
              }`}></div>
              
              {/* Icon with enhanced effects */}
              <div className="relative z-10">
                <Icon className={`size-5 transition-all duration-300 group-hover:scale-110 ${
                  isActive 
                    ? "text-primary drop-shadow-lg" 
                    : "text-base-content/70 group-hover:text-primary"
                }`} />
              </div>
              
              {/* Text with gradient effect */}
              <span className={`font-semibold transition-all duration-300 relative z-10 ${
                isActive 
                  ? "text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary" 
                  : "text-base-content group-hover:text-base-content"
              }`}>
                {item.label}
              </span>

              {/* Floating particles on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-200"></div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Enhanced User Profile Section */}
      <div className="p-4 border-t border-base-300/30 mt-auto bg-base-200/50 backdrop-blur-sm relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-all duration-500"></div>
        
        <div className="flex items-center gap-3 relative z-10 group cursor-pointer transform hover:scale-105 transition-all duration-300">
          {/* Avatar with enhanced effects */}
          <div className="avatar relative">
            <div className="w-12 rounded-2xl border-2 border-transparent group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500 ease-out overflow-hidden">
              <img 
                src={authUser?.profilepic} 
                alt="User Avatar" 
                className="transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Online status with pulse */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-base-200 rounded-full animate-pulse shadow-lg"></div>
          </div>
          
          {/* User info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-base-content truncate group-hover:text-primary transition-colors duration-300">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success flex items-center gap-1.5 font-medium">
              <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">Online</span>
            </p>
          </div>

          {/* Hover glow effect */}
          <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
        </div>
      </div>

      {/* Floating background elements using Tailwind animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-6 w-12 h-12 bg-primary/5 rounded-full animate-bounce opacity-60 [animation-duration:6s]"></div>
        <div className="absolute bottom-1/3 -right-4 w-8 h-8 bg-secondary/5 rounded-full animate-bounce opacity-40 [animation-duration:8s] [animation-delay:2s]"></div>
        <div className="absolute top-2/3 left-8 w-6 h-6 bg-accent/5 rounded-full animate-bounce opacity-50 [animation-duration:7s] [animation-delay:1s]"></div>
      </div>
    </aside>
  );
};

export default Sidebar;