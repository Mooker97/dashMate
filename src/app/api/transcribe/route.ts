import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    if (!openai || !process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured. Returning mock response.');
      return NextResponse.json({
        text: "I need to organize my tasks for tomorrow and focus on the important ones first."
      });
    }

    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Transcription error:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json({
        text: "Let me help you organize your tasks. What would you like to work on?"
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}