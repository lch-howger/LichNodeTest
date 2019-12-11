//http module gives us simple server functionality
const http = require("http");

//url module gives url functionality
const url = require("url");

//moment module gives time functionality
const moment = require("moment")

//define where our server will run
const server_port = 3000;
const server_ip = "127.0.0.1";

//initialize response and return json
const return_JSON = function (json_data, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(json_data));
};

//create a server
const server = http.createServer(function (request, response) {

    //log the method and the url
    console.log(`received a ${request.method} request to url ${request.url}`);

    //use the url module to parse url from the request
    const u = url.parse(request.url, true);

    //return json for different path
    if (u.pathname === "/hello") {
        return_JSON("Hello World!", response);
    } else if (u.pathname === "/goodbye") {
        return_JSON("Goodbye!", response);
    } else if (u.pathname === "/time") {
        var now = new moment().utc();
        var data = {
            now: now,
            year: now.year(),
            month: now.month(),
            day: now.day(),
            hour: now.hour(),
            minute: now.minute()
        };
        return_JSON(data, response);
    } else {
        return_JSON("How can I help?", response);
    }
});

//start the server listening
server.listen(server_port, server_ip, function () {
    console.log(`server running at http://${server_ip}:${server_port}/`);
});
