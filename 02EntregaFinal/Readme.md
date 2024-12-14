# Entrega Final de tu Proyecto

## Descripción

Se profundizará sobre los roles de los usuarios, las autorizaciones y sobre la lógica de compra, mejorando la arquitectura del servidor.

## Objetivos Generales

- Profesionalizar el servidor desarrollado en la primera preentrega.

## Objetivos Específicos

- Aplicar una arquitectura profesional para nuestro servidor.
- Aplicar prácticas como patrones de diseño, mailing, variables de entorno, etc.

---

## Entregables

### 1. Persistencia de Datos
- Modificar la capa de persistencia para aplicar los conceptos de DAO y DTO.
- Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

### 2. Ruta `/current`
- Modificar la ruta para evitar enviar información sensible.
- Enviar un DTO del usuario con sólo la información necesaria.

### 3. Middleware de Autorización
- Crear un middleware que trabaje con la estrategia "current" para implementar un sistema de autorización:
  - **Administrador**: Puede crear, actualizar y eliminar productos.
  - **Usuario**: Puede agregar productos a su carrito.

### 4. Modelo `Ticket`
- Crear un modelo con las siguientes características:
  - `Id`: Autogenerado por MongoDB.
  - `code`: String, debe autogenerarse y ser único.
  - `purchase_datetime`: Fecha y hora exacta de la compra (similar a `created_at`).
  - `amount`: Número total de la compra.
  - `purchaser`: String con el correo del usuario asociado al carrito.

### 5. Ruta `/carts/:cid/purchase`
- Implementar la ruta para finalizar el proceso de compra:
  - Corroborar el stock del producto al momento de la compra:
    - Si el producto tiene suficiente stock, restarlo del inventario.
    - Si no tiene suficiente stock, excluirlo del proceso de compra.
  - Utilizar el servicio de Tickets para generar un ticket con los datos de la compra.
  - Devolver un arreglo con los IDs de los productos que no pudieron procesarse en caso de compra incompleta.
  - Actualizar el carrito para que contenga únicamente los productos que no pudieron comprarse.

---

## Formato de Entrega

- Link al repositorio de Github con el proyecto (excluir `node_modules`).
- Archivo `.env` para la configuración del proyecto.