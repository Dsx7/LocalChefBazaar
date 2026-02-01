import React from 'react';
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
    return (
        <button
            className="btn btn-primary border-primary shadow-none py-8 px-8 rounded-xl text-lg font-semibold text-white"
        >
            <FaHeart />
            Add to Favorite
        </button>
    );
};

export default Favorites;