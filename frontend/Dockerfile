# Use an official Node.js image as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build -- --configuration production

# Use an official Nginx image as the base image
FROM nginx:stable-alpine

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/dist/gut-guide /usr/share/nginx/html

# Expose the port that the Nginx server runs on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]