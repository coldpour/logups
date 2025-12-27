module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command("npm test");
  },
};
