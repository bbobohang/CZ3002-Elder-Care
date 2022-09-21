# Official node image
FROM node:17
# Setting the working directory to "/client"
WORKDIR /client

# Copies the package.json file into "/client" and run npm i
COPY package.json /client
RUN npm install
# Copies the entire react source code into "/client"
COPY . /client

EXPOSE 3000
# Starting the react app
CMD [ "npm", "start"]