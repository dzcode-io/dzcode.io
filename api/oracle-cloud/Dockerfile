FROM node:16
# Create app directory
WORKDIR /usr/src/repo

# copy app bundle
COPY . ./

RUN pwd
RUN ls

# Install app dependencies
RUN yarn --production --frozen-lockfile

# export server port
ENV PORT=7070
EXPOSE ${PORT}

# Run the app
WORKDIR /usr/src/repo/api
CMD [ "yarn", "start" ]
