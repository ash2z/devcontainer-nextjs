# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.245.0/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version (use ubuntu-22.04 or ubuntu-18.04 on local arm64/Apple Silicon): ubuntu-22.04, ubuntu-20.04, ubuntu-18.04
# FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm
FROM node:24-bookworm

RUN <<EOF
apt-get update
apt-get -y install --no-install-recommends
apt-get clean 
rm -rf /var/lib/apt/lists/*
curl -sS https://starship.rs/install.sh | sh -s -- -y
EOF

USER node

RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/home/node/.local/bin:${PATH}"

RUN <<EOF
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
mkdir -p ~/.local/share/pnpm
echo 'export PNPM_HOME=~/.local/share/pnpm' >> ~/.bashrc
echo 'export PATH=$PNPM_HOME:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g pnpm@latest
pnpm config set global-bin-dir "$PNPM_HOME"
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
npm install -g n
n lts
npm install -g typescript ts-node ts-node-dev tslint-to-eslint-config
npm install -g @anthropic-ai/claude-code
npm install -g @openai/codex
echo 'eval "$(starship init bash)"' >> ~/.bashrc
EOF

