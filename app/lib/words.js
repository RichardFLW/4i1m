//app/lib/words.js

export async function getWords() {
  const response = await fetch('/api/words');
  if (!response.ok) {
    throw new Error('Failed to fetch words');
  }
  const data = await response.json();
  return data;
}
