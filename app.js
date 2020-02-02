const http = require("http");
const fs = require('fs');
//console.log(http);
const server = http.createServer(function(req, res, next) {
  //console.log(req.url)
  const url = req.url;
  const method = req.method;
  //console.log(method);
  if (url === "/index") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Node Workshop</title></head>");
    res.write("<body>");
    res.write("<h1>NODE WORKSHOP </h1>");
    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' placeholder='write here'name='message'>");
    res.write("<input type='submit' value='Send'>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    req.on('end',() => {
      let passedBody = Buffer.concat(body).toString();
      let message = passedBody.split('=')[1];
      //console.log(message);
      fs.writeFile('message.txt',message,(err)=>{
        res.write(message);
        res.end();
      });
     
    });

    
  }
});

server.listen("7000");
console.log("Hello am listening to port 7000");
