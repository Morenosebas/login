FROM node:latest
WORKDIR /src
COPY package.json tsconfig.json /src/
RUN npm install
COPY . /src
EXPOSE 3000
CMD ["npm", "run", "build"]
CMD ["npm", "start"]


