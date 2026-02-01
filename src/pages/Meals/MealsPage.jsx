import React, { useState, useEffect } from 'react';
import Container from '../../components/Layout/Container';
import MealCard from '../../components/Cards/MealCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import MealCardSkeleton from '../../components/Loaders/MealCardSkeleton';
import { FaSearch, FaTimes } from 'react-icons/fa';

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 10;

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [deliveryAreaFilter, setDeliveryAreaFilter] = useState('');

  // Debounced search (optional but recommended)
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

  // Auto refetch on filter/sort change (debounced search already handles it)
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, deliveryAreaFilter]);

  return (
    <section className="p-2 lg:p-0 min-h-screen bg-gray-50 dark:bg-gray-950">
      <title>Meals | LocalChefBazaar</title>

      <Container>
        <section className="bg-base-100 w-full py-10 md:py-20 dark:bg-gray-950">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary dark:text-[#628141]">
            All Meals ({meals.length})
          </h2>

          {/* Search & Filter Bar */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-[#628141] dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by meal name, area name or chef..."
                  className="w-full px-5 py-3 pl-12 pr-10 rounded-lg border-2 border-gray-500 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="w-full md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-500 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
              </div>

              {/* Delivery Area Filter */}
              <div className="w-full md:w-48">
                <select
                  value={deliveryAreaFilter}
                  onChange={(e) => setDeliveryAreaFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-500 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">All Areas</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Uttara">Uttara</option>
                  <option value="Mirpur">Mirpur</option>
                  <option value="Banani">Banani</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* <button
                onClick={() => {
                  setPage(1);
                  refetch();
                }}
                className="flex-1 sm:flex-none px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition shadow-md flex items-center justify-center gap-2"
              >
                <FaSearch /> Apply Filters
              </button> */}

              {(searchTerm || sortBy || deliveryAreaFilter) && (
                <button
                  onClick={resetFilters}
                  className="flex-1 sm:flex-none px-8 py-3 bg-[#628141] hover:bg-gray-700 text-white font-semibold rounded-lg transition shadow-md"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Meals Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <MealCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
          ) : meals.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No meals found matching your criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Clear Filters & Show All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {meals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && !isLoading && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={!pagination.hasPrevPage}
                className="px-6 py-3 bg-[#628141] text-white font-medium rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                ← Previous
              </button>

              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Page <span className="text-[#ff8400] font-bold">{pagination.currentPage}</span> of{' '}
                <span className="text-[#ff8400] font-bold">{pagination.totalPages}</span> (
                {pagination.totalMeals} meals)
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!pagination.hasNextPage}
                className="px-6 py-3 bg-[#628141] text-white font-medium rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          )}
        </section>
      </Container>
    </section>
  );
};

export default MealsPage;