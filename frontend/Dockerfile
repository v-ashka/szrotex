#Stage 1
FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#Stage 2 
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
# COPY build/ /usr/share/nginx/html