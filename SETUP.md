# AI Call Center Sales Platform - Complete Setup Guide

## Overview
Interactive AI-powered call center demo platform with:
- 3D animated robot that speaks to users
- Multi-step onboarding flow (7 steps)
- Real-time pricing calculator
- Data security & compliance information
- Supabase backend for saving requests
- Stripe payment integration (optional)

## Architecture

```
┌─────────────────────────────────────┐
│         Next.js Frontend            │
│  (Vercel)                           │
├─────────────────────────────────────┤
│ React Three Fiber │  Onboarding     │
│  3D Robot         │  Forms           │
│  Animations       │  Voice Synth     │
├─────────────────────────────────────┤
│  Supabase (Database + Auth)         │
│  - demo_requests table              │
│  - agreements table                 │
│  - payment_records table            │
└─────────────────────────────────────┘
```

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New project"
4. Choose project name: `ai-callcenter`
5. Set password (save it!)
6. Click "Create new project"

### 1.2 Create Tables
In Supabase SQL Editor, run:

```sql
-- Demo Requests Table
CREATE TABLE demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT,
  agent_count INTEGER,
  plan_type TEXT,
  monthly_budget DECIMAL,
  dnc_required BOOLEAN DEFAULT false,
  lead_gathering BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Agreements Table
CREATE TABLE agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES demo_requests(id),
  agreement_text TEXT,
  signed_at TIMESTAMP DEFAULT now(),
  accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Payment Records Table
CREATE TABLE payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES demo_requests(id),
  stripe_payment_id TEXT,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT,
  plan_type TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

-- Create policies (allow inserts from frontend)
CREATE POLICY "Allow inserts on demo_requests" ON demo_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inserts on agreements" ON agreements
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inserts on payment_records" ON payment_records
  FOR INSERT WITH CHECK (true);
```

### 1.3 Get API Keys
1. Go to **Project Settings** → **API**
2. Copy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Local Development

### 2.1 Clone & Setup
```bash
# Create project
npx create-next-app@latest ai-callcenter-platform --typescript=false --app=true --tailwind=true

cd ai-callcenter-platform

# Copy files (from /tmp/ai-callcenter-platform)
cp -r /tmp/ai-callcenter-platform/* .

# Install dependencies
npm install
```

### 2.2 Environment Variables
Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional - Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 2.3 Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000`

## Step 3: Deployment to Vercel

### 3.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-callcenter-platform.git
git push -u origin main
```

### 3.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo
4. Add environment variables (from `.env.local`)
5. Click "Deploy"

Live at: `https://ai-callcenter-platform.vercel.app`

## Features

### Multi-Step Onboarding Flow
1. **Welcome** - Hero section with "Learn More" CTA
2. **Service Type** - Choose Outbound/Inbound/Blended
3. **Agents** - Specify agent count
4. **Pricing** - Select plan (Starter/Professional/Enterprise)
5. **Security** - Data protection + DNC/Lead generation options
6. **Contact Info** - Name, email, company, phone
7. **Confirmation** - Summary + auto-save to Supabase

### 3D Robot Animations
- ✓ Head bob when speaking
- ✓ Arm gestures during conversation
- ✓ Glowing eyes that pulse
- ✓ Smooth camera rotation
- ✓ Bloom post-processing for neon glow

### Voice Synthesis
- Robot speaks each step via Web Speech API
- Can be muted (optional)
- Professional tone

### Responsive Design
- Left: 3D scene (hidden on mobile)
- Right: Onboarding form
- Auto-layout adjustment

## Customization

### Change Pricing
Edit `lib/pricing.js`:
```js
professional: {
  monthlyPrice: 1299,  // Change this
  agentsIncluded: 3,
  // ...
}
```

### Modify Robot Appearance
Edit `components/3D/AnimatedRobot.jsx`:
- Colors
- Mesh geometry
- Animation speeds

### Adjust Camera Position
Edit `components/3D/Scene3D.jsx`:
```jsx
<PerspectiveCamera position={[2, 1.5, 3.5]} />
```

## Optional Additions

### Stripe Payment Integration
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```
Then create payment checkout at `/checkout` page.

### Email Notifications
Use SendGrid or Nodemailer to email summaries to customers:
```js
// pages/api/send-email.js
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
```

### Analytics
Add Mixpanel or Amplitude to track user journey:
```js
import { Mixpanel } from 'mixpanel-browser'
const mixpanel = new Mixpanel(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 3D scene not rendering | Check WebGL support, use fallback |
| Voice not working | Enable speaker, check browser permissions |
| Form not saving | Verify Supabase URL + API key |
| Tailwind not working | Run `npm install -D tailwindcss` |

## File Structure
```
ai-callcenter-platform/
├── app/
│   ├── page.jsx          # Main page
│   ├── layout.jsx        # Root layout
│   └── globals.css       # Tailwind + custom styles
├── components/
│   ├── 3D/
│   │   ├── AnimatedRobot.jsx
│   │   └── Scene3D.jsx
│   └── Onboarding/
│       ├── WelcomeStep.jsx
│       ├── ServiceTypeStep.jsx
│       ├── PricingStep.jsx
│       └── ...
├── lib/
│   ├── store.js          # Zustand state management
│   ├── supabase.js       # Database helpers
│   └── pricing.js        # Pricing logic
└── package.json
```

## Support
- **Docs**: https://nextjs.org, https://docs.supabase.com
- **Issues**: Check browser console for errors
- **Community**: GitHub Discussions

---

**Total Build Time**: ~2-3 hours  
**Cost**: Free (Vercel + Supabase free tier, 500k requests/month)
