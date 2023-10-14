# Microserviço Bitcoin
## Tecnologias:
* TypeScript
* RabbitMq
* MongoDB
* WebSocket
* Dcoker

## Objetivo:
O objetivo da aplicação é implementar um gerador de candles de bitcoin que irá mandar dados para o rabbitmq e em seguida consumido por um outro servidor que irá armazenar esses dados no banco e exportar via websocket para consumo no front.

<img src="https://github.com/fellipe-s-brandao/microservicos-bitcoin/blob/main/microservicos.png" style="width: 600px"/>

## Para Rodar:
* Instale as dependências das aplicações
* Incie os containers de cada aplicação com o ```docker-compose up -d```
* Inicie cada aplicação com o comando ``` npm run dev ```
