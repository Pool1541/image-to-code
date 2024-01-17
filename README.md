### El usuario puede usar la aplicación con su prueba gratuita(5 veces) o con su propia api key.

- [] Se debería enviar el uid si el usuario está autenticado o la apiKey si no lo está.

- [] Si el usuario está autenticado, se debería enviar el uid y en el servidor se debería valida que el uid sea válido y que el usuario cuente con una prueba gratuita activa. Caso contrario se mostraría un error indicando que la prueba gratuita se terminó y para seguir usando la aplicación debería ingresar su api key.
- [] Si el usuario no está autenticado, se debería enviar la api key y en el servidor se debería validar que la api key sea válida, caso contrario se mostraría un error en pantalla solicitando que ingrese una api key válida.
- [] Si el usuario está autenticado e ingresa una api key, se validaría primero si tiene una prueba gratuita activa y se usaría la prueba gratuita en lugar de la api key. Si la prueba gratuita está terminada, se usaría la api key siempre y cuándo sea válida, caso contrario se mostraría un error solicitando una api key válida.
- [] Siempre se mostrará un botón que derive al usuario a un formulario para dejar feedback sobre la aplicación.
