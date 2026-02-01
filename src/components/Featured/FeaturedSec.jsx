// components/FeaturedGhoroaPartners.jsx
import React from 'react';

const featuredPartners = [
    {
        id: 1,
        name: "Ghoroa Hotel & Restaurant",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=80",
        rating: 4.5,
        cuisine: "Homestyle Bengali • Bhuna Khichuri",
        deliveryTime: "20-40 min",
        discount: "Special Combo",
        specialDish: "Mutton Bhuna Khichuri (Most Famous!)"
    },
    {
        id: 2,
        name: "Kasturi Restaurant",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        rating: 4.6,
        cuisine: "Authentic Bengali • Home Flavors",
        deliveryTime: "25-45 min",
        specialDish: "Ilish Macher Paturi, Chingri Malai Curry"
    },
    {
        id: 3,
        name: "Bangaliana Bhoj",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
        rating: 4.4,
        cuisine: "Simple Homestyle Bengali",
        deliveryTime: "15-35 min",
        discount: "10% OFF",
        specialDish: "Deshi Chicken + Bhorta + Dal"
    },
    {
        id: 4,
        name: "Durbin Bangla",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
        rating: 4.7,
        cuisine: "Traditional Deshi • Village Style",
        deliveryTime: "20-40 min",
        specialDish: "Village Style Bhuna, Biryani"
    },
];

const FeaturedGhoroaPartners = () => {
    return (
        <section className="py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <h3 className="text-3xl md:text-4xl xl:text-7xl pb-10 font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
                        Favorite Homestyle Restaurants
                    </h3>
                    <p className="lg:w-1/2 text-center max-w-2xl mx-auto font-light text-lg xl:text-xl oswald text-[#ff8400]">
                        Dhaka's best authentic home-cooked Bengali flavors — hearty and soul-satisfying!
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {featuredPartners.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className={`
                group bg-white dark:bg-gray-800 
                rounded-2xl overflow-hidden 
                shadow-lg hover:shadow-2xl 
                transition-all duration-300 
                border border-amber-100 dark:border-gray-700 
                hover:border-amber-300 dark:hover:border-amber-600/50
              `}
                        >
                            {/* Image + Overlay */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Discount Badge */}
                                {restaurant.discount && (
                                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                                        {restaurant.discount}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                                    {restaurant.name}
                                </h3>

                                <div className="mt-2 flex items-center gap-2 text-sm">
                                    <span className="flex items-center text-yellow-500 font-medium">
                                        ★ {restaurant.rating}
                                    </span>
                                    <span className="text-gray-400 dark:text-gray-500">•</span>
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {restaurant.cuisine}
                                    </span>
                                </div>

                                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {restaurant.deliveryTime}
                                </div>

                                {/* Special Dish Highlight */}
                                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                                        Signature: <span className="text-gray-800 dark:text-gray-200">
                                            {restaurant.specialDish}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                    <button className="
            px-8 py-4 
            bg-amber-600 hover:bg-amber-700 
            dark:bg-amber-700 dark:hover:bg-amber-600 
            text-white font-semibold 
            rounded-full transition-colors shadow-md cursor-pointer
          ">
                        View More Homestyle Restaurants →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedGhoroaPartners;