# Official node image
FROM node:18
LABEL version="2.0"
LABEL description="This is the base docker image for the GIC frontend react app."

# Setting the working directory to "/client"
WORKDIR /src/app/client

# Copies the package.json file into "/client" and run npm i
COPY ./package.json ./package-lock.json ./
RUN npm install
# Copies the entire react source code into "/client"
COPY . .

EXPOSE 3000
# Starting the react app
CMD [ "npm", "start"]