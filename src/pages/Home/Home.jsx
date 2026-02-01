import React from 'react';
import Hero from '../../components/Hero/Hero';
import Container from '../../components/Layout/Container';
import FoodCard from '../../components/Food-Card/FoodCard';
import Meals from '../Meals/Meals';
import MealCard from '../../components/Cards/MealCard';
import Reviews from '../../components/Reviews/Reviews';
import BeAChef from '../../components/Be-A-Chef/BeAChef';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TopRatedMeals from '../../components/Food-Card/TopRatedMeals';
import Featured from '../../components/Featured/FeaturedSec';
import PromotionsSection from '../../components/Promotion/PromotionsSection';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import DownloadApp from '../../components/DownloadApp/DownloadApp';
import LocationInput from '../../components/LocationInput/LocationInput';
import OurStory from '../../components/OurStory/OurStory';


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
        <Featured />
      </section>
      <Container>
        <PromotionsSection />
      </Container>
      <section className='py-20 bg-accent'>
        <WhyChooseUs />
      </section>
      <Container>
        <DownloadApp />
      </Container>
      <section className='py-20 bg-accent'>
        <LocationInput />
      </section>
      <Container>
        <OurStory />
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