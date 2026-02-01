import React, { useState } from 'react';
import Container from '../../components/Layout/Container';
import MealCard from '../../components/Cards/MealCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import MealCardSkeleton from '../../components/Loaders/MealCardSkeleton';

const Meals = () => {
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const limit = 10;

    const {
        data: mealsResponse = {},
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["meals", page],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals", {
                params: { page, limit },
            });
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

    if (isError) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500 text-xl">Failed to load meals. Please try again later.</p>
            </div>
        );
    }

    return (
        <section className='p-2 lg:p-0'>
            <title>Meals | LocalChefBazaar</title>
            <Container>
                <section className="bg-base-100 w-full py-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary dark:text-[#628141]">
                        All Meals
                    </h2>

                    {isLoading ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                <MealCardSkeleton />
                                <MealCardSkeleton />
                                <MealCardSkeleton />
                                <MealCardSkeleton />
                                <MealCardSkeleton />
                                <MealCardSkeleton />
                                <MealCardSkeleton />
                                <MealCardSkeleton />
                            </div>
                        </>
                    ) : (
                        meals.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-600">No meals found.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {meals.map((meal) => (
                                    <MealCard key={meal._id} meal={meal} />
                                ))}
                            </div>
                        )
                    )}

                    {/* <MealCardSkeleton /> */}

                    {pagination.totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={!pagination.hasPrevPage || isLoading}
                                className="px-6 py-3 bg-[#628141] text-white font-medium rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer"
                            >
                                ← Previous
                            </button>

                            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Page <span className="text-[#ff8400] font-bold">{pagination.currentPage}</span> of{" "}
                                <span className="text-[#ff8400] font-bold">{pagination.totalPages}</span>{" "}
                                ({pagination.totalMeals} meals total)
                            </span>

                            <button
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={!pagination.hasNextPage || isLoading}
                                className="px-6 py-3 bg-[#628141] text-white font-medium rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer"
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

export default Meals;