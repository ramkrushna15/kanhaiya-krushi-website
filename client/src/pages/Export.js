import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

const Export = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: '🌍',
      title: t.export.feature1,
      description: 'Connect with international buyers for premium agricultural products'
    },
    {
      icon: '📋',
      title: t.export.feature2,
      description: 'Complete assistance with export documentation and compliance'
    },
    {
      icon: '✅',
      title: t.export.feature3,
      description: 'Help with quality standards and international certifications'
    },
    {
      icon: '🚢',
      title: t.export.feature4,
      description: 'End-to-end logistics support for smooth export operations'
    }
  ];

  const targetProducts = [
    { name: 'Organic Produce', icon: '🥬', markets: 'Europe, USA' },
    { name: 'Spices', icon: '🌶️', markets: 'Middle East, Asia' },
    { name: 'Rice & Grains', icon: '🌾', markets: 'Africa, Middle East' },
    { name: 'Processed Foods', icon: '🥫', markets: 'Global' }
  ];

  return (
    <div className="export-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-16">
        <div className="container-custom text-center">
          <div className="inline-block bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-bold mb-6">
            {t.export.comingSoon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.export.title}</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            {t.export.description}
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">Our Export Vision</h2>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We envision connecting our local farmers directly with international markets, ensuring they receive premium prices for their high-quality agricultural products. Our export services will bridge the gap between Maharashtra's rich agricultural heritage and global demand.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through professional management, quality control, and comprehensive support, we aim to make international trade accessible to even small and medium farmers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t.export.features}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title">Products We Plan to Export</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {targetProducts.map((product, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="text-5xl mb-3">{product.icon}</div>
                <h3 className="font-bold text-purple-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600">Target: {product.markets}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements for Export */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">What Farmers Will Need</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Quality Standards</h3>
                <p className="text-sm text-gray-600">Products must meet international quality and safety standards</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Documentation</h3>
                <p className="text-sm text-gray-600">Proper documentation and traceability of products</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Certification</h3>
                <p className="text-sm text-gray-600">Required certifications for target markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title">Planned Timeline</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">
                  Q1
                </div>
                <div className="bg-purple-50 rounded-lg p-4 flex-1">
                  <h3 className="font-bold text-purple-800 mb-1">2026: Research & Planning</h3>
                  <p className="text-gray-600 text-sm">Market research, partner identification, regulatory compliance</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">
                  Q2
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 flex-1">
                  <h3 className="font-bold text-indigo-800 mb-1">2026: Infrastructure Setup</h3>
                  <p className="text-gray-600 text-sm">Quality control systems, certifications, logistics partnerships</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">
                  Q3
                </div>
                <div className="bg-blue-50 rounded-lg p-4 flex-1">
                  <h3 className="font-bold text-blue-800 mb-1">2026: Pilot Program</h3>
                  <p className="text-gray-600 text-sm">Initial exports with selected farmers and products</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">
                  Q4
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex-1">
                  <h3 className="font-bold text-green-800 mb-1">2026: Full Launch</h3>
                  <p className="text-gray-600 text-sm">Expand to all eligible farmers and product categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in Exporting Your Products?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Get in touch to learn more about our upcoming export services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg">
              Contact Us
            </Link>
            <a href="tel:+919767038479" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg">
              Call for Details
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Export;
