import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getstreamtoken } from "../context/GetToken";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import Loader from "./Loader";

// Use existing env var; fallback if an alternative is provided
const STREAM_API_KEY = import.meta.env.VITE_VIDEO_KEY || import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [token, setToken] = useState(null);

  const [authuser, , isLoading] = useAuth();

  // 1. Fetch Stream token manually
  useEffect(() => {
    const fetchStreamToken = async () => {
      if (!authuser) return;
      try {
        const res = await getstreamtoken();
        if (res?.token) {
          setToken(res.token);
        } else {
          toast.error(res?.message || "Failed to get Stream token");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        toast.error("Failed to fetch Stream token");
      }
    };

    fetchStreamToken();
  }, [authuser]);

  // 2. Initialize Stream Video Client and Join Call
  useEffect(() => {
    const initCall = async () => {
      if (!token || !authuser || !callId) return;

      if (!STREAM_API_KEY) {
        toast.error("Stream API key is not configured");
        setIsConnecting(false);
        return;
      }

      try {
        const user = {
          id: authuser._id,
          name: authuser.fullname || authuser.name,
          image: authuser.profilepic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [token, authuser, callId]);

  // 3. Show loader while connecting or loading user
  if (isLoading || isConnecting) return <Loader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) {
    navigate("/");
    return null;
  }

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;