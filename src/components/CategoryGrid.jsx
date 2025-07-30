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
    <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 md:p-6 xl:grid-cols-3 xl:gap-3 xl:p-6">
      {subCategories?.map((subCategory) => {
        const sectionId = subCategory.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        return (
          <div
            key={subCategory?._id}
            onClick={() => onSubCategoryClick({ ...subCategory, sectionId })}
            className="bg-accent border border-[#B4B4B4] rounded-lg h-[100px] sm:h-[120px] flex flex-col items-center justify-center p-2 sm:p-3 cursor-pointer hover:bg-orange-200 transition-colors"
          >
            <div className="w-[60px] h-[60px] rounded-[8px] mb-1 sm:w-[81px] sm:h-[81px] sm:rounded-[10px] sm:mb-2 flex items-center justify-center">
              <img 
                src={subCategory?.image} 
                alt={subCategory?.name} 
                className="w-[60px] h-[60px] sm:w-[81px] sm:h-[81px] object-fill rounded-[8px] sm:rounded-[10px]"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-center font-medium text-gray-800 leading-tight">
              {subCategory?.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;