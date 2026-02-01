// components/PromotionsSection.jsx
import React, { useState, useEffect } from 'react';

const promotions = [
  {
    id: 1,
    title: "50% OFF on First Order",
    subtitle: "Use Code: GHOROA50",
    description: "Up to ৳300 discount on your first ghoroa meal!",
    bgImage: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&auto=format&fit=crop&q=80", // mutton khichuri vibe
    color: "from-red-600 to-orange-500",
    buttonText: "Order Now",
  },
  {
    id: 2,
    title: "Free Delivery This Week",
    subtitle: "No Minimum Order!",
    description: "Enjoy authentic Bengali food without delivery charge",
    bgImage: "https://images.unsplash.com/photo-1626645738196-c4427f9100dc?w=1200&auto=format&fit=crop&q=80", // ilish paturi style
    color: "from-emerald-600 to-teal-500",
    buttonText: "Claim Free Delivery",
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free Khichuri",
    subtitle: "Mutton / Chicken Bhuna",
    description: "Perfect for family dinner or office lunch",
    bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
    color: "from-amber-600 to-yellow-500",
    buttonText: "Grab The Deal",
  },
  {
    id: 4,
    title: "৳100 OFF on 500+ Taka",
    subtitle: "All Deshi & Village Style Dishes",
    description: "Including bhorta, dal, fish & chicken items",
    bgImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=80",
    color: "from-purple-600 to-pink-500",
    buttonText: "Shop Now",
  },
];

const PromotionsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-10 md:py-16">
      <div className="w-full mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl xl:text-7xl font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
            Today's Best Offers & Deals
          </h3>
          <p className="lg:w-1/2 text-center max-w-2xl mx-auto font-light text-lg xl:text-xl text-[#ff8400] oswald">
            Save more on your favorite ghoroa Bengali food!
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="min-w-full relative h-[340px] md:h-[420px] flex items-center"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={promo.bgImage}
                    alt={promo.title}
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${promo.color} opacity-60`} />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg px-8 md:px-16 text-white">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                    Limited Time Offer
                  </span>

                  <h3 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
                    {promo.title}
                  </h3>

                  <p className="text-xl md:text-2xl font-semibold mb-4 drop-shadow">
                    {promo.subtitle}
                  </p>

                  <p className="text-base md:text-lg mb-8 opacity-90">
                    {promo.description}
                  </p>

                  <button className="
                    px-8 py-4 bg-white text-gray-900 
                    font-bold text-lg rounded-full 
                    shadow-lg hover:bg-gray-100 
                    transform hover:scale-105 transition-all
                  ">
                    {promo.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/80'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;