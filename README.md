# Docker and ESC

With `pulumi up`, creates a local docker image & starts a container that:
* Is based from the official [Pulumi Docker image](https://hub.docker.com/r/pulumi/pulumi)
* Installs ESC
* Adds any env vars from the ESC environment named `my-runner`
* `pulumi preview`s the Pulumi program under `runner/proj` which outputs:
  * the value of an environment variable injected via ESC
  * the value of a stack config variable injected via ESC
* No secrets (aside from the PAT you control) need to be stored locally!

## Deploying the App

To deploy your infrastructure, follow the steps below.

### Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/install/)
2. [Install Docker](https://docs.docker.com/engine/install/) and have it running
3. A valid [Pulumi Access Token](https://www.pulumi.com/docs/pulumi-cloud/access-management/access-tokens/) in the`PULUMI_ACCESS_TOKEN` environment variable 
4. ESC environment named `my-runner`

### `my-runner` ESC config example

(add this before running)
```yaml
values:
  environmentVariables:
    MY_RUNNER_ENV_SETTING: 'env from ESC'
  pulumiConfig:
    configFromEsc: 'config from ESC'
```

## Running the App

1. Install prerequisites:

    ```
    $ pulumi install
    ```
   
2. Create a new stack:

    ```
    $ pulumi stack init dev
    ```

3. Preview and deploy the app via `pulumi up`. The preview may take a few minutes, as it builds a Docker container. A total of 4 resources are created.

    ```
    $ pulumi up
    ```

    ```
    Updating (dev)
    
    View in Browser (Ctrl+O): https://app.pulumi.com/<your org>/docker-ecs/dev/updates/1
    
         Type                       Name                     Status              Info
    +   pulumi:pulumi:Stack        docker-ecs               created (6s)
    +   ├─ command:local:Command   pinstall                 created (1s)
    +   ├─ docker:index:Image      demo-image               created (2s)        1 message
    +   └─ docker:index:Container  demo-container           created (0.56s)
    
    Diagnostics:
    docker:index:Image (demo-image):
    Building your image for linux/arm64 architecture.
    To ensure you are building for the correct platform, consider explicitly setting the `platform` field on ImageBuildOptions.
    
    Outputs:
    imageName: "demoorg/demo-image:main"
    
    Resources:
    + 4 created
    
    Duration: 7s
    ```
      
4. Check the docker container's log:
   
   ```
    Logging in using access token from PULUMI_ACCESS_TOKEN
    Previewing update (dev)
    
    View Live: https://app.pulumi.com/<your org>/runner/dev/previews/<guid>
    
    
    @ Previewing update....
     +  pulumi:pulumi:Stack runner-dev create
    @ Previewing update.....
     +  pulumi:pulumi:Stack runner-dev create From ESC env: env from ESC
     +  pulumi:pulumi:Stack runner-dev create From ESC config: config from ESC
     +  pulumi:pulumi:Stack runner-dev create 2 messages
    Diagnostics:
      pulumi:pulumi:Stack (runner-dev):
        From ESC env: env from ESC
        From ESC config: config from ESC

    Resources:
        + 1 to create
   ```
5. Note the "From ESC env" and "From ESC config" contain config values from ESC

### Ideas for further exploration

* Change the values in the ESC environment and re-run the container. Note the new values are output.
* When the Pulumi Service Provider supports it, create a short-lived access token to use with the container.
* Do something more useful with the "runner" project!

## Clean up

To clean up resources, run `pulumi destroy` and answer the confirmation question at the prompt.