module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command("prettier -c .");
  },
};
