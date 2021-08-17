var name = process.argv[2] || "Auto-commit";
var shell = require("shelljs");
var exec = shell.exec;

shell.cp("-R", "./dist/*", "../jtool.github.io");

let commitMsg = `update ${+new Date()}`;

shell.cd("../jtool.github.io");

if (exec("git add .").code !== 0) {
  console.info("Error: Git add failed");
  shell.exit(1);
}
if (exec(`git commit -am "${commitMsg}"`).code !== 0) {
  console.info("Error: Git commit failed");
  shell.exit(1);
}
if (exec("git push").code !== 0) {
  console.info("Error: Git commit failed");
  shell.exit(1);
}

exec(`echo git success ${name}`);
