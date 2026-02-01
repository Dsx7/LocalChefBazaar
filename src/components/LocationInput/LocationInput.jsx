import React, { useState } from 'react';

const LocationInput = () => {
  const [postcode, setPostcode] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = postcode.length > 2
    ? ['1207 - Dhanmondi', '1212 - Gulshan', '1213 - Banani', '1209 - Mohammadpur', '1216 - Uttara']
    : [];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          
          {/* Left Side: Content & Input */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
            
            <div className="mb-8">
              <span className="text-amber-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                Find Your Chef
              </span>
              <h3 className="text-3xl md:text-4xl xl:text-6xl font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
                Where should we <span className="text-amber-600 dark:text-amber-500">deliver?</span>
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-400 oswald font-light">
                Enter your location to discover home cooks in your neighborhood.
              </p>
            </div>

            {/* Input Group */}
            <div className={`
              relative flex flex-col sm:flex-row items-center gap-2 p-2
              bg-white dark:bg-gray-700 
              rounded-2xl border-2 
              transition-all duration-300
              ${isFocused 
                ? 'border-amber-500 shadow-lg ring-4 ring-amber-500/10' 
                : 'border-gray-200 dark:border-gray-600 shadow-sm'}
            `}>
              
              {/* Search Icon */}
              <div className="hidden sm:flex items-center justify-center pl-4 text-gray-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter postcode (e.g. 1207)"
                className="w-full bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 px-4 py-3 text-base outline-none"
              />

              {/* Locate Me Button */}
              <button
                type="button"
                className="w-full sm:w-auto shrink-0 px-6 py-3 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden sm:inline">Locate Me</span>
              </button>
            </div>

            {/* Quick Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-6 animate-fadeIn">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Did you mean?
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPostcode(sug)}
                      className="px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30 rounded-full text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
               Serving major areas in Dhaka. <span className="text-amber-600 dark:text-amber-500 cursor-pointer hover:underline">View Delivery Map</span>
            </p>
          </div>

          {/* Right Side: Map Visual (Image Unchanged) */}
          <div className="relative h-64 lg:h-auto order-1 lg:order-2 group">
             <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/60 via-transparent to-transparent z-10" />
             
             {/* Map Image */}
             <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://cdn.prod.website-files.com/609ed46055e27a02ffc0749b/661948ebc3050124741263be_6377865c25cdcb31e14aa7e9_hero%20image%20-%20dark.png')`
                }}
             />

             {/* Animated Pin */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <span className="relative flex h-20 w-20 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-12 w-12 bg-amber-500 items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 text-2xl">
                    📍
                  </span>
                </span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationInput;