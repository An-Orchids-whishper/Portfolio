import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white"
    >
      <div className="w-full max-w-2xl p-10 rounded-2xl shadow-xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg space-y-6">
        <h2 className="text-3xl font-bold text-center">Contact Me</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Have a question or want to work together? Just drop me a message.
        </p>

        <form className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
