
import getallrecommend from "../context/Getrecommend";
import REcommendCard from "./REcommendCard";

const RecommendFriend = () => {
  const { allrecommend, loading } = getallrecommend();

  if (loading) {
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
      {allrecommend.map((friend) => (
        <REcommendCard key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default RecommendFriend;
