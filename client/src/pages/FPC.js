import React, { useState } from 'react';
import { useLanguage } from '../App';

const FPC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  const benefits = [
    {
      icon: '💰',
      title: t.fpc.benefit1,
      description: 'Direct market access ensures better income for farmers'
    },
    {
      icon: '🤝',
      title: t.fpc.benefit2,
      description: 'Collective purchasing reduces input costs significantly'
    },
    {
      icon: '📊',
      title: t.fpc.benefit3,
      description: 'Professional management and transparent operations'
    },
    {
      icon: '📈',
      title: t.fpc.benefit4,
      description: 'Members receive dividends based on their participation'
    }
  ];

  return (
    <div className="fpc-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="container-custom text-center">
          <div className="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold mb-6">
            {t.fpc.comingSoon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.fpc.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t.fpc.description}
          </p>
        </div>
      </section>

      {/* What is FPC */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">What is a Farmer Producer Company?</h2>
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A Farmer Producer Company (FPC) is a registered company where farmers come together to collectively own and manage agricultural businesses. It combines the benefits of cooperatives with the efficiency of private companies.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our upcoming FPC, farmers will have better bargaining power, access to technology, market linkages, and professional management - all while maintaining ownership and control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t.fpc.benefits}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title">How Will It Work?</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-700">1</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Membership</h3>
              <p className="text-sm text-gray-600">Farmers join as members with minimal investment</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-green-700">2</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Collective Action</h3>
              <p className="text-sm text-gray-600">Pool resources for better purchasing and selling</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-orange-700">3</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Professional Management</h3>
              <p className="text-sm text-gray-600">Expert team handles operations and marketing</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-700">4</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Share Profits</h3>
              <p className="text-sm text-gray-600">Members receive dividends and benefits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Register Interest */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.fpc.register}</h2>
            <p className="text-xl mb-8 text-blue-100">{t.fpc.registerDesc}</p>

            {submitted ? (
              <div className="bg-green-500 bg-opacity-20 border-2 border-green-300 rounded-lg p-6">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-xl font-semibold">Thank you for registering your interest!</p>
                <p className="text-blue-100 mt-2">We'll notify you when the FPC launches.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-6 py-4 rounded-lg text-gray-900 text-lg flex-1 max-w-md"
                />
                <button type="submit" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg">
                  Register Interest
                </button>
              </form>
            )}

            <p className="text-sm text-blue-200 mt-6">
              Expected Launch: Q4 2025 | Target: 1000+ Member Farmers
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center">
          <p className="text-gray-600 mb-4">
            For more information about the FPC initiative
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919767038479" className="text-blue-700 font-semibold hover:text-blue-900">
              📞 +91 97670 38479
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="mailto:info@kanhaiyakrushi.com" className="text-blue-700 font-semibold hover:text-blue-900">
              ✉️ info@kanhaiyakrushi.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FPC;
