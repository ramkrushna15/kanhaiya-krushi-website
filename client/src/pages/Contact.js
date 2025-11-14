import React, { useState } from 'react';
import { useLanguage } from '../App';
import axios from 'axios';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const services = [
    t.services.soilTesting.title,
    t.services.fertilizers.title,
    t.services.farmVisits.title,
    t.services.marketing.title
  ];

  // Validate Indian phone number format
  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
      
      await axios.post(`${API_URL}/contact/add-contact-info`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000 // 10 second timeout
      });
      
      setStatus({ type: 'success', message: t.contact.success || 'Thank you! We will contact you soon.' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      
      let errorMessage = t.contact.error || 'Something went wrong. Please try again.';
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // No response from server
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      }
      
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h1>
          <p className="text-xl text-green-100">{t.contact.subtitle}</p>
        </div>
      </section>
      
      {/* Contact Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">{t.contact.getInTouch}</h2>
              <p className="text-gray-600 mb-6">{t.contact.description}</p>

              {status.message && (
                <div 
                  className={`mb-6 p-4 rounded-lg ${
                    status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="form-label">{t.contact.form.name} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder={t.contact.form.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="form-label">{t.contact.form.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder={t.contact.form.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">{t.contact.form.phone} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    pattern="[6-9]\d{9}"
                    maxLength="10"
                    className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="9876543210"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600" role="alert">{errors.phone}</p>
                  )}
                  {!errors.phone && (
                    <p className="mt-1 text-xs text-gray-500">Enter 10-digit mobile number without +91</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="form-label">{t.contact.form.service}</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">{t.contact.form.selectService}</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">{t.contact.form.message} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    rows="4"
                    className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                    placeholder={t.contact.form.message}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600" role="alert">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={loading}
                >
                  {loading ? (t.contact.form.sending || 'Sending...') : (t.contact.form.submit || 'Submit')}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-green-800 mb-6">{t.contact.info.title}</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg" aria-hidden="true">
                      <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{t.contact.info.address}</h3>
                      <p className="text-gray-600">{t.contact.info.addressValue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg" aria-hidden="true">
                      <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{t.contact.info.phone}</h3>
                      <a href="tel:+919767038479" className="text-green-700 hover:text-green-900">
                        +91 97670 38479
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg" aria-hidden="true">
                      <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{t.contact.info.email}</h3>
                      <a href="mailto:info@kanhaiyakrushi.com" className="text-green-700 hover:text-green-900">
                        info@kanhaiyakrushi.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg" aria-hidden="true">
                      <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{t.contact.info.hours}</h3>
                      <p className="text-gray-600">{t.contact.info.hoursValue}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+919767038479" 
                    className="flex items-center space-x-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 transition-all"
                    aria-label="Call us at +91 97670 38479"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Call Us Now</span>
                  </a>
                  <a 
                    href="https://wa.me/919767038479" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 transition-all"
                    aria-label="Chat with us on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                    <span>WhatsApp Us</span>
                  </a>
                  <a 
                    href="mailto:info@kanhaiyakrushi.com"
                    className="flex items-center space-x-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 transition-all"
                    aria-label="Email us at info@kanhaiyakrushi.com"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;