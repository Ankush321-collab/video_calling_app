import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { axiosinstance } from '../lib/AxiosInstances';
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon, UserIcon, BookOpenIcon, GlobeIcon } from "lucide-react";
import {toast} from 'react-toastify'

const Onboarding = () => {
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")
  const navigate = useNavigate()
  const [authuser, setAuthUser] = useAuth()

  const [formdata, setformdata] = useState({
    fullname: authuser?.fullname || "",
    bio: authuser?.bio || "",
    nativelanguage: authuser?.nativelanguage || "",
    learninglanguage: authuser?.learninglanguage || "",
    location: authuser?.location || "",
    profilepic: authuser?.profilepic || "",
  })

  const handlechange = (e) => {
    const { name, value } = e.target
    setformdata({
      ...formdata,
      [name]: value,
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    seterror("")

    try {
      const res = await axiosinstance.post(
        "/onboard",
        {
          fullname: formdata.fullname,
          bio: formdata.bio,
          nativelanguage: formdata.nativelanguage,
          learninglanguage: formdata.learninglanguage,
          location: formdata.location,
          profilepic: formdata.profilepic,
        },
        { withCredentials: true }
      )

      const data = res.data

      // ✅ Update local context + storage after success
      const updatedUser = { ...authuser, isonboarded: true }
      setAuthUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      toast.success(`Onboarding successful for ${data.user.fullname}`)
      navigate("/")
    } catch (error) {
      const msg = error?.response?.data?.errors || "Onboarding Failed"
      seterror(msg)
      toast.error(msg)
    } finally {
      setloading(false)
    }
  }

  const randomprofilepic = () => {
    const idx = Math.floor(Math.random() * 10)
    const randompic = `https://randomuser.me/api/portraits/lego/${idx}.jpg`

    setformdata({
      ...formdata,
      profilepic: randompic,
    })
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/30 to-purple-300/30 dark:from-blue-500/20 dark:to-purple-600/20 animate-float"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="card bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg w-full max-w-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10 transform transition-all duration-500 hover:shadow-3xl">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <ShipWheelIcon className="size-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Let's get to know you better</p>
          </div>
         
          <form onSubmit={handlesubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */} 
            <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white/50 dark:bg-gray-700/30 rounded-2xl border border-gray-200/50 dark:border-gray-600/30 transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/50 hover:scale-[1.02]">
              {/* IMAGE PREVIEW */}
              <div className="relative group">
                <div className="size-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border-4 border-white/80 dark:border-gray-600/80">
                  {formdata.profilepic ? (
                    <img
                      src={formdata.profilepic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700">
                      <CameraIcon className="size-12 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/20 group-hover:to-purple-600/20 transition-all duration-500" />
              </div>

              {/* Generate Random Avatar BTN */}
              <button 
                type="button" 
                onClick={randomprofilepic} 
                className="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 group"
              >
                <ShuffleIcon className="size-4 mr-2 transition-transform duration-300 group-hover:rotate-180" />
                Generate Random Avatar
              </button>
            </div>

            {/* Input Fields Grid */}
            <div className="grid gap-6">
              {/* Full Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <UserIcon className="size-4 text-blue-500" />
                  Full Name
                </label>
                <div className="relative transform transition-all duration-300 group-hover:scale-[1.02]">
                  <input
                    name="fullname"
                    value={formdata.fullname}
                    onChange={handlechange}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full h-12 px-4 pr-12 rounded-2xl bg-white/80 dark:bg-gray-700/80 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 shadow-lg backdrop-blur-sm"
                  />
                  <UserIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </div>

              {/* Bio */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <BookOpenIcon className="size-4 text-purple-500" />
                  Bio
                </label>
                <div className="relative transform transition-all duration-300 group-hover:scale-[1.02]">
                  <textarea
                    name="bio"
                    value={formdata.bio}
                    onChange={handlechange}
                    placeholder="Tell us a bit about yourself..."
                    rows="3"
                    className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/80 dark:bg-gray-700/80 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 shadow-lg backdrop-blur-sm resize-none"
                  />
                  <BookOpenIcon className="absolute right-4 top-4 size-5 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 transition-colors duration-300" />
                </div>
              </div>

              {/* Languages Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Native Language */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <GlobeIcon className="size-4 text-green-500" />
                    Native Language
                  </label>
                  <div className="relative transform transition-all duration-300 group-hover:scale-[1.02]">
                    <input
                      name="nativelanguage"
                      value={formdata.nativelanguage}
                      onChange={handlechange}
                      type="text"
                      placeholder="Your native language"
                      className="w-full h-12 px-4 pr-12 rounded-2xl bg-white/80 dark:bg-gray-700/80 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 shadow-lg backdrop-blur-sm"
                    />
                    <GlobeIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500 group-hover:text-green-500 transition-colors duration-300" />
                  </div>
                </div>

                {/* Learning Language */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <ShipWheelIcon className="size-4 text-orange-500" />
                    Learning Language
                  </label>
                  <div className="relative transform transition-all duration-300 group-hover:scale-[1.02]">
                    <input
                      name="learninglanguage"
                      value={formdata.learninglanguage}
                      onChange={handlechange}
                      type="text"
                      placeholder="Language you're learning"
                      className="w-full h-12 px-4 pr-12 rounded-2xl bg-white/80 dark:bg-gray-700/80 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-300 shadow-lg backdrop-blur-sm"
                    />
                    <ShipWheelIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <MapPinIcon className="size-4 text-red-500" />
                  Location
                </label>
                <div className="relative transform transition-all duration-300 group-hover:scale-[1.02]">
                  <input
                    name="location"
                    value={formdata.location}
                    onChange={handlechange}
                    type="text"
                    placeholder="Where are you from?"
                    className="w-full h-12 px-4 pr-12 rounded-2xl bg-white/80 dark:bg-gray-700/80 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 dark:focus:border-red-400 transition-all duration-300 shadow-lg backdrop-blur-sm"
                  />
                  <MapPinIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 transform transition-all duration-300 hover:scale-[1.01]">
                <p className="text-red-600 dark:text-red-400 text-center font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl active:scale-95 disabled:scale-100 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <LoaderIcon className="size-5 animate-spin" />
                    <span>Setting up your profile...</span>
                  </div>
                ) : (
                  <span className="relative">Complete Profile & Start Learning</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          .animate-float {
            animation: float linear infinite;
          }
          .hover\\:shadow-3xl:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
                        0 0 25px -5px rgba(59, 130, 246, 0.3);
          }
        `}
      </style>

    </div>
  )
}

export default Onboarding