import React, { useState, useEffect } from 'react';

const promotions = [
  {
    id: 1,
    title: "50% OFF on First Order",
    subtitle: "Use Code: GHOROA50",
    description: "Up to ৳300 discount on your first ghoroa meal!",
    bgImage: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&auto=format&fit=crop&q=80",
    color: "from-red-900/80 to-orange-800/40",
    buttonText: "Order Now",
  },
  {
    id: 2,
    title: "Free Delivery This Week",
    subtitle: "No Minimum Order!",
    description: "Enjoy authentic Bengali food without delivery charge",
    bgImage: "https://images.unsplash.com/photo-1601313054762-d0f26cbb5a31?q=80&w=870",
    color: "from-emerald-900/80 to-teal-800/40",
    buttonText: "Claim Free Delivery",
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free Khichuri",
    subtitle: "Mutton / Chicken Bhuna",
    description: "Perfect for family dinner or office lunch",
    bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
    color: "from-amber-900/80 to-yellow-800/40",
    buttonText: "Grab The Deal",
  },
  {
    id: 4,
    title: "৳100 OFF on 500+ Taka",
    subtitle: "All Deshi & Village Style Dishes",
    description: "Including bhorta, dal, fish & chicken items",
    bgImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=80",
    color: "from-purple-900/80 to-pink-800/40",
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
    <section className="py-12 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
           <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Don't Miss Out
            </span>
          <h3 className="text-3xl md:text-4xl xl:text-7xl pb-10 font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
            Today's Best Offers
          </h3>
          <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 oswald font-light text-lg">
            Save more on your favorite ghoroa Bengali food!
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
          
          {/* Slides Track */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="min-w-full relative h-[450px] md:h-[550px] flex items-center"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={promo.bgImage}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dynamic Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${promo.color} mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-black/20" /> {/* General darkening */}
                </div>

                {/* Content Card - Glassmorphism */}
                <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
                    <div className="max-w-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden group">
                        
                        {/* Decorative Blur blob behind text */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6 shadow-lg">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            Limited Time Offer
                        </span>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-md berkshire-swash-regular">
                            {promo.title}
                        </h2>

                        <p className="text-xl md:text-2xl text-amber-200 font-semibold mb-3 oswald tracking-wide">
                            {promo.subtitle}
                        </p>

                        <p className="text-gray-100 text-lg mb-8 max-w-lg leading-relaxed">
                            {promo.description}
                        </p>

                        <button className="
                            px-10 py-4 
                            bg-white text-gray-900 
                            font-bold text-lg rounded-full 
                            shadow-[0_0_20px_rgba(255,255,255,0.3)] 
                            hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] 
                            hover:scale-105 active:scale-95
                            transition-all duration-300
                        ">
                            {promo.buttonText}
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Indicators (Bars instead of dots) */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  h-1.5 rounded-full transition-all duration-500 ease-out shadow-sm
                  ${index === currentIndex
                    ? 'bg-amber-500 w-12'
                    : 'bg-white/40 w-6 hover:bg-white/80'}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;