import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ReviewCard from "../Cards/ReviewCard";

export default function PremiumReviewSlider({ reviews = [], reviewsLoading }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // 🔒 safety check
        if (!reviews || reviews.length < 2) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 2600);

        return () => clearInterval(timer);
    }, [reviews]); // ✅ IMPORTANT

    if (reviewsLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-20 text-xl text-gray-500">
                No reviews available
            </div>
        );
    }

    const getVisibleCards = () => {
        const prev = (index - 1 + reviews.length) % reviews.length;
        const next = (index + 1) % reviews.length;
        return [prev, index, next];
    };

    return (
        <div>
            {/* Heading */}
            <div className="grid place-items-center">
                <h3 className="text-3xl md:text-4xl xl:text-7xl font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
                    Food That Touches Hearts
                </h3>
                <p className="lg:w-1/2 text-center font-light text-lg xl:text-xl text-[#ff8400] oswald">
                    Discover how every homemade meal brings comfort, freshness, and real satisfaction.
                    Experience the taste that turns ordinary days into something truly special.
                </p>
            </div>

            {/* Slider */}
            <div className="w-full flex justify-center py-14">
                <div className="flex gap-4 md:gap-8 items-center">
                    {getVisibleCards().map((idx, position) => (
                        <motion.div
                            key={reviews[idx]._id}
                            animate={{
                                opacity: 1,
                                scale: position === 1 ? 1.15 : 0.9,
                                y: position === 1 ? 0 : 30,
                            }}
                            transition={{ duration: 0.6 }}
                            className={`rounded-3xl ${
                                position === 1
                                    ? "z-20 shadow-2xl"
                                    : "z-10 opacity-70 shadow-lg"
                            }`}
                        >
                            <ReviewCard review={reviews[idx]} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
