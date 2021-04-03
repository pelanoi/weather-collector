const getStdin = require("get-stdin");
const axios = require("axios");
const config = require("./config.json");

const requestConfig = {
  baseURL: config.host,
};

getStdin().then(function (text) {
  const lines = text
    .split("\n")
    .slice(0, -1)
    .map(function (line) {
      return JSON.parse(line);
    })
    .filter(function (line) {
      return line.subtype === 0;
    })
    .map(function (line) {
      return {
        temp: line.temperature_C,
        humidity: line.humidity,
        winddir: line.wind_dir_deg,
        windspeed: line.wind_avg_km_h,
        windgust: line.wind_max_km_h,
        rain: line.rain_mm,
      };
    });

  axios.post("/update", lines[0], requestConfig);
});

// {
//   "time": "2021-03-29 22:24:40",
//   "model": "Fineoffset-WHx080",
//   "subtype": 0,
//   "id": 191,
//   "battery_ok": 1,
//   "temperature_C": 21.4,
//   "humidity": 39,
//   "wind_dir_deg": 45,
//   "wind_avg_km_h": 0,
//   "wind_max_km_h": 1.224,
//   "rain_mm": 0.3,
//   "mic": "CRC"
// }
