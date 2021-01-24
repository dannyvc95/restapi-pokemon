FROM node:alpine

WORKDIR /app

COPY index.js package.json ./

COPY src/ ./src/

RUN npm install

EXPOSE 8000

CMD [ "node", "index.js" ]