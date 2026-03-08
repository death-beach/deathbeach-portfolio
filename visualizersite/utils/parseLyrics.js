/**
 * Parses LRC (Lyrics) format into an array of {time, text} objects
 * LRC format: [MM:SS.xx] text line
 * Example: [00:12.34] This is a lyric line
 *
 * @param {string} content - The raw LRC content
 * @returns {Array<{time: number, text: string}>} Parsed lyrics array
 */
export function parseLyrics(content) {
  if (!content || typeof content !== 'string') {
    return [];
  }

  const lines = content.split('\n');
  const lyrics = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Match [MM:SS.xx] or [MM:SS] format
    const match = trimmed.match(/^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]\s*(.+)$/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const centiseconds = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0;
      const text = match[4].trim();

      if (text) {
        const time = minutes * 60 + seconds + centiseconds / 1000;
        lyrics.push({ time, text });
      }
    }
  }

  // Sort by time just in case
  return lyrics.sort((a, b) => a.time - b.time);
}

/**
 * Fetches and parses lyrics from a URL
 * @param {string} url - URL to fetch lyrics from
 * @returns {Promise<Array<{time: number, text: string}>>}
 */
export async function fetchLyrics(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch lyrics: ${response.status}`);
    }
    const content = await response.text();
    return parseLyrics(content);
  } catch (error) {
    console.warn('Failed to fetch/parse lyrics:', error);
    return [];
  }
}