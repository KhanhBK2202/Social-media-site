FROM node:16-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

# ENV REACT_APP_BASE_URL="https://khanhmtn.api.internship.designveloper.com"
ENV REACT_APP_BASE_URL="http://localhost:3001"

ENV REACT_APP_IMGSV_API_KEY="cd799d5eb8748b4aa1bb1ab0a31955f3"

ENV REACT_APP_KEY="e3c55ad24d104b8c940215558220406"
ENV REACT_APP_URL="https://api.weatherapi.com/v1/current.json?aqi=no"

ENV PORT=80

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .
# RUN npm install --legacy-peer-deps
RUN npm install

COPY . .

RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]