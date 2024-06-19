# Use a imagem oficial do Node.js
FROM node:18

# Crie o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Exponha a porta que a aplicação usa
EXPOSE 80

# Comando para rodar a aplicação
CMD ["npm", "start"]
