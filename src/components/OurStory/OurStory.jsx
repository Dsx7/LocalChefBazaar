// components/OurStory.jsx
import React from 'react';

const OurStory = () => {
  return (
    <section className="py-16 md:py-24 transition-colors duration-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image / Visual Story */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <div className="aspect-[4/5] md:aspect-[5/6] lg:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&auto=format&fit=crop&q=80"
                alt="Traditional Bengali kitchen with love"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Small emotional caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xl md:text-2xl font-serif italic text-[#ff8400]">
                  "From our kitchen... to your heart"
                </p>
              </div>
            </div>
          </div>

          {/* Right - Text Story */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#628141] text-[#ff8400] rounded-full text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#628141] berkshire-swash-regular leading-tight">
                Our Story
              </h2>
            </div>

            <div className="space-y-6 text-[#ff8400] text-lg leading-relaxed">
              <p>
                It all began in a small kitchen in Dhaka, where the smell of <strong>mutton bhuna khichuri</strong> 
                and the sound of <strong>maacher paturi</strong> being steamed brought our family together every weekend.
              </p>

              <p>
                We noticed something — many people in the city were missing that same <strong>ghoroa</strong> (homemade) taste. 
                Busy lives, long office hours, and traffic made it hard to enjoy real home-cooked Bengali food.
              </p>

              <p>
                So we decided to bring that love back to the table.
              </p>

              <p className="font-medium text-xl text-[#628141] border-l-4 border-amber-500 dark:border-amber-600 pl-5 py-1">
                In 2023, we started with just 7 home kitchens and a dream — to deliver the taste of home to every corner of Dhaka.
              </p>

              <p>
                Today, we work with hundreds of passionate home cooks who prepare food with the same care and love 
                as they do for their own families — and we deliver it to you in under 45 minutes.
              </p>
            </div>

            {/* Signature / Closing */}
            <div className="pt-6">
              <p className="text-lg font-medium text-[#628141]">
                Because good food isn't just about taste...
              </p>
              <p className="text-[#ff8400] font-semibold text-xl mt-1">
                It's about feeling at home, no matter where you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;