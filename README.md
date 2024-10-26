# Angular-tailwind

# Products Orders Application

Este es un proyecto de aplicación web desarrollado con Angular que permite gestionar productos y pedidos. La aplicación está dockerizada para facilitar su despliegue y ejecución.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Clonar el Repositorio

Para clonar el repositorio, ejecuta el siguiente comando en tu terminal:

bash git clone https://github.com/darskin/Angular-tailwind.git


Luego, navega al directorio del proyecto:

bash cd products-orders


## Construir y Ejecutar con Docker Compose

El proyecto está configurado para ejecutarse con Docker Compose. Para construir y ejecutar la aplicación, sigue estos pasos:

1. Asegúrate de estar en el directorio raíz del proyecto donde se encuentra el archivo `docker-compose.yml`.

2. Ejecuta el siguiente comando para construir y ejecutar los contenedores:

bash docker-compose up --build


3. Una vez que los contenedores estén en funcionamiento, la aplicación estará disponible en `http://localhost`.

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación Angular.
- **Dockerfile**: Define cómo se construye la imagen Docker de la aplicación.
- **docker-compose.yml**: Configura los servicios Docker para la aplicación.
