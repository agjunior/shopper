FROM node:20
WORKDIR /server

COPY .env .env

COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server ./
RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["npm", "start"]