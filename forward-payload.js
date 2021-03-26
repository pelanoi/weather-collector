const getStdin = require("get-stdin");
const axios = require("axios");

getStdin().then(function (text) {
  const lines = text
    .split("\n")
    .slice(0, -1)
    .map(function (line) {
      return JSON.parse(line);
    });
  console.log("lines:", lines);
  axios.post("http://localhost:3000/update", lines);
});
