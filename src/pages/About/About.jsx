import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            
            {/* Hero Section */}
            <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#628141]/5 to-transparent dark:from-[#628141]/10"></div>
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-200/20 dark:bg-amber-700/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 -left-20 w-72 h-72 bg-green-200/20 dark:bg-green-800/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center z-10">
                    <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-[#ff8400] rounded-full text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">
                        About Us
                    </span>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 berkshire-swash-regular text-[#628141]">
                        Bringing <span className="text-[#ff8400]">Home</span> to <br className="hidden md:block"/> Your Doorstep
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed oswald font-light">
                        We started with a simple dream — to let busy people in Dhaka enjoy authentic, loving, <span className="font-semibold text-[#628141] dark:text-[#ff8400]">ghoroa</span> Bengali food without stepping into the kitchen.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        
                        {/* Image Block */}
                        <div className="relative order-2 lg:order-1 group">
                            <div className="absolute inset-0 bg-[#628141] rounded-[2.5rem] rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                                <img
                                    src="https://assets.cntraveller.in/photos/66f3a5a67597ce29202525ae/3:2/w_4353,h_2902,c_limit/himur%20heshel%20DSC01876~2.JPG"
                                    alt="Traditional Bengali food preparation"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-10 left-10 right-10">
                                     <p className="text-white text-2xl md:text-3xl font-serif italic leading-tight">
                                        "Made with love, <br/> just like home."
                                     </p>
                                </div>
                            </div>
                        </div>

                        {/* Text Block */}
                        <div className="space-y-8 order-1 lg:order-2">
                            <div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 berkshire-swash-regular leading-tight">
                                    Our Journey Began in a <span className="text-[#628141]">Small Kitchen</span>
                                </h2>
                                <div className="w-24 h-1.5 bg-[#ff8400] rounded-full mb-8"></div>
                            </div>

                            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 oswald font-light">
                                <p>
                                    In late 2022–early 2023, a few of us who grew up with the smell of <strong className="font-semibold text-gray-900 dark:text-white">ilish paturi</strong>, <strong className="font-semibold text-gray-900 dark:text-white">bhuna khichuri</strong>, and <strong className="font-semibold text-gray-900 dark:text-white">maacher jhol</strong> realized one painful truth:
                                </p>

                                <div className="pl-6 border-l-4 border-[#ff8400] py-2 my-6 bg-orange-50 dark:bg-orange-900/10 rounded-r-xl">
                                    <p className="text-gray-800 dark:text-gray-100 font-medium italic">
                                        "People in Dhaka were craving real home-cooked taste, but time, traffic, and busy lives stood in the way."
                                    </p>
                                </div>

                                <p>
                                    So we decided to change that — not by opening another restaurant, but by connecting passionate home cooks with people who miss <strong className="text-[#628141] dark:text-[#ff8400]">maa’r haat’er ranna</strong>.
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
            <section className="py-20 md:py-28 bg-white dark:bg-gray-800/50 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#628141]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 berkshire-swash-regular">
                            What Makes Us <span className="text-[#ff8400]">Different?</span>
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-lg oswald">More than just food delivery.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: "❤️", title: "Love in Every Bite", desc: "Prepared by home cooks who treat your order like family food" },
                            { icon: "⚡", title: "Fast & Reliable", desc: "Average delivery under 45 minutes in Dhaka" },
                            { icon: "🍲", title: "100% Authentic Taste", desc: "No shortcuts — real recipes, real spices, real love" },
                            { icon: "🧼", title: "Hygienic & Safe", desc: "Strict packaging and quality checks at every step" },
                            { icon: "💸", title: "Fair Prices", desc: "No hidden fees — what you see is what you pay" },
                            { icon: "🤝", title: "Supporting Local", desc: "Empowering home cooks and creating income opportunities" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#ff8400]/20"
                            >
                                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#628141] transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing Emotional Line */}
            <section className="py-24 md:py-32 text-center bg-gray-50 dark:bg-gray-900 relative">
                <div className="max-w-5xl mx-auto px-5 relative z-10">
                    <svg className="w-10 h-10 md:w-16 md:h-16 text-[#ff8400] mx-auto mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z"></path></svg>
                    
                    <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 dark:text-gray-100 leading-tight berkshire-swash-regular">
                        "Because the best meals are not just food —<br />
                        <span className="text-[#628141] dark:text-[#ff8400]">they're memories delivered warm to your door."</span>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;