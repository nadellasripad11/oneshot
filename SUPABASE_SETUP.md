# Supabase Setup for OneShot

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note your **Project URL** and **Anon Key**

## 2. Create the Database Tables

Run this SQL in your Supabase SQL editor:

```sql
-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  result TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX tasks_created_at_idx ON tasks(created_at DESC);
```

## 3. Set Environment Variables

Add to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

## 4. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 5. Deploy to Vercel

When deploying, add the same environment variables in Vercel project settings:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add GEMINI_API_KEY production
```

## Done!

Your OneShot app will now:
- Track all tasks in the database
- Show recent tasks on the home page
- Display saved results
- Apply rate limiting (5 requests per minute per IP)
