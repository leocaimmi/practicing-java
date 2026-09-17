# Práctica de Java — Programación II

Aplicación web para practicar los contenidos de **Programación II · Desarrollo en Java**.
El contenido se escribió exclusivamente a partir del material teórico de la cátedra:
las 16 clases teóricas y el *Resumen Integral para Parcial*.

## Modalidades

La pantalla de inicio ofrece cuatro modalidades de práctica:

| Modalidad | Qué hace |
| --- | --- |
| **Verdadero o falso** | 82 afirmaciones sobre la teoría de la materia. |
| **Opción múltiple** | 185 preguntas con distractores tomados de los errores más comunes. |
| **Analizar código** | 75 fragmentos de Java para anticipar qué imprimen, qué lanzan o por qué no compilan. |
| **Desafíos de código** | 20 ejercicios donde se escribe el método, se corre contra tests y se recorre la ejecución paso a paso. |

Son **342 preguntas** en total, con al menos 15 por clase y de los tres formatos en cada una.

Además hay un **simulacro de parcial** (20 preguntas de las clases 3 a 12, el alcance que
declara el resumen de la cátedra), **práctica mixta** y práctica por clase.

Cada respuesta viene con su justificación y la clase de la que sale. El progreso y el
porcentaje de aciertos por clase se guardan en el navegador. Hay tema claro y oscuro, y
atajos de teclado: `V` / `F` y `1` a `4` para responder, `Enter` para avanzar.

## Los desafíos de código

Corren **en el navegador**, sin backend. El proyecto incluye un intérprete del subconjunto
de Java que cubre la materia, escrito en TypeScript (`src/lib/java/`).

Eso permite algo que un servicio de ejecución remota no da: el **paso a paso**, donde en
cada línea se ve el valor de cada variable, lo que se lleva impreso en consola y, al llegar
al final, el resultado obtenido contra el esperado. Si la ejecución corta con una excepción,
se marca la línea.

Cada desafío ofrece **varias soluciones posibles**, etiquetadas por nivel y con una nota que
explica qué aporta cada enfoque frente a los otros: por ejemplo, Fibonacci iterativo contra
recursivo, o recorrer con `for each` contra hacerlo por índice. Quedan **bloqueadas hasta el
tercer intento**, para que no sean la salida fácil.

Los botones de correr se habilitan recién cuando el código difiere del esqueleto: no tiene
sentido gastar un intento probando lo que damos nosotros.

### Qué soporta el intérprete

- Tipos primitivos, `String`, `StringBuilder` y arreglos.
- Control de flujo completo: `if`/`else`, `while`, `do-while`, `for`, for each, `break`, `continue`.
- Métodos estáticos con parámetros, retorno y recursión.
- Colecciones: `ArrayList`, `LinkedList`, `HashSet`, `LinkedHashSet`, `TreeSet`, `HashMap`,
  `LinkedHashMap`, `TreeMap`.
- Clases de la API: `Math`, `Arrays`, `Collections`, `Integer`, `Double`, `Character`, `System.out`.
- La semántica que la materia marca especialmente: división entera, inmutabilidad de `String`,
  `==` contra `equals()`, y las excepciones habituales (`ArithmeticException`,
  `ArrayIndexOutOfBoundsException`, `NullPointerException`, `ClassCastException`).

No soporta clases definidas por el usuario, herencia, interfaces, genéricos propios ni
`try`/`catch`. Los bucles infinitos y la recursión sin caso base se cortan solos con un error
en lugar de colgar la pestaña.

## Tecnologías

- **React 19** con **TypeScript**
- **Vite 8** como bundler
- **Tailwind CSS 4**
- **Vitest** para los tests del intérprete, del banco de preguntas y de los desafíos
- Tipografías **Plus Jakarta Sans** y **JetBrains Mono**, autoalojadas

Sin framework de servidor: el resultado es un sitio estático, lo que mantiene la carga
liviana (~132 KB comprimidos más las fuentes) y permite alojarlo en cualquier hosting de
archivos estáticos. Los desafíos y el intérprete se cargan en un chunk aparte, sólo al entrar
a esa sección.

## Desarrollo

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Otros comandos:

```bash
npm run build     # compila a dist/
npm run preview   # sirve el build de producción
npm run lint      # oxlint
npm test          # corre los tests del intérprete y de los desafíos
```

## Estructura

```
src/
  data/
    units.ts                # las 16 clases de la materia
    questions/
      unit01.ts … unit16.ts # banco de preguntas, una por clase
      index.ts              # agregación y selectores
    challenges.ts           # desafíos de código, con tests y soluciones
    challengeMeta.ts        # sólo la cantidad, para no cargar el banco en el inicio
  lib/
    java/                   # el intérprete
      lexer.ts              # análisis léxico
      parser.ts             # AST por descenso recursivo
      interpreter.ts        # evaluación y trazado paso a paso
      values.ts             # modelo de valores de Java
      runner.ts             # corre el código contra los tests
    quiz.ts                 # armado de sesión, mezclado y corrección
    storage.ts              # progreso, borradores y tema en localStorage
  components/
    HomeView.tsx            # inicio con las cuatro modalidades
    QuizView.tsx            # recorrido de una sesión de preguntas
    QuestionCard.tsx        # render de los tres tipos de pregunta
    ResultsView.tsx         # resultado y repaso de los errores
    ChallengeListView.tsx   # listado de desafíos
    ChallengeView.tsx       # consigna, editor, tests y proceso
    CodeEditor.tsx          # editor con resaltado, sin dependencias
    StepThrough.tsx         # el paso a paso
    CodeBlock.tsx           # visor de código
  types.ts                  # modelo de datos
```

### Sobre el mezclado de opciones

En los archivos del banco, la opción correcta está siempre escrita en la primera posición
para que sea fácil de revisar y mantener. El mezclado ocurre en tiempo de ejecución, en
`lib/quiz.ts`, de modo que el orden de las respuestas cambia en cada sesión.

## Próximos pasos

El modelo de datos de `src/types.ts` está pensado para mapear contra tablas de Supabase
(`units` y `questions`, con `unit_id` como clave foránea). Migrar implica reemplazar la
fuente de `src/data/questions/index.ts` por una consulta remota; el resto de la aplicación
consume el banco a través de los mismos selectores.
