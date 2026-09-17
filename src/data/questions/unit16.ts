import type { Question } from '../../types'

const SOURCE = 'Clase 16 — Manejo de archivos JSON'

export const unit16: Question[] = [
  {
    id: 'u16-q01',
    unitId: 16,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Para poder utilizar JSON en un proyecto es necesario que la aplicación esté escrita en JavaScript.',
    answer: false,
    explanation:
      'Aunque su nombre viene de JavaScript Object Notation, JSON es un formato de intercambio de datos representado en texto e independiente del lenguaje de programación. Es compatible con muchos lenguajes y plataformas.',
    source: SOURCE,
    tags: ['JSON'],
  },
  {
    id: 'u16-q02',
    unitId: 16,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuáles son los dos tipos estructurados con los que trabaja JSON?',
    options: [
      'Objetos, delimitados con llaves, y arreglos, delimitados con corchetes.',
      'Listas y mapas, ambos delimitados con llaves.',
      'Cadenas y números, sin estructuras anidadas.',
      'Registros y tablas, al estilo de una base de datos relacional.',
    ],
    correctIndex: 0,
    explanation:
      'JSON trabaja con objetos y arreglos. Un objeto es una colección no ordenada de cero o más pares de nombre/valor y se escribe entre llaves; un arreglo es una secuencia ordenada de cero o más objetos y se escribe entre corchetes.',
    source: SOURCE,
    tags: ['JSONObject', 'JSONArray'],
  },
  {
    id: 'u16-q03',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué significa deserializar un objeto JSON?',
    options: [
      'Convertir una cadena de texto con la representación JSON en un objeto real de Java.',
      'Convertir un objeto Java en una cadena de texto con su representación JSON.',
      'Eliminar del archivo las propiedades que ya no se utilizan.',
      'Validar que la sintaxis del archivo JSON sea correcta.',
    ],
    correctIndex: 0,
    explanation:
      'El material define serializar como convertir un objeto Java en una cadena de texto con su representación JSON, y deserializar como el camino inverso: convertir esa cadena en un objeto real de Java.',
    source: SOURCE,
    tags: ['Serialización'],
  },
  {
    id: 'u16-q04',
    unitId: 16,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué argumentos necesita el método put() de un JSONObject?',
    options: [
      'Una clave o nombre de tipo String y un valor.',
      'Únicamente un valor, porque la clave se genera automáticamente.',
      'Un índice numérico y un valor.',
      'Dos valores del mismo tipo de dato.',
    ],
    correctIndex: 0,
    explanation:
      'JSONObject cuenta con un método put sobrecargado para todo tipo de datos, que recibe una clave o nombre (String) y un valor. Acepta tipos de datos de Java, objetos JSON y arreglos JSON.',
    source: SOURCE,
    tags: ['JSONObject'],
  },
  {
    id: 'u16-q05',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cómo se accede a un elemento particular de un JSONArray?',
    options: [
      'Mediante un índice, porque sus elementos no se registran con clave-valor.',
      'Mediante la clave asociada al elemento.',
      'Recorriendo el arreglo con un iterador, ya que no admite acceso directo.',
      'Mediante el método getKey() del elemento.',
    ],
    correctIndex: 0,
    explanation:
      'Los elementos de un JSONArray no se registran con clave-valor, así que hace falta un índice para ubicarlos. La clase cuenta además con un método length para conocer su longitud.',
    source: SOURCE,
    tags: ['JSONArray'],
  },
  {
    id: 'u16-q06',
    unitId: 16,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'El método put() de JSONObject puede arrojar una JSONException, por lo que conviene envolverlo en un try-catch.',
    answer: true,
    explanation:
      'El material lo señala expresamente: como el método arroja JSONException, debemos tener todo dentro de un bloque try-catch.',
    source: SOURCE,
    tags: ['JSONObject', 'Excepciones'],
  },
  {
    id: 'u16-q07',
    unitId: 16,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuál de estas librerías menciona el material para serializar y deserializar JSON en Java?',
    options: ['Jackson', 'Hibernate', 'JUnit', 'Log4j'],
    correctIndex: 0,
    explanation:
      'Las librerías que enumera el material son Jackson, GSON, Boon y JSON.org. Todas proporcionan métodos y mapeadores para realizar consultas y crear objetos Java desde JSON.',
    source: SOURCE,
    tags: ['Librerías'],
  },
  {
    id: 'u16-q08',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Según las buenas prácticas del material, ¿qué tipo de comillas corresponde usar en un archivo JSON?',
    options: [
      'Comillas dobles, tanto para los nombres de las propiedades como para los valores de cadena.',
      'Comillas simples, para ahorrar espacio en la transmisión.',
      'Sin comillas, salvo que el valor contenga espacios.',
      'Comillas dobles para las propiedades y simples para los valores.',
    ],
    correctIndex: 0,
    explanation:
      'El material indica usar comillas dobles para los nombres de las propiedades y para los valores de cadena, por ser el estándar aceptado en la mayoría de las bibliotecas JSON.',
    source: SOURCE,
    tags: ['Buenas prácticas'],
  },
  {
    id: 'u16-q09',
    unitId: 16,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué consideración de seguridad plantea el material al trabajar con archivos JSON?',
    options: [
      'Validar el archivo antes de analizarlo, porque un JSON mal formado puede usarse para ataques de inyección de código.',
      'Convertir siempre el archivo a binario antes de leerlo.',
      'Usar exclusivamente la librería JSON.org, que es la única segura.',
      'Evitar los arreglos anidados, porque no pueden validarse.',
    ],
    correctIndex: 0,
    explanation:
      'Entre las consideraciones de seguridad figura validar el archivo antes de analizarlo para detectar contenido malintencionado, no confiar en la fuente del archivo, y encriptarlo si contiene datos confidenciales.',
    source: SOURCE,
    tags: ['Seguridad', 'Buenas prácticas'],
  },
  {
    id: 'u16-q10',
    unitId: 16,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Para trabajar con un archivo JSON desde Java siempre hay que conocer de antemano su estructura, aunque el contenido sea variable.',
    answer: true,
    explanation:
      'Es la consideración que cierra el tema: siempre debemos conocer la estructura de nuestro JSON, no el contenido, que naturalmente será variable. Esto vale tanto para archivos como para servicios web.',
    source: SOURCE,
    tags: ['JSON'],
  },
]
