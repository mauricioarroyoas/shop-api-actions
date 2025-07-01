# Stage 1: Build TypeScript
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Run built app
FROM node:20

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/ormconfig.js ./ormconfig.js # if needed
COPY --from=builder /app/tsconfig.json ./tsconfig.json

CMD ["node", "dist/index.js"]
