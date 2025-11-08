import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: '🔬',
      title: t.services.soilTesting.title,
      description: t.services.soilTesting.description,
      features: [
        'Comprehensive soil nutrient analysis',
        'pH level testing',
        'Micronutrient assessment',
        'Fertilizer recommendations',
        'Quick turnaround time (3-5 days)'
      ]
    },
    {
      icon: '🌱',
      title: t.services.fertilizers.title,
      description: t.services.fertilizers.description,
      features: [
        'Organic and chemical fertilizers',
        'High-quality seeds',
        'Pesticides and insecticides',
        'Micro-nutrients and growth promoters',
        'Competitive pricing'
      ]
    },
    {
      icon: '👨‍🌾',
      title: t.services.farmVisits.title,
      description: t.services.farmVisits.description,
      features: [
        'On-site farm consultation',
        'Crop disease diagnosis',
        'Personalized farming advice',
        'Water and irrigation guidance',
        'Seasonal planning support'
      ]
    },
    {
      icon: '🛒',
      title: t.services.marketing.title,
      description: t.services.marketing.description,
      features: [
        'Market price information',
        'Buyer connections',
        'Quality grading assistance',
        'Transportation support',
        'Better price realization'
      ]
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.services.title}</h1>
          <p className="text-xl text-green-100">{t.services.subtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-green-600 to-green-700 p-12 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">{service.icon}</div>
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                    <h4 className="font-bold text-green-800 mb-3">What We Offer:</h4>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="btn-primary inline-block">
                      {t.services.bookService}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-800 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Our experts are here to guide you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300">
              Contact Us
            </Link>
            <a href="tel:+919767038479" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
