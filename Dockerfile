FROM node:alpine 

WORKDIR '/app'

COPY package.json .

RUN yarn install --legacy-peer-deps

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]