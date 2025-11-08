# Deployment Guide for Kanhaiya Krushi Website

This guide provides step-by-step instructions for deploying the Kanhaiya Krushi agricultural services platform.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- A domain name (optional but recommended)
- Email account for notifications (Gmail recommended)

## Local Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
cd ..
```

### 2. Configure Environment Variables

#### Server Configuration

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kanhaiya-krushi
JWT_SECRET=your_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=info@kanhaiyakrushi.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=noreply@kanhaiyakrushi.com
CLIENT_URL=http://localhost:3000
```

#### Client Configuration

Create `client/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# Start MongoDB service
mongod

# Or if using systemd
sudo systemctl start mongod
```

### 4. Seed Database (Optional)

```bash
cd server
npm run seed
```

### 5. Run Development Servers

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

The application will be available at `http://localhost:3000`

---

## Production Deployment

### Option 1: Deploy to Vercel (Frontend) + Render (Backend)

#### Frontend Deployment (Vercel)

1. **Build the Client:**
   ```bash
   cd client
   npm run build
   ```

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `REACT_APP_API_URL` = your backend URL (e.g., `https://your-api.onrender.com`)
     - `REACT_APP_API_BASE_URL` = `https://your-api.onrender.com/api`

#### Backend Deployment (Render)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Create Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** kanhaiya-krushi-api
     - **Root Directory:** server
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Add Environment Variables in Render:**
   - `PORT` = 5000
   - `NODE_ENV` = production
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = generate a secure random string
   - `EMAIL_HOST` = smtp.gmail.com
   - `EMAIL_PORT` = 587
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASS` = your Gmail App Password
   - `EMAIL_FROM` = noreply@kanhaiyakrushi.com
   - `CLIENT_URL` = your Vercel deployment URL

---

### Option 2: Deploy to Single VPS (Ubuntu)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt install -y mongodb

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

#### 2. Upload Project

```bash
# Clone repository
git clone your-repo-url
cd kanhaiya-krushi-new

# Install dependencies
npm run install-all
```

#### 3. Configure Environment Variables

Create `.env` files as described in the local setup section, but use production values.

#### 4. Build Frontend

```bash
cd client
npm run build
```

#### 5. Configure Nginx

Create `/etc/nginx/sites-available/kanhaiyakrushi`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        root /path/to/kanhaiya-krushi-new/client/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/kanhaiyakrushi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. Start Backend with PM2

```bash
cd server
pm2 start server.js --name kanhaiya-api
pm2 save
pm2 startup
```

#### 7. Setup SSL (Optional but Recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## MongoDB Atlas Setup (Cloud Database)

1. **Create Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster:**
   - Click "Build a Cluster"
   - Choose "Shared" (free tier)
   - Select region closest to your users
   - Click "Create Cluster"

3. **Setup Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Grant "Read and write to any database"

4. **Setup Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)

5. **Get Connection String:**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

---

## Email Setup (Gmail)

1. **Enable 2-Factor Authentication:**
   - Go to your Google Account
   - Security → 2-Step Verification → Turn On

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Click "Generate"
   - Use this password in `EMAIL_PASS` environment variable

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test contact form submission
- [ ] Verify email notifications work
- [ ] Test product filtering
- [ ] Test language toggle (English/Marathi)
- [ ] Check mobile responsiveness
- [ ] Test all links and navigation
- [ ] Verify SSL certificate is active
- [ ] Setup Google Analytics (optional)
- [ ] Setup error monitoring (Sentry, etc.)
- [ ] Configure backup strategy for database

---

## Maintenance

### Update Application

```bash
git pull origin main
cd client && npm install && npm run build
cd ../server && npm install
pm2 restart kanhaiya-api
```

### Monitor Logs

```bash
# PM2 logs
pm2 logs kanhaiya-api

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Backup Database

```bash
# MongoDB backup
mongodump --uri="your-mongodb-uri" --out=/path/to/backup/$(date +%Y%m%d)
```

---

## Troubleshooting

### Frontend not loading
- Check if build directory exists: `client/build`
- Verify Nginx configuration
- Check browser console for errors

### Backend API not responding
- Verify PM2 is running: `pm2 status`
- Check logs: `pm2 logs kanhaiya-api`
- Verify MongoDB connection
- Check environment variables

### Email not sending
- Verify Gmail App Password
- Check email credentials in `.env`
- Look for errors in server logs

### Database connection issues
- Verify MongoDB is running
- Check connection string format
- Verify network access in MongoDB Atlas
- Check firewall rules

---

## Support

For technical support or deployment issues:
- Email: info@kanhaiyakrushi.com
- WhatsApp: +91 97670 38479

---

**Last Updated:** November 2025
