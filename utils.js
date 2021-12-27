const { exec } = require("child_process");
const util = require("util");
const format = require("date-fns/format");

const run = util.promisify(exec);

function getTimestamp() {
  return `[${format(new Date(), "dd MMM, HH:mm:ss")}]`;
}

function log(...args) {
  console.info(getTimestamp(), ...args, "\n");
}

function error(...args) {
  console.error(getTimestamp(), ...args, "\n");
}

module.exports = {
  run,
  log,
  error,
};
