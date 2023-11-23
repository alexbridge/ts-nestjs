FROM node:18-alpine

# System packages
RUN apk --no-cache add curl

# App
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# Debug port
EXPOSE 9229

CMD ["npm", "run", "start:debug"]
