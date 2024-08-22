#!/bin/sh
# add to path so we can easily run `esc`
export PATH="/root/.pulumi/bin:$PATH"

# select 'dev' stack or create if not found
pulumi stack select -c dev

# add any env vars from ESC environment "my-runner"
source <(esc open --format shell my-runner)

# run a preview
pulumi preview