# Use the official Node.js 18 as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/dist/index

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install node modules and dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Ensure the database is migrated before starting the app
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Ensure Prisma migrations are applied before running the app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
