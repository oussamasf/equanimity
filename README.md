# Equanimity Project

## Introduction

Equanimity is server application built using _Nest.js_, It leverages _Socket.IO_ to manage WebSocket communication.
For improved performance and to handle a growing number of concurrent connections, the application is designed to run in multiple instances.
These instances can communicate with each other using _Redis Pub/Sub_
To distribute incoming WebSocket requests evenly between the multiple instances, an _Nginx_ load balancer is employed .

## Features

- WebSocket server using Nest.js with Socket.IO integration.
- Scalable architecture with multiple instances of the WebSocket server for
  handling increased traffic.
- Communication between instances using Redis Pub/Sub for seamless  
  synchronization.
- Nginx load balancer with round-robin load balancing to distribute  
  incoming WebSocket connections.
- Docker Compose for easy setup and **simulation** of the entire application stack.

## To get started

ensure you have the following prerequisites installed on your system:

- Docker
- Docker Compose

then create .env file "check the example" then run the following commend :
`docker compose -f "docker-compose.yml" up -d --build`

## Contributing

I welcome and i **need** your contributions to my project! If you find any issues or have suggestions for improvement, please feel free to submit a pull request or open an issue in the GitHub repository.

## TODO
