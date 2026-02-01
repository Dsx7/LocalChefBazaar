// components/Cards/ReviewCard.jsx
import React from 'react';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { comment, reviewerName, reviewerImage, createdAt } = review;

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm h-full w-[300px] md:w-[380px] relative overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
            
            {/* Background Decorative Icon */}
            <div className="absolute top-4 right-6 text-[#628141] opacity-5 text-6xl font-serif leading-none select-none pointer-events-none">
                <FaQuoteRight />
            </div>

            <div>
                {/* Stars (Visual only) */}
                <div className="flex gap-1 text-amber-400 mb-4 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg italic leading-relaxed font-light mb-6 line-clamp-4">
                    "{comment}"
                </p>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#628141]/20 p-0.5">
                        <img 
                            className="w-full h-full rounded-full object-cover" 
                            src={reviewerImage} 
                            alt={reviewerName} 
                        />
                    </div>
                </div>
                
                <div>
                    <h3 className="font-bold text-[#628141] text-base leading-tight">
                        {reviewerName}
                    </h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mt-0.5">
                        {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;