// components/DownloadApp.jsx
import React from 'react';

const DownloadApp = () => {
    return (
        <section className="py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Text & Buttons */}
                    <div className="text-center lg:text-left z-10">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#628141] mb-6 leading-tight berkshire-swash-regular">
                            Download Our App Today!
                        </h2>

                        <p className="text-lg md:text-xl text-[#ff8400] mb-10 max-w-xl mx-auto lg:mx-0 oswald">
                            Get faster ordering, real-time tracking, exclusive app deals, and the best
                            ghoroa Bengali food experience right at your fingertips.
                        </p>

                        {/* App Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            {/* Google Play */}
                            <a
                                href="#"
                                className="flex items-center gap-4 bg-black dark:bg-white text-white dark:text-black px-7 py-4 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-xl min-w-[240px]"
                            >
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.609 22.186C2.712 21.726 2 20.467 2 19V5c0-1.467.712-2.726 1.609-3.186zM15.5 12.708l4.146 4.146L15.5 20.999V12.708zM15.5 3.001v8.291l4.146 4.146L15.5 3.001z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs uppercase tracking-wide opacity-80">GET IT ON</div>
                                    <div className="text-xl font-bold">Google Play</div>
                                </div>
                            </a>

                            {/* App Store */}
                            <a
                                href="#"
                                className="flex items-center gap-4 bg-black dark:bg-white text-white dark:text-black px-7 py-4 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-xl min-w-[240px]"
                            >
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.06 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs uppercase tracking-wide opacity-80">Download on the</div>
                                    <div className="text-xl font-bold">App Store</div>
                                </div>
                            </a>
                        </div>

                        <p className="mt-8 text-sm text-[#ff8400] oswald">
                            Free on iOS & Android • Instant download
                        </p>
                    </div>

                    {/* Right - Beautiful Phone Mockups */}
                    <div className="relative hidden lg:block h-[600px]">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-red-500/10 to-transparent dark:from-amber-700/20 dark:via-red-700/15 rounded-full blur-3xl scale-125" />

                        {/* Main Phone - Bigger & Centered */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 transform rotate-3 hover:rotate-0 transition-transform duration-700 z-20">
                            <img
                                src="https://img.freepik.com/free-photo/17-lifestyle-people-ordering-sushi-home_52683-100640.jpg?w=800&q=90"
                                alt="Food Delivery App - Delicious Dishes"
                                className="rounded-[3rem] shadow-2xl border-[12px] border-gray-900 dark:border-gray-200 object-cover"
                            />
                        </div>

                        {/* Floating Secondary Phone - Food App UI */}
                        <div className="absolute top-20 right-10 w-64 transform -rotate-6 hover:rotate-0 transition-transform duration-700 z-10">
                            <img
                                src="https://appwrk.com/wp-content/uploads/2023/05/14-1-1024x562.webp"
                                alt="Food Delivery App Interface"
                                className="rounded-[2.8rem] shadow-xl border-[10px] border-gray-900 dark:border-gray-200 object-cover"
                            />
                        </div>

                        {/* Third Floating Element - Small Preview */}
                        <div className="absolute bottom-16 left-16 w-48 transform rotate-6 hover:rotate-0 transition-transform duration-700 z-10 opacity-90">
                            <img
                                src="https://appwrk.com/wp-content/uploads/2023/05/14-1-1024x562.webp"
                                alt="App Order Screen"
                                className="rounded-[2.5rem] shadow-lg border-8 border-gray-900 dark:border-gray-200 object-cover"
                            />
                        </div>
                    </div>

                    {/* Mobile fallback - single centered phone */}
                    <div className="lg:hidden flex justify-center mt-12">
                        <div className="w-72 sm:w-80 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://img.freepik.com/free-photo/17-lifestyle-people-ordering-sushi-home_52683-100640.jpg?w=800&q=90"
                                alt="Food Delivery App"
                                className="rounded-[3rem] shadow-2xl border-[12px] border-gray-900 dark:border-gray-200"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadApp;