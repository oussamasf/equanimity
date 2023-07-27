# Use a base Node.js image
FROM node:18-alpine

# Copy package.json and yarn.lock (if using Yarn)
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install 

# Copy the rest of the application files
COPY . .

# Set the command to run your Nest.js app
CMD [ "yarn", "start:dev" ]