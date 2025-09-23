FROM node

WORKDIR /app

# 3. Copiar requirements (recomendo ter um arquivo requirements.txt)
COPY package.json .

# 4. Instalar dependências
RUN npm install

# 5. Copiar o restante do código da aplicação
COPY . .

# 6. Expor porta
EXPOSE 8081

# 7. Comando para rodar o Servidor
CMD ["npm", "start"]