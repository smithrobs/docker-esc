import * as docker from "@pulumi/docker";
import { local } from "@pulumi/command";

// Do a workspace install so the image doesn't have to

// TODO: .Install() hasn't made it to TS yet
// import { LocalWorkspace, LocalProgramArgs } from "@pulumi/pulumi/automation";
// const demoWorkspace = LocalWorkspace.createOrSelectStack({
//     projectName: "runner",
//     stackName: "dev",
//     workDir: "./runner/proj",
// } as LocalProgramArgs)
//     .then(ws => ws.workspace.Install());

const installResult = new local.Command("pinstall", {
    create: "pulumi install",
    dir: "./runner/proj"
});

// Create docker image
const demoImage = new docker.Image("demo-image", {
    build: {
        context: "./runner",
        dockerfile: "runner/Dockerfile",
    },
    imageName: "demoorg/demo-image:main",
    skipPush: true,
}, { dependsOn: installResult });

// Start the container
const demoContainer = new docker.Container("demo-container", {
    name: "demo",
    image: demoImage.id,
    envs: [
        `PULUMI_ACCESS_TOKEN=${process.env.PULUMI_ACCESS_TOKEN!}`
    ]
});

export const imageName = demoImage.imageName;
