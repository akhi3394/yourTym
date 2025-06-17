import React from "react";
import ProfileSection from "../components/ProfileSection";
import MenuSection from "../components/MenuSection";

function Profile() {
  return (
    // Add padding-top equal to navbar height (120px) to prevent content hiding
    <div className="min-h-screen bg-gray-50 pt-[120px]">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <ProfileSection />
          </div>

          {/* Right Column - Menu */}
          <div className="lg:col-span-2">
            <MenuSection />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
