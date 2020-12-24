FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src
COPY . .

WORKDIR /app/src/server
RUN npm install

WORKDIR /app/src/client
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]