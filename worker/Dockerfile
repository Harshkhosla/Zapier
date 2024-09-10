# Use the official Node.js 14 as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/dist/index

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install node modules and dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate


# Expose the port if your processor listens on one
EXPOSE 3004

# Command to start your processor
CMD ["node", "dist/index.js"]
