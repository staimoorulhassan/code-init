# 🚀 VERCEL DEPLOYMENT GUIDE - QUICK START

## Prerequisites (5 minutes)

### Step 1: Create Free Accounts (if needed)

**GitHub** (code hosting)
- Go to https://github.com/signup
- Email, password, username
- Verify email
- ✅ Done (2 mins)

**Vercel** (deployment)
- Go to https://vercel.com/signup
- Click "Continue with GitHub"
- Authorize Vercel
- ✅ Done (1 min)

**Supabase** (database)
- Go to https://supabase.com
- Sign up with GitHub
- Create project: `ai-callcenter`
- Wait for project to initialize (2 mins)
- Go to Settings → API
- Copy `Project URL` and `Anon Public Key`
- ✅ Done (2 mins)

---

## Step 2: Setup Project Locally (10 minutes)

### 2a. Copy Files & Initialize Git

```bash
# Copy the complete project
cp -r /tmp/ai-callcenter-platform ~/ai-callcenter-platform
cd ~/ai-callcenter-platform

# Initialize Git repository
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
git add .
git commit -m "Initial commit: AI Call Center Platform"
```

### 2b. Create .env.local with Supabase Keys

```bash
# Edit .env.local
nano .env.local
```

Paste this (replace YOUR_xxx with actual keys from Supabase):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...YOUR_KEY_HERE...VCJ9
```

**How to get these keys:**
1. Go to Supabase Dashboard
2. Click your project name (top-left)
3. Go to Settings → API
4. Copy `Project URL` → paste as NEXT_PUBLIC_SUPABASE_URL
5. Copy `Anon Public Key` → paste as NEXT_PUBLIC_SUPABASE_ANON_KEY
6. Save file (Ctrl+O, Enter, Ctrl+X)

### 2c. Test Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and test all 7 steps. Make sure:
- ✅ Robot appears
- ✅ Forms work
- ✅ Voice speaks
- ✅ Data saves (check browser console)

Stop the server: `Ctrl+C`

---

## Step 3: Push to GitHub (5 minutes)

### 3a. Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `ai-callcenter-platform`
3. **Description:** "AI-powered call center sales demo"
4. **Visibility:** Public (for Vercel)
5. Click "Create repository"

**Important:** Don't initialize with README (we already have one)

### 3b. Push Code to GitHub

```bash
cd ~/ai-callcenter-platform

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ai-callcenter-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**What to expect:**
- It asks for GitHub credentials
- Or uses SSH key if configured
- After 30 seconds: "Branch 'main' set up to track"

**Verify:** Go to https://github.com/YOUR_USERNAME/ai-callcenter-platform
You should see all files there ✅

---

## Step 4: Deploy to Vercel (5 minutes)

### 4a. Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Paste your GitHub repo URL
5. Click "Import"

**Vercel scans your repo automatically**

### 4b. Configure Environment Variables

1. You'll see "Environment Variables" section
2. Add two variables:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project-id.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbG...YOUR_KEY...VCJ9
```

3. Click "Add"
4. Click "Deploy"

**What happens:**
- Vercel installs dependencies (30 seconds)
- Builds your app (45 seconds)
- Deploys to CDN (15 seconds)
- Total: ~2 minutes

---

## Step 5: Setup Supabase Database Tables (5 minutes)

### 5a. Create Tables in Supabase

1. Go to https://app.supabase.com
2. Select your project
3. Click "SQL Editor" (left sidebar)
4. Click "New Query"
5. Paste this SQL:

```sql
-- Create demo_requests table
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

-- Create agreements table
CREATE TABLE agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES demo_requests(id),
  agreement_text TEXT,
  signed_at TIMESTAMP DEFAULT now(),
  accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Create payment_records table
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

-- Create policies (allow inserts)
CREATE POLICY "Allow inserts on demo_requests" ON demo_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inserts on agreements" ON agreements
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inserts on payment_records" ON payment_records
  FOR INSERT WITH CHECK (true);
