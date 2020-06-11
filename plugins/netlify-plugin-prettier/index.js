module.exports = {
  onPreBuild: async ({
    utils: {
      run,
      build: { failBuild },
    },
  }) => {
    try {
      await run.command("prettier -c .");
    } catch (error) {
      failBuild();
    }
  },
};
