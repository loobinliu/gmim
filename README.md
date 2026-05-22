# 早安鸡汤

一个开源的“每日早安金句 + 日签海报”全栈网站。项目每天生成一句适合早晨阅读和分享的名人名言/经典语录，包含作者、出处和核心含义解释，并提供海报生成与开放 API。

## 功能

- 每日生成一句早安金句，包含作者、出处和解释。
- 无需 AI Key 也可运行：默认使用内置精选语录。
- 可选择背景风格，生成 1080×1440 PNG 早安海报。
- 提供 JSON API 和图片 API。
- 支持 Vercel Cron 或本地脚本定时生成。
- Next.js + Prisma + Sharp + Tailwind CSS，适合开源部署。

## 快速开始

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

打开 `http://localhost:3000`。

## 常用命令

```bash
npm run dev          # 本地开发
npm run build        # 生产构建
npm run lint         # ESLint
npm run typecheck    # TypeScript 检查
npm run test         # Vitest
npm run db:migrate   # 本地开发数据库迁移
npm run db:deploy    # 生产环境应用已有迁移
npm run db:seed      # 写入今日种子金句
npm run quote:daily  # 生成今日金句
```

## Docker 部署

Docker 部署使用 SQLite + Docker volume 持久化数据，默认数据库路径是 `file:/app/data/prod.db`。

首次部署：

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker build
docker compose --env-file .env.docker run --rm app npm run db:deploy
docker compose --env-file .env.docker run --rm app npm run db:seed
docker compose --env-file .env.docker up -d
```

打开 `http://localhost:3000`。

查看日志和停止服务：

```bash
docker compose --env-file .env.docker logs -f app
docker compose --env-file .env.docker down
```

更新部署：

```bash
docker compose --env-file .env.docker build
docker compose --env-file .env.docker run --rm app npm run db:deploy
docker compose --env-file .env.docker up -d
```

手动生成今日金句：

```bash
docker compose --env-file .env.docker exec app npm run quote:daily
```

Docker Compose 会把 SQLite 数据持久化到命名 volume `jitang-data`，容器内挂载路径为 `/app/data`。重建镜像或重启容器不会删除数据库；如果需要清空数据，可先停止服务，再手动删除对应 Docker volume。

Docker 环境变量示例在 `.env.docker.example`。生产部署时至少修改 `CRON_SECRET`；`NEXT_PUBLIC_*` 变量会在构建时写入客户端代码，修改后需要重新 build 镜像。如需自定义中文字体，请把字体文件挂载到容器内，并把 `POSTER_FONT_PATH` 设置为容器内路径。

## API

### 获取今日金句

```bash
curl http://localhost:3000/api/quote/today
```

### 按日期获取金句

```bash
curl "http://localhost:3000/api/quote?date=2026-05-22"
```

### 获取今日海报 PNG

```bash
curl -o morning.png "http://localhost:3000/api/poster/today?backgroundId=gradient-warm"
```

### 获取今日海报 JSON

```bash
curl "http://localhost:3000/api/poster/today?backgroundId=gradient-warm&response=json"
```

### 生成指定海报

```bash
curl -X POST http://localhost:3000/api/poster \
  -H "Content-Type: application/json" \
  -o poster.png \
  -d '{"backgroundId":"morning-blue","embedInImage":true,"width":1080,"height":1440}'
```

## 环境变量

复制 `.env.example` 到 `.env` 后按需修改：

```env
DATABASE_URL="file:./dev.db"
AI_PROVIDER="none"
CRON_SECRET="change-me"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_TIMEZONE="Asia/Shanghai"
POSTER_FONT_PATH=""
```

当前版本默认 `AI_PROVIDER=none`，使用本地语录池，保证开源项目可直接运行。

## 定时任务

Vercel 部署时，`vercel.json` 会每天调用：

```text
/api/cron/daily-quote
```

该接口会校验请求头：

```text
Authorization: Bearer <CRON_SECRET>
```

本地或自有服务器可用：

```bash
npm run quote:daily
```

Docker 部署后也可以直接调用 cron 接口：

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" http://localhost:3000/api/cron/daily-quote
```

## 背景与字体授权

第一版默认使用程序生成的渐变背景，不打包第三方摄影素材，便于开源分发。中文海报使用系统字体回退；如需更稳定的字体效果，建议自行配置开源字体，例如 Noto Sans SC 或思源黑体，并通过 `POSTER_FONT_PATH` 管理。

## 引文说明

项目用于每日启发和分享，不是严肃引文数据库。无法确认精确出处的内容会标记为“出处未详”，避免编造具体书名或来源。

## License

MIT
