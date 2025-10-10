exports.handler = async (event, context) => {
  const LOG_KEY = process.env.NETLIFY_LOG_KEY || '';
  const key = event.headers['x-log-key'] || '';

  if (key !== LOG_KEY) {
    return {
      statusCode: 401,
      body: 'Unauthorized',
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: 'Invalid JSON',
    };
  }

  // ✅ Print visitor info directly to Netlify logs
  console.log('Visitor log:', payload);

  return {
    statusCode: 200,
    body: 'Logged',
  };
};
