// log-receiver.js
const fs = require('fs');

exports.handler = async (event, context) => {
  // Simple authentication with your secret key
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

  // Append log to a file in /tmp (serverless writable folder)
  const logEntry = JSON.stringify(payload) + '\n';
  fs.appendFileSync('/tmp/visitor-logs.txt', logEntry);

  return {
    statusCode: 200,
    body: 'Logged',
  };
};
