import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-pink-600">BookBasket</span>, your one-stop destination for a wide range of books across genres. Whether you're into romance, mythology, biographies, or modern fiction, we aim to bring you a curated collection that inspires, informs, and entertains.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Our mission is to make reading more accessible and enjoyable. Built with passion and powered by modern tech, BookBasket connects book lovers with stories that matter. We're constantly working to improve your experience — from seamless browsing to personalized recommendations.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Thank you for choosing us to be part of your reading journey.
        </p>
      </div>
    </div>
  );
};

export default About;
