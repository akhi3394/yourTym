import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useAppSelector } from '../hooks/useAppSelector';
import Navbar from '../components/Navbar';
import BeforeLoginContent from '../components/BeforeLoginContent';
import AfterLoginContent from '../components/AfterLoginContent';
import Footer from '../components/Footer';

const AppContent = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="flex-grow">
        {isAuthenticated ? <AfterLoginContent /> : <BeforeLoginContent />}
      </div>      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default Index;