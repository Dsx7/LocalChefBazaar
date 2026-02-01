import React from 'react';
import { Link } from 'react-router';
import { FaStar, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const MealCard = ({ meal }) => {
    const { _id, chefId, foodName, foodImage, chefName, price, rating, deliveryArea } = meal;

    return (
        <div
            className="
                group bg-white dark:bg-gray-800 
                rounded-[2rem] shadow-md hover:shadow-xl 
                border border-gray-100 dark:border-gray-700
                overflow-hidden transition-all duration-300 
                flex flex-col h-full
            "
            data-aos="zoom-in"
        >
            {/* Image Section */}
            <figure className="relative h-64 overflow-hidden">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Price Badge Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-[#ff8400]/20">
                    <p className="text-[#ff8400] font-extrabold text-lg oswald">
                        ৳{price}
                    </p>
                </div>
            </figure>

            {/* Content Section - Flex Grow ensures buttons align at bottom */}
            <div className="p-6 flex flex-col flex-grow">
                
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-[#628141] mb-2 leading-tight line-clamp-1 berkshire-swash-regular">
                        {foodName}
                    </h2>
                    
                    {/* Rating Badge */}
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <FaStar className="text-yellow-400 text-lg" />
                        <span className="text-gray-800 dark:text-white font-bold">{rating}</span>
                        <span>(Customer Rating)</span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-[#628141]">
                            <FaUserTie />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Chef</span>
                            <span className="font-semibold text-sm line-clamp-1">{chefName}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-[#ff8400]">
                            <FaMapMarkerAlt />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Area</span>
                            <span className="font-semibold text-sm line-clamp-1">{deliveryArea}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Link
                        to={`/meals/${_id}`}
                        className="
                            btn w-full border-none shadow-none rounded-xl
                            bg-[#628141] hover:bg-[#4f6b32] text-white 
                            text-base font-semibold tracking-wide
                            transition-all duration-300 transform group-hover:-translate-y-1
                        "
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;