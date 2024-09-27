FROM node:20
WORKDIR /server
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["npm", "start"]