# Use Node.js LTS version
FROM node:18 AS build
WORKDIR /app
COPY . .
COPY .env.local .env.local
RUN npm install
RUN npm run build
RUN npm run dev
