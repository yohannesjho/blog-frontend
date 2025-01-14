import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center space-y-4">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold">About the Blog</h2>
          <p className="text-sm text-gray-400">
            A place to share knowledge, ideas, and inspiration. Follow us for
            the latest updates.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link >
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Instagram
          </a>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Johnova. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
