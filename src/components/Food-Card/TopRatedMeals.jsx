import React from 'react';
import FoodCard from './FoodCard';

const TopRatedMeals = ({ mealsData, isLoading }) => {

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <section className='bg-base-100 w-full px-2 lg:px-0 py-20 overflow-y-hidden'>
                <h3 className="text-3xl md:text-4xl xl:text-7xl pb-10 font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
                    Top Rated Meals
                </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    mealsData?.map(meal => <FoodCard key={meal._id} meal={meal} />)
                }
            </div>
        </section>
    );
};

export default TopRatedMeals;