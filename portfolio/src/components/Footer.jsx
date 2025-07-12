import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 text-center bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
      <p>© 2025 Kartik Pal. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <a
          href="https://github.com/An-Orchids-whishper"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/kartik-pal-76b8a31ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="mailto:imt_2023039@iiitm.ac.in"
          className="hover:underline"
        >
          Email
        </a>
      </div>
    </footer>
  );
};

export default Footer;
