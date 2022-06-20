FROM node:lts-alpine3.15
ENV NODE_ENV=production

#Working Dir
WORKDIR /app

#Copy Package json file
COPY ["package.json", "package-lock.json*", "./"]

#Install files
RUN npm install --production

#Copy source files
COPY . .
CMD [ "npm", "start" ]

#Expose the API port
EXPOSE 1337


