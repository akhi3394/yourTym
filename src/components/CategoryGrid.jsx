import React from 'react';
import CircularLoader from './CircularLoader';

const CategoryGrid = ({ subCategories, onSubCategoryClick, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-600 h-[400px] flex justify-center items-center">
         <CircularLoader size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!subCategories || subCategories.length === 0) {
    return (
      <div className="text-center py-6 text-gray-600">
        No categories available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 p-6">
      {subCategories?.map((subCategory) => (
        <div
          key={subCategory?._id}
          onClick={() => onSubCategoryClick(subCategory)}
          className="bg-accent border border-[#B4B4B4] rounded-lg h-[120px] flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-orange-200 transition-colors"
        >
          <div className="w-[81px] h-[81px] rounded-[10px] mb-2 flex items-center justify-center">
            <img 
              src={subCategory?.image} 
              alt={subCategory?.name} 
              className="w-[81px] h-[81px] object-fill rounded-[10px]"
            />
          </div>
          <p className="text-xs text-center font-medium text-gray-800 leading-tight">
            {subCategory?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;