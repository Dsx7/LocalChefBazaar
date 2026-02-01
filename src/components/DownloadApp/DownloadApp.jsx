import React from 'react';
import { FaGooglePlay, FaApple } from "react-icons/fa";

const DownloadApp = () => {
    return (
        <section className="relative py-20 md:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
            
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#628141]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#ff8400]/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Left - Text Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full mb-6 shadow-sm">
                            <span className="text-[#ff8400] font-bold text-xs md:text-sm tracking-widest uppercase">
                                Mobile App
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#628141] mb-6 leading-[1.1] berkshire-swash-regular drop-shadow-sm">
                            Order food directly from your pocket.
                        </h2>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 oswald font-light leading-relaxed">
                            Get faster ordering, real-time tracking, exclusive app deals, and the best 
                            <span className="text-[#ff8400] font-semibold"> ghoroa Bengali food</span> experience right at your fingertips.
                        </p>

                        {/* App Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            {/* Google Play */}
                            <a
                                href="#"
                                className="group flex items-center gap-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 rounded-xl hover:bg-[#628141] dark:hover:bg-[#628141] hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-900/20 hover:-translate-y-1 min-w-[200px]"
                            >
                                <FaGooglePlay className="text-3xl" />
                                <div className="text-left flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider opacity-80 leading-none mb-1">Get it on</span>
                                    <span className="text-lg font-bold leading-none">Google Play</span>
                                </div>
                            </a>

                            {/* App Store */}
                            <a
                                href="#"
                                className="group flex items-center gap-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 rounded-xl hover:bg-[#ff8400] dark:hover:bg-[#ff8400] hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-900/20 hover:-translate-y-1 min-w-[200px]"
                            >
                                <FaApple className="text-4xl pb-1" />
                                <div className="text-left flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider opacity-80 leading-none mb-1">Download on the</span>
                                    <span className="text-lg font-bold leading-none">App Store</span>
                                </div>
                            </a>
                        </div>

                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                4.8/5 Rating
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                10K+ Downloads
                            </span>
                        </div>
                    </div>

                    {/* Right - Visual Mockups */}
                    <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center">
                         {/* Circle Background behind phones */}
                         <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-gray-200 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-full shadow-inner z-0" />
                        
                        {/* Front Phone */}
                        <div className="absolute z-20 w-64 md:w-80 transform -rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                            <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-gray-900 dark:border-gray-800 shadow-2xl bg-gray-800">
                                <img
                                    src="https://img.freepik.com/free-photo/17-lifestyle-people-ordering-sushi-home_52683-100640.jpg?w=800&q=90"
                                    alt="App Screenshot 1"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        {/* Back Phone */}
                        <div className="absolute z-10 w-64 md:w-80 transform translate-x-12 sm:translate-x-24 translate-y-8 md:translate-y-12 rotate-12 hover:rotate-0 transition-transform duration-500">
                            <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-gray-900 dark:border-gray-800 shadow-xl opacity-90 bg-gray-800">
                                <img
                                    src="https://appwrk.com/wp-content/uploads/2023/05/14-1-1024x562.webp"
                                    alt="App Screenshot 2"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-10 -left-4 md:left-0 z-30 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-bounce">
                             <div className="flex items-center gap-3">
                                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-[#ff8400]">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Speed</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Under 45 mins</p>
                                </div>
                             </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default DownloadApp;