FROM node:20
# Create app directory
WORKDIR /usr/src/repo

# copy app bundle
COPY . ./

RUN pwd
RUN ls

# Install app dependencies
RUN npm install --frozen-lockfile

# export server port
ENV PORT=7070
EXPOSE ${PORT}

# Run the app
WORKDIR /usr/src/repo/api
CMD [ "npm", "run", "start" ]
