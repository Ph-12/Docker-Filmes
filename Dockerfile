# Usando a imagem oficial do Node.js como base
FROM node:20-alpine

# Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o arquivo package.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta que a API irá rodar
EXPOSE 3000

# Definir a variável de ambiente que será usada pelo node
ENV NODE_ENV=development

# Comando para rodar a aplicação
CMD ["node", "app.js"]
