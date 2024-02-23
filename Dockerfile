FROM node:18-alpine 
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 80
CMD npm run dev -- --host 0.0.0.0 --port 80
