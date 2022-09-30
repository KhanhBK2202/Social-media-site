FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV JWT_ACCESS_KEY=jwt
ENV JWT_REFRESH_KEY=jwtabc
ENV MONGODB_URL=mongodb+srv://khanhmtn:tronlegacy2202@cluster0.y7316sr.mongodb.net/?retryWrites=true&w=majority

ENV PORT=80

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

RUN npm install

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 80

CMD [ "npm", "start" ]