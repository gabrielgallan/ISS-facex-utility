FROM python:3.12-slim

WORKDIR /app

# 3. Copiar requirements (recomendo ter um arquivo requirements.txt)
COPY requirements.txt .

# 4. Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar o restante do código da aplicação
COPY . .

# 6. Expor porta que o Uvicorn vai usar
EXPOSE 8082

# 7. Comando para rodar o FastAPI com Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8082"]
