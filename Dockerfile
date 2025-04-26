FROM --platform=linux/amd64 node:22

WORKDIR /usr/src/repo

COPY ./package.json ./package.json

COPY ./web/bundle ./web/bundle

COPY ./packages/tooling/package.json ./packages/tooling/package.json

COPY ./packages/utils/package.json ./packages/utils/package.json
COPY ./packages/utils/dist ./packages/utils/dist

COPY ./web-server/package.json ./web-server/package.json
COPY ./web-server/dist ./web-server/dist

RUN npm install --install-strategy=nested --omit=dev --workspace=@dzcode.io/web-server

ENV PORT=80
WORKDIR /usr/src/repo/web-server
CMD [ "npm", "run", "start" ]
