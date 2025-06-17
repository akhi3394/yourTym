import React from "react";
import { LogOut } from "lucide-react";

const ProfileSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 bg-yellow-400 text-black py-2 px-4 rounded-t-lg -mx-6 -mt-6">
        Profile
      </h2>

      {/* Profile Completion */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            <span className="text-white p-1 px-2 rounded-sm font-semibold bg-[#FF5534]">
              56%
            </span>{" "}
            Completed
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Left Side: Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-[#FF5534]">
              <div className="w-[56px] h-[56px] rounded-full border-4 border-white">
                <img
                  src="/profile.svg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <button className="font-bold text-sm mt-2 text-[#FF5534] underline">
            Change{" "}
            <span className="text-black rounded-sm px-1  bg-yellow-400">
              Profile
            </span>
          </button>
        </div>

        {/* Right Side: Profile Form */}
        <div className="flex-1 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              defaultValue="Sam Sunder"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-700 placeholder-opacity-50"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Mail"
              defaultValue="emailid@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-700 placeholder-opacity-50"
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Number"
              defaultValue="+91 1234567890"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-700 placeholder-opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mb-6">
        <button className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors">
          Save
        </button>
      </div>

      {/* Separator for Profile Section */}
      <div className="border-t mt-6"></div>

      {/* Logout */}
      <div className="mt-6">
        <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors w-full">
          <LogOut className="w-4 h-4 text-orange-500" />
          <span>Logout</span>
        </button>
      </div>

      {/* Join as Partner */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-medium text-gray-800 mb-1">Join as a Partner</h3>
        <p className="text-sm text-gray-600">app.version.1.48.5</p>
      </div>
    </div>
  );
};

export default ProfileSection;
