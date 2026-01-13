FROM node:18-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Tentukan working directory
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

ENV NODE_ENV=development

# Salin sisa file aplikasi
COPY . .

# Expose port aplikasi (sesuai APP_PORT di .env atau default 3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "dev"]