// Index.jsx

import AfterLoginContent from "../components/AfterLoginContent";
import BeforeLoginContent from "../components/BeforeLoginContent";
import { useAppSelector } from "../hooks/useAppSelector";


const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="">
      {isAuthenticated ? <AfterLoginContent/> : <BeforeLoginContent/>}
    </div>
  );
};

export default Index;
