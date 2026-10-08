
Tipos principales de JOIN

• INNER JOIN: Devuelve únicamente las filas que tienen valores coincidentes en ambas tablas.
• LEFT JOIN (o LEFT OUTER JOIN): Devuelve todas las filas de la tabla de la izquierda y las filas coincidentes de la tabla de la derecha (si no hay coincidencia, muestra NULL).
• RIGHT JOIN (o RIGHT OUTER JOIN): Devuelve todas las filas de la tabla de la derecha y las filas coincidentes de la tabla de la izquierda (si no hay coincidencia, muestra NULL).
• FULL JOIN (o FULL OUTER JOIN): Combina los resultados de LEFT JOIN y RIGHT JOIN; devuelve todas las filas cuando hay una coincidencia en cualquiera de las tablas.



1. El orden de escritura vs. el orden de ejecución
El motor de MySQL no procesa la consulta de arriba a abajo. Entender esto te salvará de muchos errores, especialmente al usar alias:

Orden de escritura: SELECT ➔ FROM ➔ JOIN ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ ORDER BY ➔ LIMIT

Orden de ejecución real: FROM / JOIN (ubica tablas) ➔ WHERE (filtra filas) ➔ GROUP BY (agrupa) ➔ HAVING (filtra grupos) ➔ SELECT (crea alias y elige columnas) ➔ ORDER BY ➔ LIMIT.

El error común: Como el SELECT ocurre casi al final, no puedes usar un alias de columna (creado en el SELECT) dentro de un WHERE.

2. WHERE vs. HAVING (La trampa clásica)
Esta es la pregunta trampa por excelencia en cualquier examen de bases de datos.

Usa WHERE para filtrar registros individuales antes de agruparlos (ej. WHERE estado = 'Activo'). No puedes usar funciones como SUM() o COUNT() aquí.

Usa HAVING para filtrar los resultados después de haber hecho un GROUP BY (ej. HAVING COUNT(id_pedido) > 5). Si hay una función de agregación en la condición, casi seguro va en el HAVING.

3. Cuidado con las relaciones (JOINs)
El olvido fatal: Nunca olvides la condición ON al hacer un JOIN. Si la omites o escribes mal las llaves foráneas, harás un producto cartesiano (multiplicarás todos los registros de una tabla por la otra), lo que te dará datos incorrectos y masivos.

Identifica la intención del profesor: Lee bien el enunciado. Si te piden "Muestra a los usuarios, incluso si no tienen registros asociados", te están pidiendo a gritos un LEFT JOIN. Si solo quieren "Los usuarios que sí tienen registros", es un INNER JOIN.

4. El manejo de valores nulos (NULL)
En SQL, un NULL no es igual a cero ni a un texto vacío, es la "ausencia de valor".

Nunca uses operadores matemáticos como = o != para buscarlos. La consulta fallará en silencio. Usa siempre IS NULL o IS NOT NULL.

5. Estrategia de construcción progresiva
En un entorno de examen con el tiempo corriendo, no intentes escribir una consulta compleja de 10 líneas de un solo golpe. Ármala por capas:

Inicia con SELECT * FROM tabla_principal. Ejecuta para ver los datos base.

Agrega los JOIN uno por uno. Ejecuta para confirmar que no se duplicaron filas de forma extraña.

Aplica los filtros en el WHERE.

Añade el GROUP BY y el HAVING si el problema pide totales, promedios o conteos.

Al final, limpia el SELECT para dejar solo las columnas exactas que te pide el enunciado y remata con el ORDER BY.
