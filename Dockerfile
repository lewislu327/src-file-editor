# Use an official Node runtime as the parent image
FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Copy the backend source code
COPY . .

# Go to the client directory
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
RUN npm run build

# Go back to the main directory
WORKDIR /usr/src/app

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["node", "server.js"]