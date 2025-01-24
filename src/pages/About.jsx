import React from "react";

const About = () => {
  return (
    <div className="about-page bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Welcome to <span className="font-semibold">Johnova blog</span>, your go-to platform for thoughtfully curated blogs and insights. 
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-4">
          This platform is exclusively managed by our admin, who is passionate about delivering high-quality, engaging, and well-researched content. By ensuring that all posts are carefully crafted and reviewed, we aim to maintain a standard of excellence that sets us apart.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Why Choose Us:</h2>
        <ul className="text-left list-disc list-inside text-gray-600 mb-6 space-y-4">
          <li>
            <strong>Exclusive Content:</strong> All blog posts are written and posted by the admin, guaranteeing consistency, accuracy, and creativity.
          </li>
          <li>
            <strong>Focused Topics:</strong> We cover a range of subjects thoughtfully chosen to inspire, educate, and entertain.
          </li>
          <li>
            <strong>Authenticity Guaranteed:</strong> With only the admin managing posts, you can trust the voice and quality of our content.
          </li>
        </ul>
        <p className="text-base sm:text-lg text-gray-600 mb-4">
          At <span className="font-semibold">Johnova blog</span>, our goal is to create a space where you can access meaningful, well-crafted stories and insights, free from noise and distractions. Every piece is a reflection of our commitment to quality.
        </p>
        <p className="text-base sm:text-lg text-gray-600">
          <strong>Have questions or feedback?</strong> Reach out to us directly—we'd love to hear from you.
        </p>
      </div>
    </div>
  );
};

export default About;
