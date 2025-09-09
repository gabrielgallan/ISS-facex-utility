import requests
from fastapi import HTTPException
import env

async def get_frame(route):
    try:
      response = requests.get(env.REST_API + route, timeout=4, auth=env.AUTH)
      response.raise_for_status()

      return response.content
    except requests.exceptions.HTTPError as err_http:
        # Erro de resposta do servidor (ex.: 404, 500)
        try:
            # Tenta pegar a mensagem do body como JSON
            message = response.json().get("message", str(err_http))
        except Exception:
            # Se não tiver JSON, usa texto bruto
            message = response.text or str(err_http)
        raise HTTPException(status_code=response.status_code, detail=message)
    except requests.exceptions.ConnectionError:
        # Sem resposta do servidor (erro de conexão)
        raise HTTPException(status_code=500, detail="Sem resposta do servidor")
    except requests.exceptions.Timeout:
        # Tempo de resposta excedido
        raise HTTPException(status_code=408, detail="Timeout ao baixar a imagem.")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erro ao baixar a imagem: {e}")