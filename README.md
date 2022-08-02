### C5G8 ESC Application
Run frontend with:
```
cd frontend
($env:HTTPS = "true") -and ($env:SSL_CRT_FILE="../cert.pem") -and ($env:SSL_KEY_FILE="../key.pem") -and  (npm start)
```

Run backend with:
```
uvicorn --ssl-keyfile "key.pem" --ssl-certfile "cert.pem" backend.__main__:app
```