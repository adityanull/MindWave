import { NextRequest, NextResponse } from 'next/server';

// Mood API - placeholder for future MongoDB integration

export async function GET() {
  // Return mock mood data
  return NextResponse.json({
    data: [
      { date: '2026-01-09', mood: 4, stress: 3, anxiety: 2, sleep: 4, energy: 4 },
      { date: '2026-01-10', mood: 3, stress: 4, anxiety: 3, sleep: 3, energy: 3 },
      { date: '2026-01-11', mood: 2, stress: 5, anxiety: 4, sleep: 2, energy: 2 },
      { date: '2026-01-12', mood: 3, stress: 4, anxiety: 3, sleep: 3, energy: 3 },
      { date: '2026-01-13', mood: 4, stress: 3, anxiety: 2, sleep: 4, energy: 4 },
      { date: '2026-01-14', mood: 5, stress: 2, anxiety: 1, sleep: 5, energy: 5 },
      { date: '2026-01-15', mood: 4, stress: 2, anxiety: 2, sleep: 4, energy: 4 },
    ],
    note: 'Mock data. Connect MongoDB for persistent storage.',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Placeholder - would save to MongoDB
    return NextResponse.json({ success: true, data: body, note: 'Mock response. Connect MongoDB for persistence.' });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
