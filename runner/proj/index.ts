import * as pulumi from "@pulumi/pulumi";

console.log(`From ESC env: ${process.env.MY_RUNNER_ENV_SETTING!}`);
const config = new pulumi.Config();
const escValue = config.get("configFromEsc");
console.log(`From ESC config: ${escValue}`);
