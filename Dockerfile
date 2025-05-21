# Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# Start the app
CMD ["npm", "run", "start:prod"]
