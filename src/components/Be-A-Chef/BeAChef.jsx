import React from 'react';
import { useState } from 'react';
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
    <section className="w-full bg-base-100 py-12 p-2 md:p-0 md:py-20 oswald bg-red">
      <div className="lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text column */}
          <div
           data-aos="fade-right"
          >
            <h3 className="text-sm font-semibold text-[#ff8400] uppercase mb-3">Join Our Team</h3>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-4 berkshire-swash-regular dark:text-[#628141]">
              Be a chef — share your homemade meals with our community
            </h2>

            <p className="text-base sm:text-lg mb-6 max-w-xl text-[#ff8400]">
              Cook for thousands of customers who want home-cooked flavors. We handle delivery,
              order management and payments — you focus on what you do best: cooking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent  rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff8400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#628141]">Easy onboarding</h4>
                  <p className="text-xs text-[#ff8400]">Sign up and list your dishes in minutes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent  rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff8400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 6 4-12 3 6h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#628141]">Reliable payouts</h4>
                  <p className="text-xs text-[#ff8400]">Weekly settlements directly to your account.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff8400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v1h6v-1c0-1.657-1.343-3-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#628141]">Support & training</h4>
                  <p className="text-xs text-[#ff8400]">Get listed and get tips to grow orders.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-[#ff8400] hover:bg-accent duration-200 text-[#628141] px-6 py-3 text-sm font-semibold shadow-md focus:outline-none cursor-pointer"
              >
                Apply as a Chef
              </Link>

              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-[#ff8400] text-[#ff8400] px-5 py-3 text-sm font-medium shadow-sm"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Image column */}
          <div
            className="flex justify-center lg:justify-end"
             data-aos="fade-left"
          >
            <div className="w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                alt="homemade meal"
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Apply to become a chef</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Phone number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />

              <input
                name="cuisine"
                value={form.cuisine}
                onChange={handleChange}
                placeholder="Cuisine or special dishes (e.g. biryani, Bengali home-cook)"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />

              <div className="flex gap-3 justify-end mt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-gray-100">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Submit Application</button>
              </div>
            </form>

            <p className="text-xs text-gray-400 mt-3">We will contact you within 48 hours after reviewing your application.</p>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default BeAChef;



// import React from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { motion } from "framer-motion";

// const ReviewCard = ({ review }) => {
//     const { comment, reviewerName, reviewerImage, createdAt } = review;

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: -20 }}
//             transition={{ duration: 0.45, ease: "easeOut" }}
//             className="backdrop-blur-xl bg-white/60 border border-white/20 rounded-3xl 
//                        p-6 w-48 md:w-72 lg:w-80 h-fit text-center shadow-lg"
//         >
//             {/* Quote Icon */}
//             {/* <div className="text-teal-300 text-4xl mb-4">
//                 <FaUserCircle />
//             </div> */}

//             {/* Review Text */}
//             <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
//                 {comment}
//             </p>

//             {/* Divider */}
//             <div className="border-t border-dashed border-primary my-4"></div>

//             {/* Profile Section */}
//             <div className="flex items-center gap-3 justify-center">
//                 <img className="w-10 h-10 rounded-full bg-teal-900" src={reviewerImage} alt={reviewerName} />
//                 <div>
//                     <h3 className="font-semibold text-gray-800">{reviewerName}</h3>
//                     <p className="text-sm text-gray-500">{new Date(createdAt).toDateString()}</p>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default ReviewCard;