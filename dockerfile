FROM node:latest
WORKDIR /src
COPY respaldo.sql /usr/src/app/respaldo.sql
COPY Auth-jwt.postman_collection.json /usr/src/app/Auth-jwt.postman_collection.json
COPY package.json package-lock.json /src/
RUN npm install
COPY . /src
EXPOSE 3000
CMD ["npm", "start"]
