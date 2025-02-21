
# BussBot

**BussBot** es una aplicación web desarrollada en **Django** que permite conocer la ruta de los buses de la ciudad de Milagro, Ecuador, mediante un mapa interactivo basado en la API de **OpenStreetMap**. Además, cuenta con un chatbot que, al ingresar un destino, responde con las rutas de los buses que recorren el trayecto hasta dicho destino. Actualmente, el sistema funciona con buses simulados.

## Tecnologías Utilizadas

- Django
- Python
- OpenStreetMap API
- Chatbot para rutas

## Mi Rol

Mi rol en el proyecto fue la **creación del chatbot** encargado del procesamiento del destino y la determinación de las rutas de los buses. El chatbot interpreta la solicitud del usuario y proporciona información sobre qué buses tomar en función de la ruta disponible.

## Cómo Funciona

1. Utiliza un mapa interactivo de **OpenStreetMap** para visualizar las rutas de los buses.
2. Cuenta con un chatbot que procesa el destino ingresado por el usuario y sugiere las rutas disponibles.
3. Simula el recorrido de los buses en la ciudad de Milagro.

## Instrucciones para Ejecutar el Proyecto

### Requisitos

Asegúrate de tener **Python 3** y **Django** instalados en tu entorno de desarrollo. Si no los tienes, puedes instalarlos siguiendo los siguientes pasos.

1. Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tuusuario/bussbot.git
cd bussbot
```

2. Instala los requisitos del proyecto:

```bash
pip install -r requirements.txt
```

### Ejecutar el Servidor

Para ejecutar el servidor y poner en marcha la aplicación:

1. Asegúrate de que las migraciones de la base de datos estén aplicadas:

```bash
python manage.py migrate
```

2. Luego, ejecuta el servidor de desarrollo:

```bash
python manage.py runserver
```

Esto arrancará el servidor en `http://127.0.0.1:8000/` o en la dirección correspondiente en tu máquina.

## Responsividad

El diseño del proyecto es totalmente responsivo, adaptándose a diferentes dispositivos como móviles y tabletas.
