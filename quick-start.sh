#!/bin/bash

# AI Call Center Platform - Quick Start Script
# Usage: bash quick-start.sh

echo "🚀 AI Call Center Platform - Quick Start"
echo "========================================="

# Check Node version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Install from https://nodejs.org"
    exit 1
fi

echo "✓ Node $(node -v) found"

# Create project directory
PROJECT_DIR="ai-callcenter-platform"
if [ -d "$PROJECT_DIR" ]; then
    read -p "Directory exists. Overwrite? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    rm -rf "$PROJECT_DIR"
fi

echo "📦 Creating Next.js project..."
npx create-next-app@latest $PROJECT_DIR --typescript=false --app=true --tailwind=true --eslint=false --import-alias=false

cd $PROJECT_DIR

echo "📥 Installing additional packages..."
npm install \
    @react-three/fiber@8.16.0 \
    @react-three/drei@9.110.0 \
    @react-three/postprocessing@2.16.0 \
    three@r128 \
    postprocessing@6.35.2 \
    @supabase/supabase-js@2.43.0 \
    zustand@4.5.0 \
    framer-motion@10.16.16 \
    axios@1.6.5

echo "📝 Creating .env.local..."
cat > .env.local << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Optional: Stripe
# NEXT_PUBLIC_STRIPE_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
EOF

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://supabase.com and create a project"
echo "2. Copy your Supabase URL and ANON KEY"
echo "3. Edit .env.local with your credentials"
echo "4. Run: npm run dev"
echo "5. Open: http://localhost:3000"
echo ""
echo "📚 Full setup guide: cat SETUP.md"
