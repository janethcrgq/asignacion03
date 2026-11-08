# Asignación 3 · Web Components

## Parte A · Tabla genérica

**¿Por qué esta tabla se puede llamar «genérica»?**

Porque no sabe qué datos muestra. Sólo recibe columnas y filas, y pinta lo que le den.

**¿Qué tendría que cambiar para mostrar alumnos en lugar de productos?**

Nada en la tabla. Sólo se le pasan otras columnas (por ejemplo matrícula, nombre y promedio) y una lista de alumnos.

## Parte B · Contador de cantidad

Elegí el contador de cantidad, que sirve para escoger cuántas piezas de un producto se agregan al carrito.

**Qué recibe:** la cantidad con la que empieza y hasta dónde puede bajar y subir. Eso se le pasa con los atributos `valor`, `min` y `max`.

**Qué avisa:** cada vez que alguien presiona − o +, lanza el evento `cambio` con la nueva cantidad, para que la página sepa cuántas piezas se eligieron.

**Qué guarda adentro:** sus botones, el número que se ve y sus estilos. También se encarga solo de no pasarse del mínimo ni del máximo, y apaga el botón que ya no se puede usar.
