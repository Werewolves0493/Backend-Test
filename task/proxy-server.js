const http = require('http');
const https = require('https');
const FileBasedCache = require('./file-based-cache');
const winston = require('winston');

const proxyConfig = {
  host: 'api.apipheny.io',
  port: 443,
  protocol: 'https',
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'proxy-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'proxy-log.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
});

const cache = new FileBasedCache();

const proxyServer = http.createServer((req, res) => {
  const targetOptions = {
    host: proxyConfig.host,
    port: proxyConfig.port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const targetProtocol = proxyConfig.protocol === 'https' ? https : http;
  const targetRequest = targetProtocol.request(targetOptions, (targetResponse) => {
    let responseData = '';

    targetResponse.on('data', (chunk) => {
      responseData += chunk;
    });

    targetResponse.on('end', () => {
      if (req.method === 'GET') {
        cache.set(req.url, responseData, 60);
      }

      res.writeHead(targetResponse.statusCode, targetResponse.headers);
      res.end(responseData);
    });
  });

  targetRequest.on('error', (error) => {
    logger.error(`Proxy request error: ${error.message}`);
    res.writeHead(500);
    res.end('Internal Server Error');
  });

  if (req.method === 'GET') {
    const cachedData = cache.get(req.url);

    if (cachedData !== null) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(cachedData);
      return;
    }
  }

  req.on('data', (chunk) => {
    targetRequest.write(chunk);
  });

  req.on('end', () => {
    targetRequest.end();
  });
});

const PORT = 3000;

proxyServer.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
