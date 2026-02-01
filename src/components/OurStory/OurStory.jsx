// components/OurStory.jsx
import React from 'react';

const OurStory = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <h1 className="text-[12rem] md:text-[20rem] font-bold text-center text-gray-900 dark:text-white leading-none whitespace-nowrap">
          STORY
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left - Visual Story (Image Frame) */}
          <div className="w-full lg:w-1/2 relative">
            {/* Decorative Frame Border */}
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-amber-500/30 rounded-3xl hidden md:block"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-amber-50 dark:bg-gray-800 rounded-3xl -z-10 hidden md:block"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <div className="aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&auto=format&fit=crop&q=80"
                  alt="Traditional Bengali kitchen"
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                 <svg className="w-8 h-8 text-amber-500 mb-2 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z"></path></svg>
                 <p className="text-xl font-serif italic text-white leading-relaxed">
                   "Food is not just fuel, it's a memory. It's the taste of home."
                 </p>
              </div>
            </div>
          </div>

          {/* Right - Text Story */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="relative">
              <span className="text-amber-600 dark:text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Who We Are
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-[#628141] dark:text-[#628141] berkshire-swash-regular mb-6">
                Our Story
              </h2>
              <div className="w-20 h-1.5 bg-[#628141] rounded-full"></div>
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed oswald font-light">
              <p>
                It all began in a small kitchen in Dhaka, where the smell of <strong className="text-gray-900 dark:text-white font-semibold">mutton bhuna khichuri</strong> 
                and the sound of <strong className="text-gray-900 dark:text-white font-semibold">maacher paturi</strong> being steamed brought our family together every weekend.
              </p>

              <p>
                We noticed something — many people in the city were missing that same <strong className="text-amber-600 dark:text-amber-500">ghoroa</strong> (homemade) taste. 
                Busy lives, long office hours, and traffic made it hard to enjoy real home-cooked Bengali food.
              </p>

              <div className="pl-6 border-l-4 border-[#628141] py-2 my-8 bg-green-50 dark:bg-green-900/10 rounded-r-lg">
                 <p className="text-xl font-medium text-gray-800 dark:text-gray-200 italic">
                  "So we decided to bring that love back to the table."
                 </p>
              </div>

              <p>
                In 2023, we started with just 7 home kitchens and a dream. Today, we work with hundreds of passionate home cooks who prepare food with the same care and love 
                as they do for their own families — and we deliver it to you in under 45 minutes.
              </p>
            </div>

            {/* Signature Area */}
            <div className="pt-8 flex items-center gap-4">
               <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
               <div className="text-center">
                 <p className="text-sm uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold mb-1">
                    The Philosophy
                 </p>
                 <p className="text-2xl berkshire-swash-regular text-[#628141]">
                    Feel at home, anywhere.
                 </p>
               </div>
               <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;