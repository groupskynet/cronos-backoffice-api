FROM node:22-bullseye as base
ENV DIR /app
WORKDIR $DIR

FROM base as build
COPY tsoa.json $DIR
COPY package*.json $DIR
COPY src $DIR/src
RUN npm install -g pnpm
COPY tsconfig*.json $DIR
COPY src $DIR/src
RUN pnpm install
RUN pnpm run build

FROM build as production

COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/build $DIR/build

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build/src/app.js"]

FROM build as dev

COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/build $DIR/build

EXPOSE 3000
CMD ["npm","run","dev"]

