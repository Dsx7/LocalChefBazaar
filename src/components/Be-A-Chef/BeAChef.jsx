import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';

const BeAChef = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", cuisine: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For now we just open mail client as a simple submission action
    const subject = encodeURIComponent("Be a Chef - Application");
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nCuisine: ${form.cuisine}`);
    window.location.href = `mailto:partners@yourdomain.com?subject=${subject}&body=${body}`;
    setOpen(false);
  }

  return (
    <section className="relative w-full py-16 md:py-24 bg-orange-50/50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#628141]/5 skew-x-12 transform translate-x-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Column */}
          <div data-aos="fade-right" className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
               <h3 className="text-xs md:text-sm font-bold text-[#ff8400] tracking-widest uppercase">
                  Join Our Team
               </h3>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#628141] leading-[1.1] mb-6 berkshire-swash-regular drop-shadow-sm">
              Be a chef — share your homemade meals.
            </h2>

            <p className="text-lg sm:text-xl mb-8 text-gray-600 dark:text-gray-300 oswald font-light leading-relaxed max-w-lg">
              Cook for thousands of customers who want home-cooked flavors. We handle delivery,
              order management and payments — you focus on what you do best: cooking.
            </p>

            {/* Benefits Grid - Redesigned */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {/* Item 1 */}
              <div className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-[#628141]/30 transition-all duration-300">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#628141]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-[#628141] mb-1">Easy onboarding</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sign up and list your dishes in minutes.</p>
              </div>

              {/* Item 2 */}
              <div className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-[#628141]/30 transition-all duration-300">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#628141]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 6 4-12 3 6h4" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-[#628141] mb-1">Reliable payouts</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Weekly settlements directly to your account.</p>
              </div>

              {/* Item 3 */}
              <div className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-[#628141]/30 transition-all duration-300">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#628141]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v1h6v-1c0-1.657-1.343-3-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-[#628141] mb-1">Support & training</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Get listed and get tips to grow orders.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setOpen(true)}
                className="
                  inline-flex items-center justify-center 
                  bg-[#628141] text-white
                  hover:bg-[#4f6b32] 
                  px-8 py-4 rounded-full 
                  text-base font-bold shadow-lg shadow-green-900/20
                  transform hover:-translate-y-1 transition-all duration-300
                "
              >
                Apply as a Chef
              </button>

              <a
                href="#"
                className="
                   inline-flex items-center justify-center 
                   bg-white dark:bg-transparent
                   border-2 border-[#ff8400] text-[#ff8400] 
                   hover:bg-[#ff8400] hover:text-white
                   px-8 py-4 rounded-full 
                   text-base font-bold
                   transition-all duration-300
                "
              >
                How it works
              </a>
            </div>
          </div>

          {/* Image Column - Floating Card Effect */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2" data-aos="fade-left">
            <div className="relative w-full max-w-lg">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-60"></div>
                
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                        alt="Homemade meal preparation"
                        className="w-full h-[400px] lg:h-[500px] object-cover"
                    />
                    {/* Floating Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border-l-4 border-[#ff8400]">
                        <p className="text-[#628141] font-bold text-lg">Earn from home</p>
                        <p className="text-xs text-gray-500">Start your journey today</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Modernized */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <div>
                  <h3 className="text-2xl font-bold text-[#628141] berkshire-swash-regular">Join as a Chef</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fill details to get started</p>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Rahim Uddin"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="e.g. +880 1XXX XXXXXX"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Specialty</label>
                    <input
                        name="cuisine"
                        value={form.cuisine}
                        onChange={handleChange}
                        placeholder="e.g. Beef Bhuna, Kacchi"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <button 
                        type="button" 
                        onClick={() => setOpen(false)} 
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 px-4 py-3 rounded-xl bg-[#628141] text-white hover:bg-[#4f6b32] font-bold shadow-lg shadow-green-900/20 transition-all"
                    >
                        Submit
                    </button>
                </div>
                </form>

                <p className="text-xs text-center text-gray-400 mt-4">
                    We will review your profile and contact you within 48 hours.
                </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default BeAChef;