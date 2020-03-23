const https = require('https');

https
  .get(
    'https://api.github.com/repos/florianherrengt/scramblr_web/releases/latest',
    {
      headers: {
        'User-Agent': 'Scramblr scripts',
      },
    },
    resp => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', chunk => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        try {
          console.log(JSON.parse(data).id);
        } catch (error) {
          process.exit(1);
        }
      });
    },
  )
  .on('error', err => {
    process.exit(1);
  });
