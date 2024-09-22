#################
## DEVELOPMENT ##
#################
FROM node:20-alpine3.18 AS development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

USER node

###################
## BUILD FOR PRODUCTION ##
###################
FROM node:20-alpine3.18 AS build

WORKDIR /app

COPY --from=development /app/package.json ./
COPY --from=development /app/package-lock.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production

USER node

################
## PRODUCTION ##
################
FROM node:20-alpine3.18 AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD [ "node", "./dist/src/main.js" ]