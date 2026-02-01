import React from 'react';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar } from 'react-icons/fa';

const FoodCard = ({ meal }) => {
    const { _id, chefId, foodName, foodImage, chefName, price, rating, deliveryArea } = meal;

    return (
        <div
            className="card bg-base-100 shadow-sm stalinist-one-regula text-black 
                     overflow-hidden group transition-all duration-300 dark:text-white"
            data-aos="zoom-in"
        >
            <figure className="overflow-hidden">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-72 object-cover 
                         transition-transform duration-500 
                         group-hover:scale-110"
                />
            </figure>

            <div className="p-4 space-y-4">
                <div>
                    <div className="w-full flex justify-between items-center dark:text-white">
                        <h2 className="card-title">{foodName}</h2>
                        <p className="font-semibold">৳{price}</p>
                    </div>

                    <p><span className="font-semibold">Chef Name :</span> {chefName}</p>
                    <p><span className="font-semibold">Chef ID :</span> {chefId}</p>
                    <p><span className="font-semibold">Delivery Area :</span> {deliveryArea}</p>

                    <p className="flex items-center gap-2">
                        <span className="font-semibold">Rating :</span>
                        <FaStar className="text-yellow-500" /> {rating}
                    </p>
                </div>

                <div className="card-actions justify-end">
                    <Link
                        className="btn btn-primary w-full border-primary shadow-none"
                        to={`/meals/${_id}`}
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;