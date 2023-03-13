# ==== CONFIGURE =====
# Use a Node 18 base image
FROM node:18.12.1-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .

# ==== BUILD =====
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
ENV REACT_APP_VERSION ${REACT_APP_VERSION}
ENV REACT_APP_ENVIRONMENT ${REACT_APP_ENVIRONMENT}
ENV REACT_APP_API_KEY ${REACT_APP_API_KEY}
ENV REACT_APP_AUTH_DOMAIN ${REACT_APP_AUTH_DOMAIN}
ENV REACT_APP_PROJECT_ID ${REACT_APP_PROJECT_ID}
ENV REACT_APP_STORAGE_BUCKET ${REACT_APP_STORAGE_BUCKET}
ENV REACT_APP_MESSAGING_SENDER_ID ${REACT_APP_MESSAGING_SENDER_ID}
ENV REACT_APP_APP_ID ${REACT_APP_APP_ID}
ENV REACT_APP_APP_COOKIE_EXPIRES ${REACT_APP_APP_COOKIE_EXPIRES}
ENV NODE_ENV test
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]