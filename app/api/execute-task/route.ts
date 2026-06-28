import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(request: NextRequest) {
  try {
    const { goal, category } = await request.json();

    if (!goal) {
      return NextResponse.json({ error: 'Goal is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

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
