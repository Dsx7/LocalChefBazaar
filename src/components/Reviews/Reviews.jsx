// components/PremiumReviewSlider.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ReviewCard from "../Cards/ReviewCard";

export default function PremiumReviewSlider({ reviews = [], reviewsLoading }) {
    const [index, setIndex] = useState(0);

    // --- LOGIC STARTS (UNCHANGED) ---
    useEffect(() => {
        if (!reviews || reviews.length < 2) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 2600);
        return () => clearInterval(timer);
    }, [reviews]);

    if (reviewsLoading) {
        return (
            <div className="min-h-[400px] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#628141]"></span>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-20 text-xl text-gray-500 font-light italic">
                No reviews available yet.
            </div>
        );
    }

    const getVisibleCards = () => {
        const prev = (index - 1 + reviews.length) % reviews.length;
        const next = (index + 1) % reviews.length;
        return [prev, index, next];
    };
    // --- LOGIC ENDS ---

    return (
        <section className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Heading Section */}
                <div className="text-center mb-12 relative">
                    <span className="text-[#628141] font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
                        Testimonials
                    </span>
                    <h3 className="text-3xl md:text-4xl xl:text-7xl font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
                        Food That Touches Hearts
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#628141] to-green-600 mx-auto rounded-full mb-6"></div>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 oswald font-light text-[#ff8400]">
                        Discover how every homemade meal brings comfort, freshness, and real satisfaction.
                    </p>
                </div>

                {/* Slider Container */}
                <div className="w-full flex justify-center items-center py-10 relative">
                    {/* Background Blur Effect for depth */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#628141]/5 blur-3xl rounded-full -z-10"></div>

                    <div className="flex items-center justify-center h-[350px] md:h-[400px] w-full perspective-1000">
                        {getVisibleCards().map((idx, position) => {
                            const isCenter = position === 1;
                            return (
                                <motion.div
                                    key={`${reviews[idx]._id}-${position}`}
                                    initial={false}
                                    animate={{
                                        opacity: isCenter ? 1 : 0.4,
                                        scale: isCenter ? 1 : 0.85,
                                        x: position === 0 ? -40 : position === 2 ? 40 : 0,
                                        y: isCenter ? 0 : 20,
                                        zIndex: isCenter ? 20 : 10,
                                        filter: isCenter ? "blur(0px)" : "blur(2px)",
                                    }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className={`absolute ${isCenter ? 'cursor-default' : 'cursor-pointer pointer-events-none md:pointer-events-auto'}`}
                                >
                                    {/* Wrapper to handle shadow and sizing */}
                                    <div className={`transition-shadow duration-500 ${isCenter ? 'shadow-2xl shadow-green-900/10' : ''}`}>
                                        <ReviewCard review={reviews[idx]} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}