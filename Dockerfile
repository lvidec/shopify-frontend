FROM node:16-alpine
WORKDIR /app

# Regex for both files package.json & package-lock.json
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
