# Projeto /Proxy: Servidor - Proxy
Projeto backend destinado a um servidor proxy, que atua como intermediário entre Client:GUI e REST API, fornecendo imagens/jpeg dos frames das detecções do FaceX pelo horário do evento.

## Variáveis Ambientes:
```bash  
AUTH_USERNAME - #Usuário SecurOS  
AUTH_PASSWORD - #Senha do Usuário  
REST_API_ADDRESS - #Endereço do REST API: http://<ip>:<port>
PORT - #Porta do servidor / Docker: 8081
```
## Instalação e Operação
```bash
git clone https://github.com/gabrielgallan/ISS-FACEX-GUI.git
cd Proxy
npm install
```
```bash 
npm run dev #Ambiente de desenvolvimento (nodemon)
npm start #Roda o servidor
```
### Docker:
```bash 
docker compose build
docker compose up -d #Rodar em segundo plano
docker compose up -d --build #Recriar a imagem
docker compose logs -f #Consultar logs
```
### Rotas:
GET /proxy_api/v1/cameras/<camera_id>/image/<time_ISO>
