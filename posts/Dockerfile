FROM node:12.6.0-alpine as build-stage

WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run build

FROM node:12.6.0-alpine

RUN apk add --no-cache python py-pip
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app .
CMD [ "npm", "run", "watch" ]
