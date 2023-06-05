FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM node:14 as prod
WORKDIR /app
COPY --from=build /app/dist /app/build
RUN npm install -g serve
CMD ["serve", "-s", "/app/build"]
EXPOSE 3000