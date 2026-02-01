import React from 'react';

const features = [
  {
    icon: "🍲",
    title: "Authentic Home-style Taste",
    description:
      "Just like mom’s cooking — real Bengali flavors made fresh every day with quality ingredients",
  },
  {
    icon: "⚡",
    title: "Lightning Fast Delivery",
    description:
      "Delivered to your door in 30-45 minutes anywhere in Dhaka",
  },
  {
    icon: "💰",
    title: "Best Price Guaranteed",
    description:
      "Same or lower prices than restaurants — no hidden charges",
  },
  {
    icon: "🧼",
    title: "100% Hygienic Packaging",
    description:
      "Safe & clean from kitchen to your doorstep",
  },
  {
    icon: "❤️",
    title: "Loved by Thousands",
    description:
      "Thousands of happy customers and 4.7+ average rating",
  },
  {
    icon: "🔄",
    title: "Easy Refunds",
    description:
      "Not satisfied? Get 100% money back — no questions asked",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
             <span className="text-amber-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
                Our Promise
            </span>
          <h3 className="text-3xl md:text-4xl xl:text-7xl pb-10 font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
            Why We Are Special
          </h3>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 oswald font-light">
            Home-like taste • Super fast service • Best prices — all in one place!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-8 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-amber-100 dark:hover:border-gray-700"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 mb-6 rounded-2xl bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-orange-100 dark:border-gray-600">
                <span className="filter drop-shadow-md">{feature.icon}</span>
              </div>

              {/* Text Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-sm md:text-base">
                {feature.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-tr-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Trust Badges - Redesigned as a Bar */}
        <div className="mt-20">
            <div className="bg-amber-50 dark:bg-gray-800 rounded-full py-6 px-4 md:px-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 border border-amber-100 dark:border-gray-700 shadow-sm">
                
                <div className="flex items-center gap-3 px-4">
                    <span className="text-2xl filter drop-shadow-sm">⭐</span>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white leading-none">4.7+ Rating</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">From happy foodies</p>
                    </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-600"></div>

                <div className="flex items-center gap-3 px-4">
                    <span className="text-2xl filter drop-shadow-sm">🔒</span>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white leading-none">Secure Payment</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">100% Protected</p>
                    </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-600"></div>

                <div className="flex items-center gap-3 px-4">
                    <span className="text-2xl filter drop-shadow-sm">📦</span>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white leading-none">Cash on Delivery</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pay when you eat</p>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;