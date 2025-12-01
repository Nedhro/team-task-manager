FROM node:18-alpine
WORKDIR /app
# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@10.6.2 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
CMD ["node", "dist/main.js"]