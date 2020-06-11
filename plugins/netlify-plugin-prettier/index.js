module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    console.log("Checking code style with Prettier.js");
    await run.command("prettier -c .");
  },
};