```

6. Click "Run"
7. Wait for "Success" message
8. ✅ Tables created!

### 5b. Verify Tables

1. Go to "Table Editor" (left sidebar)
2. You should see:
   - `demo_requests`
   - `agreements`
   - `payment_records`
3. Click each to verify columns

---

## Step 6: Test Live Deployment (5 minutes)

### 6a. Get Your Vercel URL

1. Go to https://vercel.com/dashboard
2. Click your project `ai-callcenter-platform`
3. Copy the URL (looks like: `https://ai-callcenter-platform-xyz.vercel.app`)

### 6b. Test Functionality

1. Open URL in browser
2. Test all 7 steps:
   - ✅ Welcome page loads
   - ✅ Robot appears and speaks
   - ✅ Can click through steps
   - ✅ Forms accept input
   - ✅ Final step shows confirmation
3. Open browser DevTools (F12)
   - Check Console for errors
   - Should see no red errors
4. Go to Supabase → Table Editor → demo_requests
   - Should see your test data saved!

---

## 🎉 YOU'RE LIVE!

Your app is now deployed at:
```
https://ai-callcenter-platform-xyz.vercel.app
```

### Share Your URL
- Copy the link
- Share with customers/team
- It's live 24/7
- Auto-scales with traffic

### Monitor & Manage
- **Vercel Dashboard:** https://vercel.com/dashboard
  - View analytics
  - See build history
  - Manage environment variables
  
- **Supabase Dashboard:** https://app.supabase.com
  - View customer data in `demo_requests` table
  - Monitor API usage
  - Manage database

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Build failed on Vercel** | Check env vars are exactly correct (copy-paste, no spaces) |
| **"Cannot find module"** | Vercel might need `npm install` - trigger rebuild (Settings → Deployments) |
| **Robot not visible** | Check WebGL support in browser (most browsers support it) |
| **Forms not saving** | Check Supabase tables exist (SQL query ran successfully) |
| **Database empty** | Refresh browser, fill form, check after 5 seconds |
| **Domain not working** | Wait 30-60 seconds for DNS (if added custom domain) |

---

## Optional: Add Custom Domain

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Click "Add"
4. Enter your domain (e.g., `demo.yourcompany.com`)
5. Vercel shows DNS settings to add to your registrar
6. Add DNS records (usually 2-3 minutes to propagate)

---

## Next Steps (Optional Enhancements)

### Week 1: Monitor & Collect Feedback
- Watch Supabase for incoming demo requests
- Test with real customers
- Collect feedback on flow

### Week 2: Setup Email Notifications
```bash
npm install @sendgrid/mail
# Create /app/api/send-email.js
# Send confirmation emails to customers
```

### Week 3: Add Analytics
```bash
npm install mixpanel-browser
# Track user journey through form
# See where people drop off
```

### Week 4: Add Payments
```bash
npm install @stripe/react-stripe-js stripe
# Create /app/checkout/page.jsx
# Accept credit card payments
```

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Status Page:** https://vercel-status.com

---

## Summary

✅ **Step 1:** Create GitHub + Vercel + Supabase accounts (5 mins)  
✅ **Step 2:** Setup project locally & test (10 mins)  
✅ **Step 3:** Push to GitHub (5 mins)  
✅ **Step 4:** Deploy to Vercel (5 mins)  
✅ **Step 5:** Create Supabase tables (5 mins)  
✅ **Step 6:** Test live site (5 mins)  

**Total: ~35 minutes to production**

**Your live URL:** https://ai-callcenter-platform-xyz.vercel.app

---

## You Did It! 🎉

Your AI Call Center Platform is now live 24/7 on Vercel, with data automatically saved to Supabase.

Every customer who fills the form → Data appears in your Supabase dashboard.

No servers to manage. No DevOps needed. Just focus on selling!

Share the link. Track the leads. Close the deals. 🚀
