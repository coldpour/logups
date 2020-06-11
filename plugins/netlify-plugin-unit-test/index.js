module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command("yarn test");
  },
};
