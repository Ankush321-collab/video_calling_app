import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-4 border-b border-base-content/10 backdrop-blur-xl bg-base-100/80 flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0 z-10 shadow-sm">
      <button 
        onClick={handleVideoCall} 
        className="btn btn-success btn-sm text-white relative overflow-hidden group shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-0"
      >
        <span className="relative z-10 flex items-center gap-2">
          <VideoIcon className="size-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold hidden sm:inline">Video Call</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-lg">
          <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        </div>
      </button>
    </div>
  );
}

export default CallButton;