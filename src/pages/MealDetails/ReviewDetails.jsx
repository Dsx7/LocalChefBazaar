import { FaHeart } from "react-icons/fa";
import ReviewModal from "../MealDetails/ReviewModal"
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from "react";
import toast from "react-hot-toast";

const ReviewDetails = ({ mealId, user, mealName, data }) => {
    const [open, setOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    // --- 1. Fetch Reviews ---
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ["reviews", mealId],
        enabled: !!mealId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?foodId=${mealId}`);
            return res.data;
        },
    });

    // --- 2. Fetch Favorite Count ---
    const { data: favorites = [], isLoading: favoriteLoading, refetch: favoriteFetch } = useQuery({
        queryKey: ["favorites"],
        enabled: !!mealId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorites/count?mealId=${mealId}`);
            return res.data;
        },
    });

    // --- 3. Add to Favorite Mutation ---
    const favoriteMutation = useMutation({
        mutationFn: async (favData) => {
            const res = await axiosSecure.post("/favorites", favData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Added to favorite ❤️");
            favoriteFetch();
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Already in favorite");
        },
    });

    const handleFavorite = () => {
        const favoriteInfo = {
            userEmail: user?.email,
            mealId,
            mealName: data?.foodName,
            chefId: data?.chefId,
            chefName: data?.chefName,
            price: data?.price,
        };

        favoriteMutation.mutate(favoriteInfo);
    };

    if (isLoading || favoriteLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-5 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#628141] mb-6">
                Customer Reviews
            </h2>

            {
                reviews.length === 0 ? (
                    <div className='flex justify-center items-center p-4 bg-gray-200 rounded-2xl dark:bg-primary'>
                        <h3 className='text-2xl'>No reviews yet.</h3>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white p-5 rounded-2xl shadow-md border border-gray-500 dark:bg-primary"
                            >
                                <div className="flex gap-4 items-start">
                                    <img
                                        src={review?.reviewerImage}
                                        alt={review?.reviewerName}
                                        className="w-14 h-14 rounded-full object-cover shadow-sm"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-semibold text-[#628141]">
                                                {review.reviewerName}
                                            </h3>
                                            <p className="text-sm text-gray-700 dark:text-[#ff8400]">{new Date(review.createdAt).toDateString()}</p>
                                        </div>

                                        <div className="flex items-center mt-1">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <span key={i} className="text-yellow-500 text-lg">★</span>
                                            ))}
                                        </div>

                                        <p className="text-gray-700 dark:text-[#ff8400] mt-2 text-sm leading-relaxed">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

            {/* --- UPDATED BUTTONS SECTION (Responsive Fix) --- */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 md:justify-between items-center">
                <button
                    onClick={() => setOpen(true)}
                    className="
                        btn bg-[#628141] border-[#628141] shadow-none 
                        text-white font-semibold 
                        w-full md:w-auto 
                        py-4 md:py-8 px-6 md:px-8 
                        rounded-xl text-base md:text-lg 
                        h-auto min-h-0
                    "
                >
                    Give Review
                </button>

                <button
                    onClick={handleFavorite}
                    className="
                        btn bg-[#628141] border-[#628141] shadow-none 
                        text-white font-semibold 
                        w-full md:w-auto 
                        py-4 md:py-8 px-6 md:px-8 
                        rounded-xl text-base md:text-lg 
                        h-auto min-h-0 
                        flex items-center justify-center gap-2
                    "
                >
                    <FaHeart />
                    <span>Add to Favorite ({favorites.count ? favorites.count : "0"})</span>
                </button>
            </div>

            {/* Modal */}
            {
                open && <ReviewModal setOpen={setOpen} user={user} mealId={mealId} refetch={refetch} mealName={mealName} />
            }
        </div>
    );
};

export default ReviewDetails;