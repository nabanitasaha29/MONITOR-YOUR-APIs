# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.27-alpine
RUN mkdir -p /usr/share/nginx/html/dashboard
#COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist/ /usr/share/nginx/html/dashboard/



COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
