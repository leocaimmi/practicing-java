# Práctica de Java — Programación II

Aplicación web para practicar los contenidos de **Programación II · Desarrollo en Java**.
Las preguntas se escribieron exclusivamente a partir del material teórico de la cátedra:
las 16 clases teóricas y el *Resumen Integral para Parcial*.

## Qué incluye la v1

- **176 preguntas** repartidas en tres formatos:
  - Verdadero o falso (52)
  - Opción múltiple (95)
  - Análisis de código Java (29)
- Cobertura de las 16 clases, con las clases 3 a 12 marcadas como **alcance del parcial**.
- Tres modalidades de práctica: por clase, práctica mixta y simulacro de parcial.
- Justificación y clase de origen en cada respuesta.
- Progreso y porcentaje de aciertos por clase, guardados en el navegador.
- Tema claro y oscuro, respetando la preferencia del sistema.
- Atajos de teclado: `V` / `F` y `1` a `4` para responder, `Enter` para avanzar.

## Tecnologías

- **React 19** con **TypeScript**
- **Vite 8** como bundler
- **Tailwind CSS 4**

Sin framework de servidor: el resultado es un sitio estático, lo que mantiene la
carga liviana (~106 KB comprimidos) y permite alojarlo en cualquier hosting de
archivos estáticos.

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
```

## Estructura

```
src/
  data/
    units.ts              # las 16 clases de la materia
    questions/
      unit01.ts … unit16.ts   # banco de preguntas, una por clase
      index.ts            # agregación y selectores
  lib/
    quiz.ts               # armado de sesión, mezclado y corrección
    storage.ts            # progreso y tema en localStorage
  components/
    HomeView.tsx          # inicio, modalidades y listado de clases
    QuizView.tsx          # recorrido de una sesión
    QuestionCard.tsx      # render de los tres tipos de pregunta
    ResultsView.tsx       # resultado y repaso de los errores
    CodeBlock.tsx         # resaltado de Java sin dependencias
  types.ts                # modelo de datos
```

### Sobre el mezclado de opciones

En los archivos del banco, la opción correcta está siempre escrita en la primera
posición para que sea fácil de revisar y mantener. El mezclado ocurre en tiempo de
ejecución, en `lib/quiz.ts`, de modo que el orden de las respuestas cambia en cada
sesión.

## Próximos pasos

El modelo de datos de `src/types.ts` está pensado para mapear contra tablas de
Supabase (`units` y `questions`, con `unit_id` como clave foránea). Migrar implica
reemplazar la fuente de `src/data/questions/index.ts` por una consulta remota; el
resto de la aplicación consume el banco a través de los mismos selectores.
