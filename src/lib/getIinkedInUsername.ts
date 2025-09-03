export function getLinkedInUsername(url: string): string | null {
  try {
    // Ensure it has a protocol
    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    const parsed = new URL(finalUrl);

    // Example: /in/stanlee-enumah/  -> ["", "in", "stanlee-enumah"]
    const parts = parsed.pathname.split("/").filter(Boolean);

    // LinkedIn profile usernames are usually right after "in"
    const inIndex = parts.indexOf("in");
    if (inIndex !== -1 && parts[inIndex + 1]) {
      return parts[inIndex + 1];
    }

    return null;
  } catch {
    return null;
  }
}
