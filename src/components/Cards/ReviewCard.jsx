import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from "framer-motion";

const ReviewCard = ({ review }) => {
    const { comment, reviewerName, reviewerImage, createdAt } = review;
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="backdrop-blur-xl bg-white/60 border border-white/20 rounded-3xl 
                       p-6 w-48 md:w-72 lg:w-80 h-fit text-center shadow-lg"
        >
            {/* Quote Icon */}
            {/* <div className="text-teal-300 text-4xl mb-4">
                <FaUserCircle />
            </div> */}

            {/* Review Text */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                {comment}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-primary my-4"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 justify-center">
                <img className="w-10 h-10 rounded-full bg-teal-900" src={reviewerImage} alt={reviewerName} />
                <div>
                    <h3 className="font-semibold text-gray-800">{reviewerName}</h3>
                    <p className="text-sm text-gray-500">{new Date(createdAt).toDateString()}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewCard;