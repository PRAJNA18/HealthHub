import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <header className="w-full max-w-7xl mx-auto p-6 mb-16 flex justify-start">
        <h1 className="text-5xl font-cursive text-blue-800">HealthHub</h1>
      </header>

      <section className="w-full max-w-7xl mx-auto text-center mb-16">
        <p className="text-8xl font-sans text-gray-800">
          Predict. Monitor. Consult.
        </p>
      </section>

      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
          <h2 className="text-3xl font-cursive text-gray-800 mb-8">
            Predictive Diagnostics
          </h2>
          <p className="text-3xl font-serif text-gray-600 mb-10">
            Get medical test recommendations based on symptoms and analyze test
            reports with AI.
          </p>
          <Link
            to="/dashboard"
            className="absolute bottom-6 right-6 flex items-center text-blue-600 text-2xl font-semibold hover:underline"
          >
            <i className="fas fa-arrow-right mr-2"></i>
            Try it
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
          <h2 className="text-3xl font-cursive text-gray-800 mb-8">
            Real-Time Health Monitoring
          </h2>
          <p className="text-3xl font-serif text-gray-600 mb-10">
            Track habits and physical activity, and receive feedback and
            suggestions for improvement.
          </p>
          <Link
            to="/monitoring"
            className="absolute bottom-6 right-6 flex items-center text-blue-600 text-2xl font-semibold hover:underline"
          >
            <i className="fas fa-arrow-right mr-2"></i>
            Try it
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
          <h2 className="text-3xl font-cursive text-gray-800 mb-8">
            Virtual Doctor
          </h2>
          <p className="text-3xl font-serif text-gray-600 mb-10">
            Consult with our AI model about medical issues and get multilingual
            support and suggestions.
          </p>
          <Link
            to="/virtual-doctor"
            className="absolute bottom-6 right-6 flex items-center text-blue-600 text-2xl font-semibold hover:underline"
          >
            <i className="fas fa-arrow-right mr-2"></i>
            Try it
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
