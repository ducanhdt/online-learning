FROM node:12.18.3

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN npm i

COPY public /app/public

# Copy app source code
COPY . /app

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
