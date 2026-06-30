const localtunnel = require('localtunnel');
(async () => {
  const tunnel = await localtunnel({ port: 8765 });
  console.log('URL:' + tunnel.url);
  tunnel.on('close', () => {
    console.log('tunnel closed');
  });
  tunnel.on('error', (err) => {
    console.error('tunnel error:', err.message);
  });
})();
