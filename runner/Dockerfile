FROM pulumi/pulumi:latest

# update & install esc
RUN apt update && \
    curl -fsSL https://get.pulumi.com/esc/install.sh | sh

# set up project that has an ESC ref
WORKDIR /
COPY run.sh proj ./proj/
WORKDIR proj

ENTRYPOINT ["bash", "run.sh"]