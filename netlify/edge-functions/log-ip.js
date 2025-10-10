export default async (request, context) => {
  const headers = request.headers;

  // Get visitor IP
  const ip = (headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';

  // Prepare payload
  const payload = {
    ts: new Date().toISOString(),
    ip,
    path: new URL(request.url).pathname,
    ua: headers.get('user-agent') || ''
  };

  // Send to your serverless logging endpoint
  const LOG_ENDPOINT = process.env.NETLIFY_LOG_ENDPOINT;
  const LOG_KEY = process.env.NETLIFY_LOG_KEY;

  if (LOG_ENDPOINT && LOG_KEY) {
    fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-log-key': LOG_KEY
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {});
  }

  // Continue loading the page
  return fetch(request);
};
