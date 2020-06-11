const path = require("path");
const { cwd, env } = require("process");

const getCacheDir = () => {
  const absoluteCacheDir = path.resolve(env.HOME, ".cache/firebase/emulators");
  const netlifyBuildPluginResolvesFrom = cwd();
  return path.relative(netlifyBuildPluginResolvesFrom, absoluteCacheDir);
};

module.exports = {
  async onPreBuild({ utils: { cache } }) {
    if (await cache.restore(getCacheDir())) {
      console.log("Found cached Firebase emulators!");
    } else {
      console.log("No cached Firebase emulators found.");
    }
  },
  async onPostBuild({ utils: { cache } }) {
    if (await cache.save(getCacheDir())) {
      console.log("Cached the Firebase emulators to speed up future builds!");
    } else {
      console.log("No Firebase emulators found.");
    }
  },
};
