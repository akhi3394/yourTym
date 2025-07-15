
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGetStaticBannersQuery } from "../store/api/profileApi";

const Layout = () => {
  const { data: BannersData, isLoading: bannerLoading } = useGetStaticBannersQuery();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar BannersData={BannersData} bannerLoading={bannerLoading}/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer BannersData={BannersData} bannerLoading={bannerLoading}/>
    </div>
  );
};

export default Layout;
