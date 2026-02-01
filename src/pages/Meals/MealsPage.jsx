import React, { useState, useEffect } from 'react';
import Container from '../../components/Layout/Container';
import MealCard from '../../components/Cards/MealCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import MealCardSkeleton from '../../components/Loaders/MealCardSkeleton';
import { FaSearch, FaTimes, FaFilter, FaSortAmountDown } from 'react-icons/fa';

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 10;

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [deliveryAreaFilter, setDeliveryAreaFilter] = useState('');

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: mealsResponse = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['meals', page, debouncedSearch, sortBy, deliveryAreaFilter],
    queryFn: async () => {
      const params = {
        page,
        limit,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(sortBy && { sort: sortBy }),
        ...(deliveryAreaFilter && { deliveryArea: deliveryAreaFilter }),
      };

      const res = await axiosSecure.get('/meals', { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  const meals = mealsResponse.meals || [];
  const pagination = mealsResponse.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalMeals: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortBy('');
    setDeliveryAreaFilter('');
    setPage(1);
  };

  // Auto refetch on filter/sort change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, deliveryAreaFilter]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <title>Meals | LocalChefBazaar</title>

      <Container>
        <section className="w-full py-12 md:py-20">
          
          {/* Page Header */}
          <div className="text-center mb-12">
             <span className="text-[#ff8400] font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                Discover
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#628141] mb-4 berkshire-swash-regular">
              Explore Our Menu ({mealsResponse.pagination?.totalMeals || 0})
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#628141] to-[#ff8400] mx-auto rounded-full"></div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            {/* Decorative Top Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#628141] via-[#ff8400] to-[#628141]"></div>

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              
              {/* Search Input */}
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by meal, chef, or area..."
                  className="w-full px-6 py-4 pl-14 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all shadow-inner"
                />
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#628141] transition-colors text-lg" />

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Filters Group */}
              <div className="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
                
                {/* Sort Dropdown */}
                <div className="relative w-full sm:w-48 group">
                  <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none group-focus-within:text-[#ff8400] transition-colors" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-4 pl-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8400] focus:border-transparent appearance-none cursor-pointer transition-all shadow-sm"
                  >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {/* Delivery Area Filter */}
                <div className="relative w-full sm:w-48 group">
                  <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none group-focus-within:text-[#ff8400] transition-colors" />
                  <select
                    value={deliveryAreaFilter}
                    onChange={(e) => setDeliveryAreaFilter(e.target.value)}
                    className="w-full px-4 py-4 pl-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8400] focus:border-transparent appearance-none cursor-pointer transition-all shadow-sm"
                  >
                    <option value="">All Areas</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Gulshan">Gulshan</option>
                    <option value="Uttara">Uttara</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Banani">Banani</option>
                  </select>
                   {/* Custom Arrow */}
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

              </div>

              {/* Clear Button */}
              {(searchTerm || sortBy || deliveryAreaFilter) && (
                <button
                  onClick={resetFilters}
                  className="px-6 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shadow-sm whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Meals Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <MealCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
          ) : meals.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                <div className="text-6xl mb-4">🍲</div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                No meals found matching your criteria.
              </h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search term.</p>
              <button
                onClick={resetFilters}
                className="px-8 py-3 bg-[#628141] text-white font-bold rounded-full hover:bg-[#4f6b32] transition-colors shadow-lg shadow-green-900/20"
              >
                Clear Filters & Show All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {meals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          )}

          {/* Pagination - Modernized */}
          {pagination.totalPages > 1 && !isLoading && (
            <div className="mt-20">
               <div className="flex flex-col sm:flex-row justify-center items-center gap-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 w-fit mx-auto">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={!pagination.hasPrevPage}
                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-[#628141] hover:text-white disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-700 transition-all"
                  >
                    ← Previous
                  </button>

                  <div className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Page <span className="text-[#ff8400] font-bold text-lg">{pagination.currentPage}</span> of{' '}
                    <span className="text-gray-900 dark:text-white font-bold">{pagination.totalPages}</span>
                  </div>

                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-[#628141] hover:text-white disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-700 transition-all"
                  >
                    Next →
                  </button>
               </div>
               
               <p className="text-center text-sm text-gray-400 mt-4">
                  Showing {meals.length} of {pagination.totalMeals} total meals
               </p>
            </div>
          )}

        </section>
      </Container>
    </section>
  );
};

export default MealsPage;