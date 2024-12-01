# Stage 1: Base image with dependencies
FROM node:22.11.0-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Test environment
FROM base AS test
COPY . .
RUN npm install
CMD ["npm", "test"]

# Stage 3: Development/Production build
FROM base AS development
COPY . .
EXPOSE 5173 5000
CMD ["npm", "start"]