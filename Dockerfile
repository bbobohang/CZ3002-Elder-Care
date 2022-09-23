# Sets the base image of the application to the node’s official image.
FROM node:18

# Sets the Working Directory as "/server"
WORKDIR /src/app/server
# Copies the package.json file into "/server" and runs npm i
COPY package.json package-lock.json ./

ENV MONGO_URI = mongodb+srv://ASE9AMCLASS:ASE9amClass@cluster9am.di4mufr.mongodb.net/?retryWrites=true&w=majority
ENV JWT_SECRET = mysecrettoken
# ENV medicApiUsername= Xt92R_GMAIL_COM_AUT
# ENV medicApiPassword= e7ZSo65WjKc98Ttk3
# ENV priaid_authservice_url= https://authservice.priaid.ch/login
# ENV priaid_healthservice_url= https://healthservice.priaid.ch

RUN npm install
# Copies the entire source code into "/server"
COPY . .

# Specifies the port the node app will be running on
EXPOSE 5000

# Runs "nodemon index.js" after the above step is completed
CMD ["npm", "run", "server"] 