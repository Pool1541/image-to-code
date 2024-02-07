### El usuario puede usar la aplicación con su prueba gratuita(5 veces) o con su propia api key.

- [x] Se debería enviar el uid si el usuario está autenticado o la apiKey si no lo está.
- [x] Si el usuario está autenticado, se debería enviar el uid y en el servidor se debería valida que el uid sea válido y que el usuario cuente con una prueba gratuita activa. Caso contrario se mostraría un error indicando que la prueba gratuita se terminó y para seguir usando la aplicación debería ingresar su api key.
- [x] Si el usuario no está autenticado, se debería enviar la api key y en el servidor se debería validar que la api key sea válida, caso contrario se mostraría un error en pantalla solicitando que ingrese una api key válida.
- [x] Si el usuario está autenticado e ingresa una api key, se validaría primero si tiene una prueba gratuita activa y se usaría la prueba gratuita en lugar de la api key. Si la prueba gratuita está terminada, se usaría la api key siempre y cuándo sea válida, caso contrario se mostraría un error solicitando una api key válida.
- [x] Siempre se mostrará un botón que derive al usuario a un formulario para dejar feedback sobre la aplicación.

## Logging

- [x] Configurar el logger con winston.
- [x] En modo de desarrollo se deberán mostrar los logs en la consola y se deberán almacenar en un archivo dentro del servidor.
- [x] En modo de producción se deberán mostrar los logs en la consola y se deberán enviar a un servicio de terceros ([Better Stack](https://logs.betterstack.com/)) para almacenarlos y posteriormente analizarlos.
- [x] Se deberán mostrar/almacenar los siguientes logs:
  - [x] Errores de parte de la api de openAI.
  - [x] Errores en general.
  - [x] Cuando un usuario se registra en la aplicación.
  - [x] Cuando un usuario envía feedback sobre la aplicación.
  - [x] Cuando un usuario usa la aplicación satisfactoriamente. Es decir, cuando crea un componente, ya sea con su propia api key o con un periodo de prueba.

## Despliegue

- [x] Se deberá configurar y desplegar la aplicación en Railway - Render - Firebase o Vercel.
- [x] Se deberá configurar y desplegar la base de datos en Railway - Render - Firebase o Vercel.

## UI

- [x] Solucionar el parpadeo al generar el componente.
