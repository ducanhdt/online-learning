FROM node:12.18.3

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

RUN npm i

# Bundle app source
COPY . .

RUN npm i nodemon -g

EXPOSE 8080
CMD [ "npm", "run", "dev" ]
