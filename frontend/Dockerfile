# use a node image as the base image and name it 'build' for
# later reference
FROM node:20-alpine3.20 as build

# set the working directory to /app
RUN mkdir /frontend
WORKDIR /frontend
# copy the current directory contents into the container at /app
COPY . .
# install dependencies, matching yarn.lock
RUN yarn install
# build the app
RUN yarn build

# Use the latest version of the official Nginx image as the base image
FROM nginx:latest
# copy the custom nginx configuration file to the container in the default
# location
COPY nginx.conf /etc/nginx/nginx.conf
# copy the built application from the build stage to the nginx html
# directory
COPY --from=build /frontend/dist/frontend/browser /usr/share/nginx/html

# The above commands build the Angular app and then configure and build a
# Docker image for serving it using the nginx web server.
