// components/LocationInput.jsx
import React, { useState } from 'react';

const LocationInput = () => {
  const [postcode, setPostcode] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Dummy suggestions (you can replace with real API later)
  const suggestions = postcode.length > 2
    ? ['1207 - Dhanmondi', '1212 - Gulshan', '1213 - Banani', '1209 - Mohammadpur', '1216 - Uttara']
    : [];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl xl:text-7xl font-semibold text-center mb-2 berkshire-swash-regular text-primary dark:text-[#628141]">
            Where should we deliver?
          </h3>
          <p className="lg:w-1/2 text-center max-w-2xl mx-auto font-light text-lg xl:text-xl text-[#ff8400] oswald">
            Enter your location or postcode to see Chef near you
          </p>
        </div>

        {/* Main Input Card */}
        <div className={`
          bg-white dark:bg-gray-800 
          rounded-2xl shadow-xl overflow-hidden 
          border border-gray-200 dark:border-gray-700
          transition-all duration-300
          ${isFocused ? 'ring-2 ring-amber-500 ring-offset-2 dark:ring-amber-600' : ''}
        `}>
          {/* Map Background (visual only) */}
          <div className="relative h-48 md:h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-gray-900/80" />
            
            {/* Placeholder Map Image - you can replace with real Google Map or static image */}
            <div className="w-full h-full bg-cover bg-center opacity-40 dark:opacity-30"
              style={{
                backgroundImage: `url('https://cdn.prod.website-files.com/609ed46055e27a02ffc0749b/661948ebc3050124741263be_6377865c25cdcb31e14aa7e9_hero%20image%20-%20dark.png')`
              }}
            />

            {/* Pin Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">📍</div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-8">
            <div className="relative mb-6">
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your postcode or area (e.g. 1207, Dhanmondi)"
                className={`
                  w-full px-5 py-4 pl-12 rounded-xl 
                  bg-gray-100 dark:bg-gray-700 
                  border border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600
                  transition-all duration-200
                `}
              />
              
              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Detect Location Button */}
            <button
              type="button"
              className={`
                w-full md:w-auto px-8 py-4 
                bg-amber-600 hover:bg-amber-700 
                dark:bg-amber-700 dark:hover:bg-amber-600
                text-white font-medium rounded-xl 
                flex items-center justify-center gap-3 
                transition-all duration-300 shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Use Current Location
            </button>

            {/* Quick Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Quick suggestions:</p>
                <div className="flex flex-wrap gap-3">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPostcode(sug)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-gray-700 dark:text-gray-200 rounded-lg text-sm transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center mt-8 text-sm text-[#ff8400] oswald">
          We deliver to most areas in Dhaka • More locations coming soon!
        </p>
      </div>
    </section>
  );
};

export default LocationInput;