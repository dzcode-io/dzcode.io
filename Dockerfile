FROM --platform=linux/amd64 node:22

WORKDIR /usr/src/repo

COPY ./package.json ./package.json

COPY ./packages/tooling/package.json ./packages/tooling/package.json

COPY ./packages/utils/package.json ./packages/utils/package.json
COPY ./packages/utils/dist ./packages/utils/dist

COPY ./packages/models/package.json ./packages/models/package.json
COPY ./packages/models/dist ./packages/models/dist

COPY ./data/package.json ./data/package.json
COPY ./data/dist ./data/dist

COPY ./api/package.json ./api/package.json
COPY ./api/dist ./api/dist

COPY ./web/package.json ./web/package.json
COPY ./web/dist ./web/dist
COPY ./web/bundle ./web/bundle

COPY ./web-server/package.json ./web-server/package.json
COPY ./web-server/dist ./web-server/dist

RUN npm install --install-strategy=nested --omit=dev --workspace=@dzcode.io/web-server

ENV PORT=80
WORKDIR /usr/src/repo/web-server
CMD [ "npm", "run", "start" ]
