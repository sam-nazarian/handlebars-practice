const http = require('http');
const fs = require('fs');
const port = 3000;

function serveStaticFile(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;

  fs.readFile(__dirname + path, function (err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error 💥');
    } else {
      res.writeHead(responseCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

const server = http.createServer(function (req, res) {
  // normalize url by removing querystring, optional
  //trailing slash, and making lowercase
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (path) {
    //HTML FILES
    case '':
    case '/index':
      serveStaticFile(res, '/../public/index.html', 'text/html', 200);
      break;

    case '/meme-acs':
      serveStaticFile(res, '/../public/meme-acs.html', 'text/html', 200);
      break;

    case '/meme-math':
      serveStaticFile(res, '/../public/meme-math.html', 'text/html', 200);
      break;

    //CSS FILE
    case '/style.css':
      serveStaticFile(res, '/../public/style.css', 'text/css', 200);
      break;

    //IMAGES
    case '/images/meme-home.jpg':
      serveStaticFile(res, '/../public/images/meme-home.jpg', 'imag/jpeg', 200);
      break;

    case '/images/meme-acs.jpeg':
      serveStaticFile(res, '/../public/images/meme-acs.jpeg', 'imag/jpeg', 200);
      break;

    case '/images/meme-math.jpg':
      serveStaticFile(res, '/../public/images/meme-math.jpg', 'imag/jpeg', 200);
      break;

    case '/images/meme-404.jpg':
      serveStaticFile(res, '/../public/images/meme-404.jpg', 'imag/jpeg', 200);
      break;

    //NOT FOUND
    default:
      serveStaticFile(res, '/../public/not-found.html', 'text/html', 404);
      break;
  }
});

//prefer this as chaining it to the createServer, I find this a cleaner way of handling the listen
server.listen(port, function (error) {
  if (error) {
    console.log('Something went wrong 💥', error);
  } else {
    console.log('Server is listening on port' + port);
  }
});
