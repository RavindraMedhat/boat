const Bot = require("bot-ravindrasinh/ChatBot");
const WebSocket = require('ws')
const http = require('http');

var st = require('node-static');

var fileServer = new st.Server('./Q4.html');

var httpserver = http.createServer((req, res) => {
    req.on("end", () => {
        fileServer.serve(req, res);
    }).resume();
}).listen(7485, () => {
    console.log("Server is listening on port 7485");
})

const wss = new WebSocket.Server({ server: httpserver });

wss.on("connection", (ws) => {
    ws.send("Hello User");
    ws.on("message", (message) => {
        // console.log(message.toString());
        ws.send(Bot.Replay(message.toString()));
    })
})
