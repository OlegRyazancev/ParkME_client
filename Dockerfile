FROM node:21-alpine AS build
ENV PROFILE_ACTIVE=docker
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
