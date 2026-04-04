import React, { useMemo } from 'react';
import Hero from '../../components/Hero/Hero';
import Container from '../../components/Layout/Container';
import MealCard from '../../components/Cards/MealCard';
import Reviews from '../../components/Reviews/Reviews';
import BeAChef from '../../components/Be-A-Chef/BeAChef';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TopRatedMeals from '../../components/Food-Card/TopRatedMeals';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import LocationInput from '../../components/LocationInput/LocationInput';
import OurStory from '../../components/OurStory/OurStory';
import MealCardSkeleton from '../../components/Loaders/MealCardSkeleton';


const Home = () => {
  const axiosSecure = useAxiosSecure()
  // 6 top rated meals
  const { data: mealsData, isLoading } = useQuery({
    queryKey: ["homeMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals/top-rated");
      return res.data;
    }
  });

  const { data: latestMeals = [], isLoading: latestLoading } = useQuery({
    queryKey: ["latestMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals?page=1&limit=4");
      return res.data?.meals || [];
    }
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const [mealsRes, reviewsRes] = await Promise.all([
        axiosSecure.get("/meals?page=1&limit=200"),
        axiosSecure.get("/reviews/all"),
      ]);

      const mealsPayload = mealsRes.data || {};
      const meals = mealsPayload.meals || [];
      const totalMeals = mealsPayload.pagination?.totalMeals || meals.length;

      const reviews = reviewsRes.data || [];
      const totalReviews = reviews.length;
      const avgRating = totalReviews
        ? (
            reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
            totalReviews
          ).toFixed(1)
        : "0.0";

      const areaCounts = {};
      const tagCounts = {};
      const chefCounts = {};

      meals.forEach((meal) => {
        if (meal.deliveryArea) {
          areaCounts[meal.deliveryArea] = (areaCounts[meal.deliveryArea] || 0) + 1;
        }
        if (meal.chefName) {
          chefCounts[meal.chefName] = (chefCounts[meal.chefName] || 0) + 1;
        }
        if (Array.isArray(meal.dietaryTags)) {
          meal.dietaryTags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      const topAreas = Object.entries(areaCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));

      const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));

      return {
        totalMeals,
        totalReviews,
        avgRating,
        topAreas,
        topTags,
        areaCount: Object.keys(areaCounts).length,
        chefCount: Object.keys(chefCounts).length,
      };
    },
  });

  const stats = useMemo(
    () => ({
      totalMeals: statsData?.totalMeals || 0,
      totalReviews: statsData?.totalReviews || 0,
      avgRating: statsData?.avgRating || "0.0",
      topAreas: statsData?.topAreas || [],
      topTags: statsData?.topTags || [],
      areaCount: statsData?.areaCount || 0,
      chefCount: statsData?.chefCount || 0,
    }),
    [statsData]
  );

  //all reviews
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/all");
      return res.data;
    },
  });

  return (
    <>
      <title>Home | LocalChefBazaar</title>
      <Hero />
      <Container>
        <TopRatedMeals mealsData={mealsData} isLoading={isLoading} />
      </Container>
      <section className='py-20 bg-accent'>
        <WhyChooseUs stats={stats} loading={statsLoading} />
      </section>
      <Container>
        <section className="py-16 md:py-24">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">
              Fresh Arrivals
            </span>
            <h3 className="text-3xl md:text-4xl xl:text-6xl font-semibold berkshire-swash-regular text-primary dark:text-[#628141]">
              Newly Added Meals
            </h3>
            <p className="text-gray-600 dark:text-gray-300 oswald font-light text-lg mt-4">
              Explore the latest homemade dishes added by our chefs.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                <MealCardSkeleton key={`latest-skeleton-${index}`} />
              ))
              : latestMeals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
          </div>
        </section>
      </Container>
      <section className='py-20 bg-accent'>
        <LocationInput
          areas={stats.topAreas}
          areaCount={stats.areaCount}
          loading={statsLoading}
        />
      </section>
      <Container>
        <OurStory stats={stats} loading={statsLoading} />
      </Container>
      <section className='py-20 bg-accent'>
        <Reviews reviews={reviews} reviewsLoading={reviewsLoading} />
      </section>
      <Container>
        <BeAChef />
      </Container>
    </>
  );
};

export default Home;
