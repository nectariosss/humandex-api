build a docker image and push it remotely:

--> docker build -t humandex-api:latest .
-->  docker tag humandex-api:latest nectariosss/humandex-api:latest
--> docker push nectariosss/humandex-api:latest
--> go on azure and restart the web app for the api


ON MAC:

---> docker buildx create --use
---> docker buildx build --platform linux/amd64 --load -t humandex-api:latest . 
----> docker tag humandex-api:latest nectariosss/humandex-api:latest  
----> docker push nectariosss/humandex-api:latest
--> go on azure and restart the web app for the api