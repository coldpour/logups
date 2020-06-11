const path = require("path");

const cacheDirs = path.normalize(`~/.cache/firebase/emulators`);

module.exports = {
  async onPreBuild({ utils: { cache } }) {
    if (await cache.restore(cacheDirs)) {
      console.log("Found cached Firebase emulators!");
    } else {
      console.log("No cached Firebase emulators found.");
    }
  },
  async onPostBuild({ utils: { cache } }) {
    if (await cache.save(cacheDirs)) {
      console.log("Cached the Firebase emulators to speed up future builds!");
    } else {
      console.log("No Firebase emulators found.");
    }
  },
};
