# 360Feedback - [Alfredo Castillo]

## Descripción

Este proyecto es una aplicación web para realizar evaluaciones 360 grados de empleados remotos, desarrollada como parte de una prueba técnica para Nolotech.  
La aplicación permite a empleados y managers llevar a cabo evaluaciones de desempeño, generando reportes y retroalimentación integral.

## Funcionalidades

- Registro e inicio de sesión de usuarios con roles (Admin, Manager, Employee).
- Creación y edición de evaluaciones.
- Evaluación de empleados por colegas y autoevaluación.
- Visualización de resultados mediante gráficos y tablas.
- Generación de reportes de evaluación para empleados.
- Envío de feedback para evaluaciones.

## Tecnologías

- **Frontend:** React
- **Backend:** Node.js con Express.js
- **Base de Datos:** MongoDB (con Mongoose)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/aajcs/evaluaciones_360.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   - Crea un archivo [.env](http://_vscodecontentref_/0) en las carpetas `backend` y `frontend`.
   - Añade las variables necesarias (puedes ver el ejemplo en [.env.example](http://_vscodecontentref_/1)).

4. Inicia la aplicación:

   backend
   npm start
   frontend
   npm start

## Estructura del Proyecto

- **backend/**: Código del servidor Node.js y Express.js.
- **frontend/**: Código de la aplicación React.
- **docs/**: Diagrama de la base de datos y otros documentos relevantes.

## Decisiones de Diseño

- Explicar las decisiones clave de diseño, como la estructura de la API y la gestión de estado en el frontend.

## Despliegue

FrontEnd

- https://360feedback-tau.vercel.app/
  BackEnd
  https://api-360feedback-aa3c087647eb.herokuapp.com/

usuario administrador

admin@correo.com
123456

## Contacto

- Alfredo Castillo - ing.alfredoacastillo@gmail.com - https://github.com/aajcs
