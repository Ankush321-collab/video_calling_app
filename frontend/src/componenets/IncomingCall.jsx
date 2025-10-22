import React from "react";

const IncomingCall = ({ open, callerName, onAccept, onDecline, isOutgoing = false }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-100 w-full max-w-md rounded-3xl shadow-2xl p-8 mx-4 transform animate-scaleIn border border-base-content/10 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>
        
        {/* Glowing orbs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10 flex items-start gap-4">
          <div className="avatar placeholder group">
            <div className="bg-gradient-to-br from-primary to-secondary text-primary-content w-16 h-16 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
              <span className="text-3xl animate-bounce">📞</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {isOutgoing ? "Start video call?" : "Incoming video call"}
            </h3>
            <p className="text-sm opacity-80 mt-2 font-medium">
              {isOutgoing 
                ? `Do you want to call ${callerName}?` 
                : `${callerName || "Someone"} is calling you`
              }
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
          <button 
            className="btn btn-success relative overflow-hidden group shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
            onClick={onAccept}
          >
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              {isOutgoing ? "📹 Call" : "✅ Accept"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            className="btn btn-error relative overflow-hidden group shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
            onClick={onDecline}
          >
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              {isOutgoing ? "❌ Cancel" : "📵 Decline"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
