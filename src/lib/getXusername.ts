export function getXUsername(url: string): string | null {
  try {
    // Ensure it has a protocol
    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    const parsed = new URL(finalUrl);

    // Split by "/" and filter out empty strings
    const parts = parsed.pathname.split("/").filter(Boolean);

    return parts[0] || null; // first valid part after domain
  } catch {
    return null;
  }
}
