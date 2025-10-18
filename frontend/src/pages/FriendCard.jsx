import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../../constants/index"

const FriendCard = ({ friend }) => {
  return (
    <div className="group relative bg-gray-100 rounded-2xl border border-gray-200 hover:border-violet-300 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden">
      {/* Subtle background gradient animation on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 p-6">
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="avatar size-14 rounded-2xl overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-gray-50 group-hover:ring-blue-100 transition-all duration-300">
              <img 
                src={friend.profilepic} 
                alt={friend.fullname}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Online indicator pulse */}
            <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white ring-1 ring-green-200" />
          </div>
          <h5 className="font-semibold text-gray-900 truncate text-lg group-hover:text-gray-800 transition-colors">
            {friend.fullname}
          </h5>
        </div>

        {/* Language badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 group-hover:bg-blue-100 group-hover:border-blue-200 transition-colors">
            {getLanguageFlag(friend.nativelanguage)}
            Native: {friend.nativelanguage}
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100 group-hover:bg-emerald-100 group-hover:border-emerald-200 transition-colors">
            {getLanguageFlag(friend.learninglanguage)}
            Learning: {friend.learninglanguage}
          </span>
        </div>

        {/* Message button with enhanced hover effects */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="block w-full py-3 px-4 text-center font-semibold text-gray-700 bg-transparent border-2 border-gray-200 rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-out group/btn"
        >
          <span className="flex items-center justify-center gap-2">
            Message
            <svg 
              className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 w-4 mr-1.5 inline-block rounded-sm"
      />
    );
  }
  return null;
}