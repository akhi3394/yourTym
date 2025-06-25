import React from "react";

const CategoryGrid = ({
  subCategories,
  onSubCategoryClick,
  selectedCategory = "packages",
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-600">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">Error: {error}</div>;
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
      {subCategories?.map((subCategory) => {
        const isSelected = selectedCategory === subCategory.sectionId;

        return (
          <div
            key={subCategory?._id}
            onClick={() => onSubCategoryClick(subCategory)}
            className={`
              border rounded-lg h-[120px] flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg transform scale-105"
                  : "bg-accent border-[#B4B4B4] hover:bg-orange-200 hover:border-orange-300"
              }
            `}
          >
            <div className="w-[81px] h-[81px] rounded-[10px] mb-2 flex items-center justify-center">
              <img
                src={subCategory?.image}
                alt={subCategory?.name}
                className={`
                  w-[81px] h-[81px] object-fill rounded-[10px] transition-all duration-200
                  ${isSelected ? "brightness-110" : ""}
                `}
              />
            </div>
            <p
              className={`
              text-xs text-center font-medium leading-tight transition-colors duration-200
              ${isSelected ? "text-white font-semibold" : "text-gray-800"}
            `}
            >
              {subCategory?.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
