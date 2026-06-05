# Use Microsoft's official Playwright image which includes Node.js and all required browser dependencies
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the application port (defaults to 4173 in server.js)
EXPOSE 4173

# Start the application
CMD ["npm", "start"]
