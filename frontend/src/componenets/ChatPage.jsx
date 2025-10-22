import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import "stream-chat-react/dist/css/v2/index.css";

const API_KEY = import.meta.env.VITE_VIDEO_KEY;

const ChatPage = () => {
  const { id: targetId } = useParams();
  const [authuser] = useAuth();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [targetUser, setTargetUser] = useState(null);

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
      } catch (err) {
        console.error("Error initializing chat:", err);
        setError("Could not connect to chat: " + err.message);
        toast.error("Could not connect to chat");
      } finally {
        setLoading(false);
      }
    };
    initChat();

    // Cleanup
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [token, authuser, targetId, targetUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            className="btn btn-primary mt-4" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!chatClient || !channel) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Initializing chat...</p>
      </div>
    );
  }

  // Handle video call
  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `Join the video call: ${callUrl}`,
      });
      window.open(callUrl, "_blank");
      toast.success("Video call initiated!");
    }
  };

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
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
    </div>
  );
};

export default ChatPage;
