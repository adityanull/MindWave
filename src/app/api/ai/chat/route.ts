import { NextRequest, NextResponse } from 'next/server';

// AI Chat API endpoint - placeholder for future AI service integration
// Architecture: AI service → System prompt → Conversation management → Context → Safety → Response

interface ChatRequest {
  message: string;
  conversationId?: string;
  context?: {
    mood?: number;
    recentTopics?: string[];
    wellnessData?: Record<string, unknown>;
  };
}

const SYSTEM_PROMPT = `You are MIND WAVE AI, a compassionate mental wellness companion. Your role is to:
- Listen with empathy and without judgment
- Provide evidence-based wellness strategies
- Help users understand their emotions
- Offer practical self-care suggestions
- Recognize when to recommend professional help

IMPORTANT: You are NOT a licensed therapist, psychiatrist, or medical professional. You do NOT diagnose conditions or prescribe treatment. Always clarify this when relevant.

If a user expresses thoughts of self-harm or suicide, immediately provide crisis resources:
- Call 988 (Suicide & Crisis Lifeline)
- Text HOME to 741741 (Crisis Text Line)
- Encourage them to reach out to a professional`;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Crisis detection
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'self-harm', 'hurt myself'];
    const isCrisis = crisisKeywords.some(k => body.message.toLowerCase().includes(k));

    if (isCrisis) {
      return NextResponse.json({
        response: "I'm concerned about what you've shared. Please reach out for immediate support:\n\n📞 Call 988 (Suicide & Crisis Lifeline)\n📱 Text HOME to 741741\n\nYou matter, and there are people who want to help.",
        isCrisis: true,
        crisisResources: [
          { name: '988 Suicide & Crisis Lifeline', contact: '988' },
          { name: 'Crisis Text Line', contact: 'Text HOME to 741741' },
        ],
      });
    }

    // Placeholder AI response
    // In production, this would call OpenAI, Anthropic, or your preferred AI API
    const response = "Thank you for sharing. I'm here to listen and support you. This is a placeholder response — connect your AI API key to enable full conversations.";

    return NextResponse.json({
      response,
      isCrisis: false,
      systemPrompt: SYSTEM_PROMPT, // For development reference only
      note: 'Connect your AI API (OpenAI, Anthropic, etc.) via environment variables to enable full AI responses.',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
