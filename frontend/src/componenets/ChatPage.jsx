import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getstreamtoken } from "../context/GetToken";
import { axiosinstance } from "../lib/AxiosInstances";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CallButton from "./CallButton";
import IncomingCall from "./IncomingCall";
import "stream-chat-react/dist/css/v2/index.css";

const API_KEY = import.meta.env.VITE_VIDEO_KEY;

const ChatPage = () => {
  const { id: targetId } = useParams();
  const navigate = useNavigate();
  const [authuser] = useAuth();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const [incomingCall, setIncomingCall] = useState({ open: false, callId: null, callerName: null, callUrl: null });
  const [outgoingCall, setOutgoingCall] = useState({ open: false, callId: null });

  console.log("ChatPage - authuser:", authuser);
  console.log("ChatPage - targetId:", targetId);
  console.log("ChatPage - API_KEY:", API_KEY);

  // Fetch target user details
  useEffect(() => {
    const fetchTargetUser = async () => {
      if (!targetId) return;
      
      try {
        const response = await axiosinstance.get(`/user/${targetId}`, {
          withCredentials: true,
        });
        setTargetUser(response.data);
        console.log("Target user fetched:", response.data);
      } catch (error) {
        console.error("Error fetching target user:", error);
      }
    };
    fetchTargetUser();
  }, [targetId]);

  // Fetch Stream token
  useEffect(() => {
    const fetchStreamToken = async () => {
      if (!authuser) {
        console.log("No authuser, skipping token fetch");
        return;
      }
      
      try {
        console.log("Fetching Stream token...");
        const response = await getstreamtoken();
        console.log("Token response:", response);
        
        if (response?.success && response?.token) {
          setToken(response.token);
          console.log("Token set successfully");
        } else {
          const errorMsg = response?.message || "Invalid token response";
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } catch (error) {
        console.error("Error fetching Stream token:", error);
        setError("Failed to get Stream token");
        toast.error("Failed to get Stream token");
      }
    };
    fetchStreamToken();
  }, [authuser]);

  // Initialize Stream Chat
  useEffect(() => {
    const initChat = async () => {
      if (!token || !authuser || !targetId || !targetUser) {
        console.log("Missing requirements:", { 
          token: !!token, 
          authuser: !!authuser, 
          targetId,
          targetUser: !!targetUser 
        });
        return;
      }

      if (!API_KEY) {
        const errorMsg = "Stream API key is not configured";
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      try {
        console.log("Initializing Stream Chat...");
        const client = StreamChat.getInstance(API_KEY);
        
        await client.connectUser(
          {
            id: authuser._id,
            name: authuser.fullname || authuser.name,
            image: authuser.profilepic,
          },
          token
        );
        console.log("User connected to Stream");

        // Upsert the target user with their full details
        try {
          await client.upsertUser({
            id: targetUser._id,
            name: targetUser.fullname,
            image: targetUser.profilepic || "https://via.placeholder.com/150",
          });
          console.log("Target user upserted to Stream");
        } catch (upsertError) {
          console.log("Target user upsert warning:", upsertError.message);
        }

        const channelId = [authuser._id, targetId].sort().join("-");
        console.log("Creating channel:", channelId);
        
        const currentChannel = client.channel("messaging", channelId, {
          members: [authuser._id, targetId],
        });

        await currentChannel.watch();
        console.log("Channel ready");

        setChatClient(client);
        setChannel(currentChannel);

        // Listen for incoming call invites
        const unsubscribe = currentChannel.on("message.new", (event) => {
          try {
            const msg = event.message;
            if (!msg) return;
            // Only react to call invites from others
            if (msg.callInvite && msg.callerId !== authuser._id) {
              const callerName = msg.callerName || "Someone";
              setIncomingCall({
                open: true,
                callId: msg.callId,
                callerName,
                callUrl: msg.callUrl || `${window.location.origin}/call/${msg.callId}`,
              });
              toast(`Incoming video call from ${callerName}`, { icon: "📞" });
            }
          } catch (e) {
            console.error("Error handling incoming call invite:", e);
          }
        });

        // cleanup listener on unmount or channel change
        return () => {
          if (unsubscribe && typeof unsubscribe.unsubscribe === "function") {
            unsubscribe.unsubscribe();
          }
        };
      } catch (err) {
        console.error("Error initializing chat:", err);
        setError("Could not connect to chat: " + err.message);
        toast.error("Could not connect to chat");
      } finally {
        setLoading(false);
      }
    };
    const cleanupPromise = initChat();

    // Cleanup
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [token, authuser, targetId, targetUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
        <div className="text-center relative">
          <div className="relative">
            <div className="loading loading-spinner loading-lg text-primary animate-pulse"></div>
            <div className="absolute inset-0 loading loading-spinner loading-lg text-secondary opacity-30 blur-sm"></div>
          </div>
          <p className="mt-6 text-lg font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
            Loading chat...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-error/10 via-base-300 to-error/10">
        <div className="text-center backdrop-blur-xl bg-base-100/80 p-8 rounded-3xl shadow-2xl border border-error/20 transform hover:scale-105 transition-all duration-300">
          <div className="text-6xl mb-4 animate-bounce">⚠️</div>
          <p className="text-error text-lg font-semibold mb-2">{error}</p>
          <button 
            className="btn btn-primary mt-6 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300" 
            onClick={() => window.location.reload()}
          >
            <span className="relative z-10 flex items-center gap-2">
              🔄 Retry
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  if (!chatClient || !channel) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
        <div className="flex items-center gap-3 backdrop-blur-xl bg-base-100/60 px-6 py-4 rounded-2xl shadow-xl border border-base-content/10">
          <div className="loading loading-ring loading-md text-primary"></div>
          <p className="text-lg font-medium">Initializing chat...</p>
        </div>
      </div>
    );
  }

  // Handle video call
  const handleVideoCall = () => {
    if (channel) {
      const callId = channel.id; // reuse channel id as call id
      // Show confirmation modal instead of directly navigating
      setOutgoingCall({ open: true, callId });
    }
  };

  const confirmVideoCall = () => {
    if (channel && outgoingCall.callId) {
      const callUrl = `${window.location.origin}/call/${outgoingCall.callId}`;
      channel.sendMessage({
        text: `Incoming video call`,
        callInvite: true,
        callId: outgoingCall.callId,
        callUrl,
        callerId: authuser._id,
        callerName: authuser.fullname || authuser.name,
      });
      // Navigate to the call page
      navigate(`/call/${outgoingCall.callId}`);
      toast.success("Connecting to video call...");
      setOutgoingCall({ open: false, callId: null });
    }
  };

  const cancelVideoCall = () => {
    setOutgoingCall({ open: false, callId: null });
    toast("Video call cancelled", { icon: "❌" });
  };

  return (
    <div className="h-[93vh] relative overflow-hidden bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative h-full backdrop-blur-sm">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
      {/* Incoming call modal */}
      <IncomingCall
        open={incomingCall.open}
        callerName={incomingCall.callerName}
        onAccept={() => {
          // Navigate directly to the call route
          if (incomingCall.callId) navigate(`/call/${incomingCall.callId}`);
          setIncomingCall({ open: false, callId: null, callerName: null, callUrl: null });
        }}
        onDecline={() => setIncomingCall({ open: false, callId: null, callerName: null, callUrl: null })}
      />
      {/* Outgoing call confirmation modal */}
      <IncomingCall
        open={outgoingCall.open}
        callerName={targetUser?.fullname || "this user"}
        onAccept={confirmVideoCall}
        onDecline={cancelVideoCall}
        isOutgoing={true}
      />
    </div>
  );
};

export default ChatPage;
