#!/bin/bash

# 🚫 Stop on any error
set -e

# 🧾 Configuration
PEM_KEY="~/Downloads/kanhaiya-key.pem"   # ✅ Update with your actual .pem file
USER="ubuntu"
SERVER_IP="13.201.168.31"                  # ✅ IP of your kanhaiyakrushi.com server
TEMP_PATH="/home/ubuntu/frontend-temp"
TARGET_PATH="/var/www/kanhaiyakrushi.com"  # ✅ This should match your Nginx root

echo "🚀 Starting Deployment of Kanhaiya Krushi Frontend..."

# 🏗️ Step 1: Build React app locally
echo "🔨 Building React app locally..."
npm run build || { echo "❌ Build failed"; exit 1; }

# 📡 Step 2: Upload to temp folder on server
echo "📡 Uploading build to temp directory on server..."
ssh -i "$PEM_KEY" $USER@$SERVER_IP "rm -rf $TEMP_PATH && mkdir -p $TEMP_PATH"
scp -i "$PEM_KEY" -r build/* "$USER@$SERVER_IP:$TEMP_PATH" || { echo "❌ Upload failed"; exit 1; }

# 🛠️ Step 3: Move build to Nginx live directory
echo "📦 Deploying to Nginx directory..."
ssh -i "$PEM_KEY" $USER@$SERVER_IP << EOF
  sudo mkdir -p $TARGET_PATH
  sudo rm -rf $TARGET_PATH/*
  sudo cp -r $TEMP_PATH/* $TARGET_PATH/
  sudo chown -R www-data:www-data $TARGET_PATH
EOF

# 🔁 Step 4: Restart Nginx
echo "🔄 Restarting Nginx..."
ssh -i "$PEM_KEY" $USER@$SERVER_IP "sudo systemctl restart nginx"

echo "✅ Deployment Complete! Visit: https://kanhaiyakrushi.com 🎉"
