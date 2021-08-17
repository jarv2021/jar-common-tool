const git = require("simple-git");
const path = "./dist";
const commitMessage = "updete index";
const repo = "https://github.com/jarv2021/jarv2021.github.io.git";

console.info('git-commit')

git(path)
  .init()
  .add("./*")
  .commit(commitMessage)
  .addRemote("origin", repo)
  .push(["-f", "origin", "master"], () => {
    console.log("Push to master success");
  });
