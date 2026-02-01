// components/FeaturedGhoroaPartners.jsx
import React from 'react';

const featuredPartners = [
{
        id: 1,
        name: "Maa's Kitchen (Ghoroa)",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=80",
        rating: 4.8,
        cuisine: "Comfort Food • Spicy Bengali",
        deliveryTime: "25-35 min",
        discount: "Buy 1 Get 1",
        specialDish: "Beef Bhuna Khichuri Platter"
    },
    {
        id: 2,
        name: "Puran Dhaka Heritage",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        rating: 4.6,
        cuisine: "Mughlai Flavors • Rich Taste",
        deliveryTime: "30-50 min",
        specialDish: "Kacchi Biryani & Borhani"
    },
    {
        id: 3,
        name: "Bhorta Bilash",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
        rating: 4.5,
        cuisine: "Spicy Mashed • Rice Bowls",
        deliveryTime: "15-30 min",
        discount: "15% OFF",
        specialDish: "Shutki Bhorta with Steamed Rice"
    },
    {
        id: 4,
        name: "Gram Bangla Foods",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
        rating: 4.9,
        cuisine: "Village Style • Organic",
        deliveryTime: "40-55 min",
        specialDish: "Duck Curry with Chitoi Pitha"
    },
];

// Icons as components for cleaner code
const StarIcon = () => (
    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const FireIcon = () => (
    <svg className="w-4 h-4 text-orange-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.45-.412-1.725a1 1 0 00-1.846-.48c-.068.214-.145.449-.232.7a8.528 8.528 0 00-.312 2.115c0 .32.016.63.045.929l.004.043a5.216 5.216 0 00.324 1.48c.159.54.43 1.02.775 1.435.158.19.344.364.55.514.204.15.424.27.653.354a6.53 6.53 0 002.348.248c.772-.074 1.516-.296 2.193-.655a6.621 6.621 0 002.827-3.085c.189-.434.33-.896.406-1.385.084-.543.072-1.127-.08-1.729-.153-.603-.432-1.229-.824-1.85a9.49 9.49 0 00-1.572-1.886 11.232 11.232 0 00-1.396-1.169zM9.04 9.177a29.21 29.21 0 01.558-3.056c.15-.658.293-1.278.43-1.815.228.324.475.688.72 1.096.388.646.732 1.366.956 2.062.224.698.293 1.488.163 2.302-.128.803-.51 1.536-1.076 2.065a4.57 4.57 0 01-1.35.856c-.516.208-1.09.282-1.666.216a4.529 4.529 0 01-1.554-.53 4.67 4.67 0 01-.645-.444 3.25 3.25 0 01-.482-.547c-.23-.338-.372-.733-.377-1.168a6.502 6.502 0 01.196-1.485 18.665 18.665 0 01.328-1.465c.162.19.333.395.513.612l.144.173a1 1 0 001.693-.935l-.042-.076c-.22-.397-.478-.773-.762-1.123.364.767.575 1.572.617 2.378z" clipRule="evenodd" />
    </svg>
);

const FeaturedGhoroaPartners = () => {
    return (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block animate-pulse">
                        Authentic Flavors
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 berkshire-swash-regular">
                        Favorite Homestyle Spots
                    </h3>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
                    <p className="lg:w-1/2 text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg oswald font-light leading-relaxed">
                        Dhaka's best authentic home-cooked Bengali flavors — hearty, nostalgic, and soul-satisfying!
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {featuredPartners.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-amber-100 dark:hover:border-gray-700"
                        >
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                    {restaurant.discount && (
                                        <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
                                            {restaurant.discount}
                                        </span>
                                    )}
                                </div>

                                <div className="absolute top-4 right-4 z-20">
                                    <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                                        <ClockIcon />
                                        {restaurant.deliveryTime}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 relative">
                                {/* Floating Rating Badge overlap */}
                                <div className="absolute -top-5 right-6 bg-amber-500 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1 font-bold z-20">
                                    <span>{restaurant.rating}</span>
                                    <StarIcon />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {restaurant.name}
                                </h3>
                                
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4 line-clamp-1">
                                    {restaurant.cuisine}
                                </p>

                                {/* Divider */}
                                <div className="h-px w-full bg-gray-100 dark:bg-gray-700 my-4"></div>

                                {/* Special Dish Box */}
                                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-100 dark:border-amber-800/30">
                                    <div className="flex items-start">
                                        <div className="mt-0.5">
                                            <FireIcon />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wide text-amber-600 dark:text-amber-400 font-bold mb-0.5">
                                                Must Try
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">
                                                {restaurant.specialDish}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-16">
                    <button className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 bg-amber-600 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-lg hover:shadow-amber-500/30">
                        <span className="mr-2">View More Restaurants</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedGhoroaPartners;