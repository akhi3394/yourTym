// Index.jsx

import AfterLoginContent from "../components/AfterLoginContent";
import BeforeLoginContent from "../components/BeforeLoginContent";
import { useAppSelector } from "../hooks/useAppSelector";


const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="p-4">
      {isAuthenticated ? <AfterLoginContent/> : <BeforeLoginContent/>}
    </div>
  );
};

export default Index;
