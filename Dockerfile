FROM node:alpine 

WORKDIR '/app'

COPY package.json .

RUN yarn install --legacy-peer-deps

RUN yarn build

COPY . .

EXPOSE 3000

CMD ["yarn","start"]