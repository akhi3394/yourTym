import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchCategoriesQuery, useGetMostSearchedQuery } from '../store/api/profileApi';
import { useAppSelector } from '../hooks/useAppSelector';
import SearchIcon from '../assets/svgs/searchIcon.svg';
import CircularLoader from './CircularLoader';
import recentSearch from '/recent-search.svg'
import { useNavigate } from 'react-router-dom';


// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const SearchBar = ({ setShowLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const searchRef = useRef(null);
  const navigate = useNavigate()




  // Handle search input change with debouncing
  const handleSearchChange = (e) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    setSearchTerm(e.target.value);
  };

  // Debounced function to update search term
  const updateDebouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchTerm(value);
    }, 300),
    []
  );

  // Update debounced search term when searchTerm changes
  useEffect(() => {
    updateDebouncedSearch(searchTerm);
  }, [searchTerm, updateDebouncedSearch]);

  // Fetch search categories
  const { data: categoryData, isLoading, isFetching, error } = useSearchCategoriesQuery(debouncedSearchTerm, {
    skip: !debouncedSearchTerm || !isAuthenticated,
  });

  // Fetch most searched queries
  const { data: mostSearchedData } = useGetMostSearchedQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Handle click outside to close popup and clear search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsInputFocused(false);
        setSearchTerm('');
        setDebouncedSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);

  return (
    <div className="relative w-full max-w-[600px]" ref={searchRef}>
      <div className="flex-1 relative">
        <img
          src={SearchIcon}
          alt="searchIcon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[16px] h-[16px]"
        />
        <input
          type="text"
          placeholder="Search for ..."
          value={searchTerm}
          onFocus={() => setIsInputFocused(true)}
          onChange={handleSearchChange}
          className="w-full h-[40px] border border-[#E5E5E5] rounded-[8px] pl-10 pr-4 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#FF5534] focus:border-[#FF5534] placeholder-[#999999]"
        />
      </div>

      {/* Search Results and History Dropdown */}
      {(isInputFocused || debouncedSearchTerm) && (
        <div className="absolute top-[48px] left-0 right-0 bg-white border border-[#E5E5E5] rounded-[8px] shadow-lg z-50">
          {debouncedSearchTerm && (
            <div className="max-h-[200px] overflow-y-auto">
              {(isLoading || isFetching) && (
                <div className="p-4 text-center text-[#333333] flex justify-center">
                  <CircularLoader size={20} />
                </div>
              )}
              {error && (
                <div className="p-4 text-center text-[#FF5534]">
                  Error: {error.message || 'Something went wrong'}
                </div>
              )}
              {categoryData?.data?.length > 0 && !isLoading && !isFetching && (
                <ul className="divide-y divide-[#E5E5E5]">
                  {categoryData.data.map((item) => {
                    const mainCategoryName = item?.mainCategoryId?.name || "";
                    const serviceName = item?.title || "";
                    const categoryName = item?.categoryId?.name || "";

                    // Convert "Salon for Women" → "women"
                    let path = "";
                    if (mainCategoryName.toLowerCase().includes("women")) {
                      path = "/women/products";
                    } else if (mainCategoryName.toLowerCase().includes("men (luxe)")) {
                      path = "/men/premium";
                    } else if (mainCategoryName.toLowerCase().includes("men")) {
                      path = "/men/classic";
                    } else {
                      path = "/products";
                    }

                    return (
                      <li
                        key={item._id}
                        className="p-4 hover:bg-[#F5F5F5] cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          setIsInputFocused(false);
                          setSearchTerm('');
                          setDebouncedSearchTerm("");

                          navigate(`${path}?category=${encodeURIComponent(categoryName)}&service=${encodeURIComponent(serviceName)}`);
                        }}

                      >
                        <span className="text-[#333333] text-[14px]">{serviceName}</span>
                        <span className="text-[#FF5534] text-[14px] font-medium">
                          ₹{item.location[0]?.discountPrice || item.location[0]?.originalPrice}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {debouncedSearchTerm && !isLoading && !isFetching && categoryData?.data?.length === 0 && (
                <div className="p-4 text-center text-[#333333]">
                  No results found
                </div>
              )}
            </div>
          )}
          {isInputFocused && !debouncedSearchTerm && mostSearchedData?.data?.length > 0 && (
            <div className="max-h-[200px] overflow-y-auto mt-2 pt-2 ">
              <div className="p-2 text-[#333333] font-medium text-center border-dashed  border-b-2">Search History</div>
              <ul className="">
                {[...mostSearchedData.data]
                  .sort((a, b) => b.searchCount - a.searchCount)
                  .slice(0, 10)
                  .map((item) => (
                    <li
                      key={item.searchQuery}
                      className="p-2 hover:bg-[#F5F5F5] cursor-pointer text-[#333333] text-[14px] border-dashed  border-b-2"
                      onClick={() => setSearchTerm(item.searchQuery)}
                    >
                      <span className='flex gap-5'>
                        <img src={recentSearch} alt="" />
                        {item.searchQuery}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;