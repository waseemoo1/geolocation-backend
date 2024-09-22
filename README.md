# NestJS App with Docker

This is an example NestJS app that can be run using Docker. The app allows users to upload and store files, and includes Swagger documentation for exploring the API.

## Prerequisites

Before you begin, you will need to have the following installed on your system:

- Docker
- docker-compose

## Getting Started

1. Clone the repository to your local machine.

2. Create .env file in the root of the project and set up env variables as set in the .example.env

3. Build and start the Docker containers by running the following command from the project directory:

```sh
docker-compose up --build
```

> This will build the images and start the containers.

Once the containers are running, you can access the app at: {host}:{port} you have specified.

To explore the Swagger documentation, navigate to {host}:{port} in your web browser.