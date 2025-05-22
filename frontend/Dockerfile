# frontend/Dockerfile
# Stage 1: Build the Angular app
FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve the Angular app with NGINX
FROM nginx:alpine

COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
