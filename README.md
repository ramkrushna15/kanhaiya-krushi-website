# Kanhaiya Krushi - Agricultural Services Platform

**Professional agricultural services website for Kanhaiya Krushi Seva Kendra**

## 🌾 About Kanhaiya Krushi

Kanhaiya Krushi is a comprehensive agricultural services provider based in Jeur, Maharashtra. We offer:
- Soil Testing Services
- Fertilizer Sales and Consultation
- Farm Visits and Expert Advice
- Agricultural Product Marketing
- Future: Farmer Producer Company (FPC)
- Future: Export Services

## 📋 Features

### Current Features
- ✅ Bilingual Support (Marathi + English)
- ✅ Service Catalog
- ✅ Online Inquiry/Contact Form
- ✅ Product Listings
- ✅ Responsive Design
- ✅ Email Notifications
- ✅ Service Booking System
- ✅ About Us & Location Information

### Future Ready
- 🔄 Farmer Dashboard
- 🔄 Admin Panel
- 🔄 FPC Portal
- 🔄 Export Services Module
- 🔄 Multi-location Support
- 🔄 Payment Integration

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Nodemailer (Email)
- JWT Authentication (ready)

## 📁 Project Structure

```
kanhaiya-krushi-new/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── translations/  # Language files
│   │   ├── utils/         # Utility functions
│   │   └── App.js
│   ├── package.json
│   └── .env.example
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── README.md
└── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone and Install

```bash
# Extract the zip file
cd kanhaiya-krushi-new

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Step 2: Environment Configuration

#### Server Environment (.env)
Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kanhaiya-krushi
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=info@kanhaiyakrushi.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=noreply@kanhaiyakrushi.com

# CORS
CLIENT_URL=http://localhost:3000
```

#### Client Environment (.env)
Create `client/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Run the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The application will open at `http://localhost:3000`

#### Production Build

```bash
# Build client
cd client
npm run build

# The build folder can be served by the Express server
```

## 📧 Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in `EMAIL_PASS`

## 🗄️ Database Setup

The application will automatically connect to MongoDB. Initial setup:

```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI with your Atlas connection string
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder
3. Set environment variables in hosting platform

### Backend (Heroku/Railway/Render)
1. Push to Git repository
2. Connect to hosting platform
3. Set all environment variables
4. Deploy

### Environment Variables for Production

**Client (.env.production):**
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_API_BASE_URL=https://your-api-domain.com/api
```

**Server:**
- Set all variables from `.env.example` in hosting platform
- Use production MongoDB URI
- Use production email credentials

## 📱 Contact Information

- **Website**: kanhaiyakrushi.com
- **Email**: info@kanhaiyakrushi.com
- **WhatsApp**: +91 97670 38479
- **Location**: Jeur, Maharashtra, India

## 🤝 Support

For technical support or queries:
- Email: info@kanhaiyakrushi.com
- WhatsApp: +91 97670 38479

## 📄 License

Copyright © 2025 Kanhaiya Krushi Seva Kendra. All rights reserved.

---

**Built with ❤️ for Indian Farmers**
