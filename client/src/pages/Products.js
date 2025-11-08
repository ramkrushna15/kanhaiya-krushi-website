import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

const Products = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'NPK Fertilizer (19:19:19)',
      category: 'fertilizers',
      price: '₹850/kg',
      inStock: true,
      description: 'Balanced NPK for all crops',
      image: '🌾'
    },
    {
      id: 2,
      name: 'Hybrid Tomato Seeds',
      category: 'seeds',
      price: '₹450/packet',
      inStock: true,
      description: 'High yield tomato variety',
      image: '🍅'
    },
    {
      id: 3,
      name: 'Organic Manure',
      category: 'fertilizers',
      price: '₹300/kg',
      inStock: true,
      description: 'Premium quality organic',
      image: '♻️'
    },
    {
      id: 4,
      name: 'Bio-Pesticide',
      category: 'pesticides',
      price: '₹650/liter',
      inStock: true,
      description: 'Eco-friendly pest control',
      image: '🛡️'
    },
    {
      id: 5,
      name: 'Wheat Seeds (HD-2967)',
      category: 'seeds',
      price: '₹35/kg',
      inStock: true,
      description: 'Premium wheat variety',
      image: '🌾'
    },
    {
      id: 6,
      name: 'Drip Irrigation Kit',
      category: 'equipment',
      price: '₹12,000/set',
      inStock: false,
      description: 'Water-efficient system',
      image: '💧'
    }
  ];

  const categories = [
    { id: 'all', name: t.products.category.all },
    { id: 'fertilizers', name: t.products.category.fertilizers },
    { id: 'seeds', name: t.products.category.seeds },
    { id: 'pesticides', name: t.products.category.pesticides },
    { id: 'equipment', name: t.products.category.equipment }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.products.title}</h1>
          <p className="text-xl text-green-100">{t.products.subtitle}</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-green-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-green-100 to-green-200 h-48 flex items-center justify-center">
                  <div className="text-8xl">{product.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    {product.inStock ? (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {t.products.inStock}
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {t.products.outOfStock}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-700">{product.price}</span>
                    <Link 
                      to="/contact" 
                      className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors text-sm font-semibold"
                    >
                      {t.products.inquire}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Information Banner */}
      <section className="bg-green-800 text-white py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Looking for a Specific Product?
          </h2>
          <p className="text-lg text-green-100 mb-6">
            We can source specialized agricultural inputs based on your requirements
          </p>
          <Link to="/contact" className="btn-secondary inline-block">
            Contact Us for Special Orders
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;
