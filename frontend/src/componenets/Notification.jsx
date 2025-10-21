import { useEffect, useState } from "react";
import { axiosinstance } from "../lib/AxiosInstances";
import { BellIcon, CheckIcon, ClockIcon, MapPinIcon, MessageSquareIcon, UserCheckIcon, XIcon } from "lucide-react";
import NoNotificationsFound from "../componenets/NotificationNotFound";
import { toast } from "react-hot-toast";

const Notification = () => {
  const [friendRequests, setFriendRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  const getFriendRequests = async () => {
    try {
      setLoading(true);
      const response = await axiosinstance.get("/friendrequest", {
        withCredentials: true,
      });
      console.log("Friend requests response:", response.data);
      setFriendRequests(response.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
      console.error("Error response:", error.response?.data);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (id) => {
    try {
      setProcessing(id);
      await axiosinstance.put(`/acceptrequest/${id}`, {}, { withCredentials: true });
      toast.success("Friend request accepted!");
      await getFriendRequests(); // refresh after accepting
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Failed to accept request");
    } finally {
      setProcessing(null);
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      setProcessing(id);
      await axiosinstance.delete(`/rejectrequest/${id}`, { withCredentials: true });
      toast.success("Friend request rejected");
      await getFriendRequests(); // refresh after rejecting
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      toast.error("Failed to reject request");
    } finally {
      setProcessing(null);
    }
  };

  useEffect(() => {
    getFriendRequests();
  }, []);

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* Incoming Friend Requests */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                    >
                      <div className="card-body p-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="avatar">
                              <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                  src={request.sender.profilepic || "https://via.placeholder.com/150"}
                                  alt={request.sender.fullname}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-1">{request.sender.fullname}</h3>
                              
                              {/* Language Info */}
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className="badge badge-secondary badge-sm">
                                  🗣️ Native: {request.sender.nativelanguage}
                                </span>
                                <span className="badge badge-accent badge-sm">
                                  📚 Learning: {request.sender.learninglanguage}
                                </span>
                              </div>

                              {/* Bio if available */}
                              {request.sender.bio && (
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {request.sender.bio}
                                </p>
                              )}

                              {/* Location if available */}
                              {request.sender.location && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPinIcon className="h-3 w-3" />
                                  {request.sender.location}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              className="btn btn-success btn-sm flex-1 sm:flex-none"
                              onClick={() => handleAcceptRequest(request._id)}
                              disabled={processing === request._id}
                            >
                              <CheckIcon className="h-4 w-4" />
                              Accept
                            </button>
                            <button
                              className="btn btn-error btn-sm flex-1 sm:flex-none"
                              onClick={() => handleRejectRequest(request._id)}
                              disabled={processing === request._id}
                            >
                              <XIcon className="h-4 w-4" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Friend Requests */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notification.receiver.profilepic}
                              alt={notification.receiver.fullname}
                              className="rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{notification.receiver.fullname}</h3>
                            <p className="text-sm my-1">
                              {notification.receiver.fullname} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Notifications */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
