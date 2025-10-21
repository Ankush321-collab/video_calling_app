
import { useEffect, useState } from "react";
import getallrecommend from "../context/Getrecommend";
import REcommendCard from "./REcommendCard";
import { axiosinstance } from "../lib/AxiosInstances";

const RecommendFriend = () => {
  const { allrecommend, loading } = getallrecommend();
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    const fetchOutgoingRequests = async () => {
      try {
        setLoadingRequests(true);
        const response = await axiosinstance.get("/friendrequestout", {
          withCredentials: true,
        });
        setOutgoingRequests(response.data);
      } catch (error) {
        console.error("Error fetching outgoing requests:", error);
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchOutgoingRequests();
  }, []);

  if (loading || loadingRequests) {
    return (
     
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading recommendations...</p>
      </div>
    );
  }

  if (!allrecommend || allrecommend.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No recommendations found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {allrecommend.map((friend) => {
        const hasRequestPending = outgoingRequests.some(
          (req) => req.receiver._id === friend._id
        );
        return (
          <REcommendCard 
            key={friend._id} 
            friend={friend} 
            alreadyRequested={hasRequestPending}
          />
        );
      })}
    </div>
  );
};

export default RecommendFriend;
