const path = require("path");
const { cwd } = require("process");
const { homedir } = require("os");

const getCacheDir = () => {
  const absoluteCacheDir = path.resolve(homedir(), ".cache/firebase/emulators");
  const netlifyBuildPluginResolvesFrom = cwd();
  return path.relative(netlifyBuildPluginResolvesFrom, absoluteCacheDir);
};

module.exports = {
  async onPreBuild({ utils: { cache } }) {
    console.log("cacheDir", cache.getCacheDir());
    if (await cache.restore(getCacheDir())) {
      console.log("Found cached Firebase emulators!");
    } else {
      console.log("No cached Firebase emulators found.");
    }
  },
  async onPostBuild({ utils: { cache } }) {
    console.log("cacheDir", cache.getCacheDir());
    if (await cache.save(getCacheDir())) {
      console.log("Cached the Firebase emulators to speed up future builds!");
    } else {
      console.log("No Firebase emulators found.");
    }
  },
};
