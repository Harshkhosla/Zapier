# Use the official Node.js 18 as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install node modules and dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Ensure the Prisma client is generated
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Compile TypeScript (if needed) before starting the app
RUN npm run build

# Ensure Prisma migrations are applied, seed the database, and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && node dist/index.js"]
