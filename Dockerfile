# syntax=docker/dockerfile:1
FROM node:18 AS builder

WORKDIR /app

COPY . /app

RUN npm ci

FROM gcr.io/distroless/nodejs:18

COPY --from=builder /app /app

WORKDIR /app

CMD ["dist/index.js"]