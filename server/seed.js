require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kanhaiya-krushi';

const sampleProducts = [
  {
    name: 'NPK Fertilizer (19:19:19)',
    category: 'fertilizers',
    price: '₹850/kg',
    description: 'Balanced NPK fertilizer suitable for all crops. Provides essential nutrients for healthy plant growth.',
    inStock: true,
    image: '🌾',
    specifications: {
      'Nitrogen': '19%',
      'Phosphorus': '19%',
      'Potassium': '19%',
      'Application': 'Broadcasting or drip irrigation'
    }
  },
  {
    name: 'Organic Manure',
    category: 'fertilizers',
    price: '₹300/kg',
    description: 'Premium quality organic manure for sustainable farming. Improves soil structure and fertility.',
    inStock: true,
    image: '♻️',
    specifications: {
      'Type': '100% Organic',
      'Moisture': 'Max 25%',
      'NPK': '3:1:2',
      'Application': 'Base application'
    }
  },
  {
    name: 'Hybrid Tomato Seeds',
    category: 'seeds',
    price: '₹450/packet',
    description: 'High yielding tomato variety with excellent disease resistance. Suitable for all seasons.',
    inStock: true,
    image: '🍅',
    specifications: {
      'Variety': 'Hybrid F1',
      'Maturity': '65-70 days',
      'Yield': '25-30 tons/acre',
      'Season': 'All year'
    }
  },
  {
    name: 'Wheat Seeds (HD-2967)',
    category: 'seeds',
    price: '₹35/kg',
    description: 'Premium wheat variety known for high yield and disease resistance. Ideal for Maharashtra climate.',
    inStock: true,
    image: '🌾',
    specifications: {
      'Variety': 'HD-2967',
      'Maturity': '140-145 days',
      'Yield': '50-55 quintals/hectare',
      'Sowing': 'November-December'
    }
  },
  {
    name: 'Bio-Pesticide',
    category: 'pesticides',
    price: '₹650/liter',
    description: 'Eco-friendly biological pesticide for pest control. Safe for beneficial insects and environment.',
    inStock: true,
    image: '🛡️',
    specifications: {
      'Type': 'Biological',
      'Target': 'General pests',
      'Application': 'Foliar spray',
      'Frequency': 'Every 10-15 days'
    }
  },
  {
    name: 'Neem-based Pesticide',
    category: 'pesticides',
    price: '₹450/liter',
    description: 'Natural neem-based pesticide effective against various pests and diseases.',
    inStock: true,
    image: '🌿',
    specifications: {
      'Active Ingredient': 'Azadirachtin 1500 ppm',
      'Target': 'Sucking & chewing pests',
      'Application': 'Spray',
      'Safe period': 'No waiting period'
    }
  },
  {
    name: 'Drip Irrigation Kit',
    category: 'equipment',
    price: '₹12,000/set',
    description: 'Complete drip irrigation system for water-efficient farming. Covers 1 acre.',
    inStock: false,
    image: '💧',
    specifications: {
      'Coverage': '1 acre',
      'Type': 'Inline drip',
      'Components': 'Pipes, emitters, filters, valves',
      'Warranty': '2 years'
    }
  },
  {
    name: 'Power Sprayer',
    category: 'equipment',
    price: '₹8,500/unit',
    description: 'Battery-operated power sprayer for efficient pesticide and fertilizer application.',
    inStock: true,
    image: '💦',
    specifications: {
      'Capacity': '16 liters',
      'Battery': '12V rechargeable',
      'Pressure': 'Adjustable',
      'Nozzles': '3 types included'
    }
  },
  {
    name: 'Vermicompost',
    category: 'fertilizers',
    price: '₹400/kg',
    description: 'High-quality vermicompost rich in nutrients and beneficial microorganisms.',
    inStock: true,
    image: '🪱',
    specifications: {
      'Organic Content': '>40%',
      'pH': '6.5-7.5',
      'Nitrogen': '1.5-2%',
      'Application': 'All crops'
    }
  },
  {
    name: 'Cotton Seeds (BG-II)',
    category: 'seeds',
    price: '₹850/packet',
    description: 'BT cotton seeds with dual gene technology for bollworm resistance.',
    inStock: true,
    image: '🌱',
    specifications: {
      'Technology': 'BG-II',
      'Maturity': '150-160 days',
      'Yield': '20-25 quintals/hectare',
      'Sowing': 'June-July'
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${sampleProducts.length} sample products`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
