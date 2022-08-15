const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  //lodash
  const num = _.random(0, 20);
  console.log(num);
  //set header content type..
  res.setHeader("Content-Type", "text/html");
  //to send back to the browser we use the response object with the write method to send the res..
  //How to fugure out a user path..
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    //in the case of about page lets create a ridirecting link
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }
  // res.write("<p>hello,again ninjas</p>");
  // res.write("Hello ! mathew");
  //ending response..
  // res.end();
  //sending an html file..usng fs..
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);

      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening for request on port 3000");
});
