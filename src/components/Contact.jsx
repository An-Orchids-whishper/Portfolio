import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 py-20 
                 bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white"
    >
      <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 
                      dark:from-purple-400/10 dark:to-indigo-400/10 
                      backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-2xl w-full z-10 text-center border border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>

        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Have a project idea or just want to say hi? Let’s connect!
        </p>

        <form
          action="mailto:imt_2023039@iiitm.ac.in"
          method="POST"
          encType="text/plain"
          className="space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button
            type="submit"
            className="inline-block w-full px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 duration-300"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          Or email me directly at{" "}
          <a
            href="mailto:imt_2023039@iiitm.ac.in"
            className="text-purple-400 hover:underline"
          >
            imt_2023039@iiitm.ac.in
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
