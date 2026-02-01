// components/WhyChooseUs.jsx
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
    <section className=" transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-3xl md:text-4xl xl:text-7xl font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
            Why Choose Us?
          </h3>
          <p className="md:text-xl max-w-3xl mx-auto font-light text-lg xl:text-xl text-[#ff8400] oswald">
            Home-like taste • Super fast service • Best prices — all in one place!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                group bg-white dark:bg-gray-800
                rounded-2xl p-6 md:p-8
                shadow-md hover:shadow-xl
                border border-gray-100 dark:border-gray-700
                hover:border-amber-500/40 dark:hover:border-amber-500/30
                transition-all duration-300 transform hover:-translate-y-1
              `}
            >
              {/* Icon */}
              <div className="text-5xl md:text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">4.7+ Rating</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔒</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📦</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;