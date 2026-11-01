# Backend II · Node.js (CoderHouse)

Entrega final del curso **Programación Backend II** de CoderHouse: el e-commerce de Backend I con autenticación, autorización y una arquitectura en capas.

## Qué incluye

- **Autenticación:** Passport (local, JWT y GitHub), sesiones y cookies, contraseñas con bcrypt.
- **Arquitectura en capas:** controllers, services, DAO, DTO y repository.
- **Compras:** carritos y generación de tickets.
- **Tiempo real:** chat y listado de productos con Socket.io.

**Tecnologías:** Node.js · Express · MongoDB · Mongoose · Passport · JWT · Handlebars · Socket.io

## Cómo ejecutar

```bash
cd 02EntregaFinal
npm install
npm start
```

Necesita un archivo `.env` con la conexión a MongoDB, el secreto de JWT y las credenciales de OAuth de GitHub. El `Readme.md` de la carpeta detalla la consigna.
