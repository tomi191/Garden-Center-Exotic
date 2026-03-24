/**
 * HTML Utilities
 */

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function extractExcerpt(html: string, maxLength: number = 200): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function countWords(html: string): number {
  const text = stripHtml(html);
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

export function extractHeadings(html: string): { level: number; text: string }[] {
  const headings: { level: number; text: string }[] = [];
  const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;

  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      text: stripHtml(match[2]),
    });
  }

  return headings;
}
