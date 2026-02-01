import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission (API call, email service, etc.)
    alert('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#628141]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-[#ff8400]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-[#ff8400] font-bold tracking-widest uppercase text-sm mb-3 block">
                24/7 Support
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#628141] berkshire-swash-regular">
                Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto oswald font-light">
                Have questions about your order, our home cooks, or just want to say hello? 
                We're here to help — drop us a message!
            </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Contact Form Container */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
               {/* Decorative top border */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#628141] to-[#ff8400]"></div>

              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white berkshire-swash-regular">
                  Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                    placeholder="+880 1X XXX XXXX"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-[#628141] hover:bg-[#4f6b32] text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-green-900/20 transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8 flex flex-col">
              {/* Contact Info Card */}
              <div className="bg-[#628141] text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                {/* Abstract Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                
                <h3 className="text-2xl font-bold mb-8 berkshire-swash-regular">Contact Info</h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl shrink-0">
                        <FaPhoneAlt />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg opacity-90">Phone</h4>
                      <p className="font-light text-white/90">+880 96 1234 5678</p>
                      <p className="text-sm text-white/60 mt-1">9 AM – 11 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl shrink-0">
                        <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg opacity-90">Email</h4>
                      <p className="font-light text-white/90">support@ghoroafood.com</p>
                      <p className="text-sm text-white/60 mt-1">Reply within 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl shrink-0">
                        <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg opacity-90">Office</h4>
                      <p className="font-light text-white/90 leading-relaxed">
                        House 12, Road 5, Dhanmondi<br />
                        Dhaka 1205, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="rounded-[2rem] overflow-hidden shadow-lg border-4 border-white dark:border-gray-800 h-64 md:h-auto flex-1 relative min-h-[250px]">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0000000000005!2d90.376!3d23.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0x9a5a9a5a9a5a9a5a!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1690000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <a href="#" className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-600 dark:text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#1877F2] hover:text-white transition-all duration-300">
                    <FaFacebookF className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-600 dark:text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#E4405F] hover:text-white transition-all duration-300">
                    <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-600 dark:text-white rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-all duration-300">
                    <FaTwitter className="text-xl" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="py-12 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 oswald font-light">
            We usually respond within 1–2 hours during business hours.<br />
            For urgent order issues, please <span className="text-[#ff8400] font-medium cursor-pointer underline">call us directly</span>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;