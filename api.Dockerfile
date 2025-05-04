FROM --platform=linux/amd64 node:22

WORKDIR /usr/src/repo

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

# AUTO_GEN
COPY ./api/dist ./api/dist
COPY ./api/package.json ./api/package.json
COPY ./api/db ./api/db
COPY ./packages/tooling/package.json ./packages/tooling/package.json
COPY ./data/dist ./data/dist
COPY ./data/package.json ./data/package.json
COPY ./data/models ./data/models
COPY ./packages/models/dist ./packages/models/dist
COPY ./packages/models/package.json ./packages/models/package.json
COPY ./packages/utils/dist ./packages/utils/dist
COPY ./packages/utils/package.json ./packages/utils/package.json
# AUTO_GEN_END

RUN npm install --omit=dev --workspace=@dzcode.io/api --frozen-lockfile

ENV PORT=80
WORKDIR /usr/src/repo/api
CMD [ "npm", "run", "start" ]
