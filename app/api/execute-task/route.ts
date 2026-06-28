import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

// Rate limiting: 5 requests per minute per IP
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(ip);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (rateLimitData.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((rateLimitData.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  rateLimitData.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitCheck = checkRateLimit(clientIp);

    if (!rateLimitCheck.allowed) {
      const retryAfter = rateLimitCheck.retryAfter;
      return NextResponse.json(
        {
          error: `Too many requests. Try again in ${retryAfter} second${retryAfter !== 1 ? 's' : ''}`,
          retryAfter
        },
        { status: 429 }
      );
    }

    const { goal, category } = await request.json();

    if (!goal) {
      return NextResponse.json({ error: 'Goal is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Create a prompt that guides Gemini to produce the right output
    const prompt = `You are an expert AI assistant. The user has asked you to: "${goal}"

Please provide a comprehensive, professional, and well-structured response.

${
  category
    ? `The category for this task is: ${category}. Keep this context in mind while responding.`
    : ''
}

Make sure your response is:
- Clear and well-organized
- Actionable and practical
- High quality and professional
- Properly formatted (use markdown if appropriate)
- Complete and thorough`;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return NextResponse.json(
        { error: 'Failed to execute task' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    // Save to Supabase if configured
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        await supabase.from('tasks').insert({
          goal,
          category: category || 'general',
          result,
          ip_address: clientIp,
          created_at: new Date().toISOString(),
        });
      } catch (dbError) {
        console.warn('Failed to save task to database:', dbError);
        // Don't fail the request if database save fails
      }
    }

    return NextResponse.json({
      success: true,
      goal,
      category,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Task execution error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
