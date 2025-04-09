FROM node:20-alpine AS builder

WORKDIR /app
RUN apk update && apk upgrade
COPY . .
RUN yarn install --frozen-lockfile --ignore-scripts --prefer-offline

EXPOSE 3000
CMD [ "yarn", "start" ]
