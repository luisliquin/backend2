# Pre-entrega de tu Proyecto Final

Se implementará en el proyecto ecommerce facilitado al inicio del curso un CRUD de usuarios, junto con un sistema de Autorización y Autenticación.

## Requerimientos

### Crear un modelo `User` con los siguientes campos:
- `first_name`: String
- `last_name`: String
- `email`: String (único)
- `age`: Number
- `password`: String (Hash)
- `cart`: Id (referencia a Carts)
- `role`: String (default: 'user')

### Funcionalidades
1. **Encriptar Contraseña**  
   - Utilizar el paquete `bcrypt` para encriptar la contraseña.
   - Emplear el método `hashSync`.

2. **Estrategias de Passport**  
   - Configurar las estrategias de Passport para que funcionen con este modelo de usuarios.

3. **Login con JWT**  
   - Implementar un sistema de login del usuario utilizando JWT.

4. **Estrategia “current”**  
   - Extraer la cookie que contiene el token y, con dicho token, obtener el usuario asociado.
   - Si existe el token, devolver el usuario asociado al mismo.
   - En caso contrario, devolver un error de Passport.
   - Utilizar un extractor de cookie.

5. **Ruta `/current`**  
   - Agregar al router `/api/sessions/` la ruta `/current`.
   - Esta ruta validará al usuario logueado y devolverá en la respuesta sus datos (asociados al JWT).

## Formato de Entrega
- **Link al repositorio de GitHub** con el proyecto completo (excluir la carpeta `node_modules`).