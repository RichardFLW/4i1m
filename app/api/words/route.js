import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'keywords.txt');
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    const words = {};
    lines.forEach(line => {
      const [english, french] = line.split(',');
      words[english.trim()] = french.trim();
    });
    return NextResponse.json(words);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch words' }, { status: 500 });
  }
}
