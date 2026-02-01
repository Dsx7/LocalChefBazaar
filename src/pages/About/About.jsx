// pages/AboutUs.jsx   or   components/AboutUsSection.jsx
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-transparent to-amber-100/20 dark:from-amber-950/30 dark:to-gray-950/60" />
        
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Bringing <span className="text-amber-600 dark:text-amber-500">Home</span> to Your Doorstep
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We started with a simple dream — to let busy people in Dhaka enjoy authentic, loving, <strong>ghoroa</strong> Bengali food without stepping into the kitchen.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Block */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <img
                src="https://assets.cntraveller.in/photos/66f3a5a67597ce29202525ae/3:2/w_4353,h_2902,c_limit/himur%20heshel%20DSC01876~2.JPG"
                alt="Traditional Bengali food preparation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white text-xl md:text-2xl font-serif italic">
                Made with love, just like home
              </div>
            </div>

            {/* Text Block */}
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Our Journey Began in a Small Kitchen
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  In late 2022–early 2023, a few of us who grew up with the smell of <strong>ilish paturi</strong>, <strong>bhuna khichuri</strong>, and <strong>maacher jhol</strong> realized one painful truth:
                </p>

                <p className="pl-5 border-l-4 border-amber-500 dark:border-amber-600">
                  People in Dhaka were craving real home-cooked taste, but time, traffic, and busy lives stood in the way.
                </p>

                <p>
                  So we decided to change that — not by opening another restaurant, but by connecting passionate home cooks with people who miss <strong>maa’r haat’er ranna</strong>.
                </p>

                <p>
                  Today we proudly work with hundreds of home kitchens across the city who prepare food with the same care they give their own families — and we deliver it hot & fresh in under 45 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Why Us Mini Section */}
      <section className="py-16 md:py-24 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
            What Makes Us Different?
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { icon: "❤️", title: "Love in Every Bite", desc: "Prepared by home cooks who treat your order like family food" },
              { icon: "⏱️", title: "Fast & Reliable", desc: "Average delivery under 45 minutes in Dhaka" },
              { icon: "🍲", title: "100% Authentic Taste", desc: "No shortcuts — real recipes, real spices, real love" },
              { icon: "🧼", title: "Hygienic & Safe", desc: "Strict packaging and quality checks at every step" },
              { icon: "💸", title: "Fair Prices", desc: "No hidden fees — what you see is what you pay" },
              { icon: "🤝", title: "Supporting Local Homes", desc: "Empowering home cooks and creating income opportunities" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-amber-500/40 dark:hover:border-amber-600/40"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h4 className="text-xl md:text-2xl font-semibold mb-3">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Emotional Line */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto px-5">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic text-gray-800 dark:text-gray-200 leading-relaxed">
            Because the best meals are not just food —<br />
            <span className="text-amber-600 dark:text-amber-500">they're memories delivered warm to your door.</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;