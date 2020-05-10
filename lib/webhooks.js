/**
 * Load dependencies.
 */
const http = require('http');
const crypto = require('crypto');

/**
 * Constants.
 */
const SECRET = 'webhook';

/**
 * Body.
 */
http.createServer((req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const signature = crypto.createHmac('sha1', SECRET).update(body).digest('hex');

    // authorize!
    if(req.headers['x-hub-signature'] !== `sha1=${signature}`) {
      console.err('403', signature);
      return;
    }

    const data = JSON.parse(body);
    console.log(data);
  });

  res.end();
}).listen(process.env.PORT || 8080);
