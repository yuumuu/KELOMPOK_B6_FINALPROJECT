FROM node:18-alpine

# Tentukan working directory
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin sisa file aplikasi
COPY . .

# Expose port aplikasi (sesuai APP_PORT di .env atau default 3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]