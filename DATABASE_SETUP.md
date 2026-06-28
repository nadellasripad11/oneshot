# Database & Rate Limiting Setup

## What's Been Implemented ✅

### 1. **Database Integration**
- Tasks are now saved to Supabase PostgreSQL
- Recent tasks display on the home page
- Supports saved results tracking

### 2. **Rate Limiting**
- 5 requests per minute per IP address
- Returns clear error: "Too many requests. Try again in X seconds"
- Prevents API abuse

### 3. **Removed**
- ❌ Usage page (no longer in sidebar)
- ❌ Hardcoded sample tasks

---

## Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Note your **Project URL** and **Anon Key** from Settings → API

### Step 2: Create Database Table

In your Supabase SQL editor, run:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  result TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX tasks_created_at_idx ON tasks(created_at DESC);
```

### Step 3: Update Environment Variables

Edit `.env.local`:

```
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 4: Deploy to Vercel

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add GEMINI_API_KEY production
vercel deploy --prod
```

---

## Features Now Working

✅ Tasks saved to database automatically  
✅ Home page shows recent tasks  
✅ Rate limiting prevents abuse  
✅ "Saved Results" page ready for results  
✅ No "Usage" page (removed)  
✅ All tasks are free (no credits system)

---

## Testing

1. Submit a task → should appear on home page
2. Submit 6 tasks quickly → should get "Try again in X seconds"
3. Refresh home page → tasks should persist
