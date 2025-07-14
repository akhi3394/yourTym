import React, { useState, useEffect, useCallback } from 'react';
import { useSearchCategoriesQuery } from '../store/api/profileApi';
import { useAppSelector } from '../hooks/useAppSelector';
import SearchIcon from '../assets/svgs/searchIcon.svg';
import CircularLoader from './CircularLoader';

const SearchBar = ({ setShowLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Handle search input change with debouncing
  const handleSearchChange = (e) => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      setSearchTerm(e.target.value);
    }
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

  const { data, isLoading, isFetching, error } = useSearchCategoriesQuery(debouncedSearchTerm, {
    skip: !debouncedSearchTerm, // Skip query if debouncedSearchTerm is empty
  });

  return (
    <div className="relative w-full max-w-[600px]">
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
          onChange={handleSearchChange}
          className="w-full h-[40px] border border-[#E5E5E5] rounded-[8px] pl-10 pr-4 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#FF5534] focus:border-[#FF5534] placeholder-[#999999]"
        />
      </div>

      {/* Search Results Dropdown */}
      {(debouncedSearchTerm && (isLoading || isFetching || error || (data?.data?.length > 0))) && (
        <div className="absolute top-[48px] left-0 right-0 bg-white border border-[#E5E5E5] rounded-[8px] shadow-lg max-h-[300px] overflow-y-auto z-50">
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
          {data?.data?.length > 0 && !isLoading && !isFetching && (
            <ul className="divide-y divide-[#E5E5E5]">
              {data.data.map((item) => (
                <li
                  key={item._id}
                  className="p-4 hover:bg-[#F5F5F5] cursor-pointer flex justify-between items-center"
                >
                  <span className="text-[#333333] text-[14px]">
                    {item.title}
                  </span>
                  <span className="text-[#FF5534] text-[14px] font-medium">
                    ₹{item.location[0]?.discountPrice || item.location[0]?.originalPrice}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {debouncedSearchTerm && !isLoading && !isFetching && data?.data?.length === 0 && (
            <div className="p-4 text-center text-[#333333]">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;