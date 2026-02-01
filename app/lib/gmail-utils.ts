
export function decodeBase64(data: string) {
  const fixed = data.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(fixed, 'base64').toString('utf-8');
}

export function extractPlainText(payload: any): string | null {
  if (!payload) return null;

  if (payload.mimeType === 'text/plain' && payload.body?.data) {
    return decodeBase64(payload.body.data);
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      const text = extractPlainText(part);
      if (text) return text;
    }
  }

  return null;
}
