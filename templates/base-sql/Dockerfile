# ベースイメージとして node:20.15-alpine を使用
FROM node:20.15-alpine AS base

# PNPMのインストールと設定
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 作業ディレクトリを設定
WORKDIR /app

# 依存ファイルのコピー
COPY package.json ./

# 本番依存性のインストール
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# ビルドステージ
FROM base AS build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm build

# Prisma クライアントの生成
COPY prisma /app/prisma/
RUN npx prisma generate

# 本番用イメージ
FROM base AS production
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/dist /app/dist
# ここで再度Prismaクライアントを生成
RUN npx prisma generate
EXPOSE 8000
CMD ["pnpm", "start"]