FROM node:18-alpine AS base

WORKDIR /app

FROM base AS deps

RUN apk add libc6-compat

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

EXPOSE 3000

FROM nginx:alpine AS nginx

COPY --from=build /app/apps/admin/dist /usr/share/nginx/html/admin
COPY --from=build /app/apps/download/dist /usr/share/nginx/html/download
# COPY --from=build /app /usr/share/nginx/html
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY conf/nginx.conf /etc/nginx/nginx.conf

RUN apk add nodejs npm

EXPOSE 80
# COPY script/entrypoint.sh /usr/share/nginx/html/entrypoint.sh
# RUN chmod +x /usr/share/nginx/html/entrypoint.sh
# CMD ["sh", "/usr/share/nginx/html/entrypoint.sh"]
