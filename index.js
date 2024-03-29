const axios = require("axios");
const config = require("./config.json");
const { log, error, run } = require("./utils");
const { TIME } = require("./zeit");

const requestConfig = {
  baseURL: config.host,
};

async function main() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    log("Start listening for radio");

    try {
      const { stdout } = await run("rtl_433 -R 32 -F json -E quit", {
        timeout: 2 * TIME.MINUTES,
      });
      const lines = stdout
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

      log("Got message");
      await axios.post("/update", lines[0], requestConfig);
    } catch (err) {
      log("Got error");
      error(err);
      try {
        error("Attepting recovery");
        await run("sudo ./misc/reset.sh");
      } catch (err) {
        error("Failed recovery:", err);
      }
    }
  }
}

main();

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
