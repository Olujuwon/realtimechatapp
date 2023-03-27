# ==== CONFIGURE =====
# Use a Node 18 base image
FROM node:18.12.1-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .

# ==== BUILD =====
RUN npm install -g npm@latest
RUN npx update-browserslist-db@latest
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install
# Build the app
RUN npm run build

# ==== RUN =======
# Set the env to "production"
#ENV NODE_ENV develop
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
#EXPOSE 3000
# Start the app
#CMD [ "npx", "serve", "build" ]

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as develop
# Copy built assets from `builder` image

COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start nginx
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]