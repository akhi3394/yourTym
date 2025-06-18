import React from 'react';

const CategoryGrid = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-6">
      {categories.map((category, index) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick(category)}
          className="bg-accent border border-[#B4B4B4] rounded-lg h-[120px] flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-orange-200 transition-colors"
        >
          <div className="w-[81px] h-[81px] rounded-[10px] mb-2 flex items-center justify-center">
            <img 
              src={category.image} 
              alt={category.title} 
              className="w-[81px] h-[81px] object-fill rounded-[10px]"
            />
          </div>
          <p className="text-xs text-center font-medium text-gray-800 leading-tight">
            {category.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;