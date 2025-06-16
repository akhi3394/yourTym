import { Link } from "react-router-dom";

const WomenProductsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Women's Products</h1>
      <p className="mb-4">Explore our collection of women's products.</p>
      <Link to="/women" className="text-blue-500 hover:underline">
        Back to Women Page
      </Link>
      {/* Add product listing components here */}
    </div>
  );
};

export default WomenProductsPage;