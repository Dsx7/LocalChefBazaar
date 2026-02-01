// pages/ContactUs.jsx
import React, { useState } from 'react';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get in Touch with Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about your order, our home cooks, or just want to say hello? 
            We're here to help — drop us a message!
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-500 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="+880 1X XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Send Message →
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 border-gray-500">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📞</div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">+880 96 1234 5678</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">9 AM – 11 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-3xl">✉️</div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">support@ghoroafood.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📍</div>
                    <div>
                      <h4 className="font-semibold">Office</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        House 12, Road 5, Dhanmondi<br />
                        Dhaka 1205, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-500 h-64 md:h-80">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0000000000005!2d90.376!3d23.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0x9a5a9a5a9a5a9a5a!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1690000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6 text-3xl">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition">
                  <span>FB</span>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition">
                  <span>IG</span>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition">
                  <span>X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We usually respond within 1–2 hours during business hours.<br />
            For urgent order issues, please call us directly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;