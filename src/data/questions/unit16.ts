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
  {
    id: 'u16-q11',
    unitId: 16,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué significa la sigla JSON?',
    options: [
      'JavaScript Object Notation',
      'Java Standard Object Network',
      'Java Serialized Object Notation',
      'JavaScript Ordered Nodes',
    ],
    correctIndex: 0,
    explanation:
      'Es el acrónimo de JavaScript Object Notation. Pese al nombre, es un formato de intercambio representado en texto e independiente del lenguaje de programación.',
    source: SOURCE,
    tags: ['JSON'],
  },
  {
    id: 'u16-q12',
    unitId: 16,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Un arreglo JSON es una secuencia ordenada de cero o más objetos.',
    answer: true,
    explanation:
      'Ésa es la definición del material, y contrasta con la del objeto JSON: una colección NO ordenada de cero o más pares de nombre y valor.',
    source: SOURCE,
    tags: ['JSONArray', 'JSONObject'],
  },
  {
    id: 'u16-q13',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cómo se obtiene el valor asociado a una clave de un JSONObject?',
    options: [
      'Con un método GET seguido del tipo de dato, pasándole la clave por parámetro.',
      'Con un índice numérico, igual que en un arreglo.',
      'Con el método length().',
      'Recorriendo el objeto entero con un iterador, porque no hay acceso directo.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo describe así: JSONObject cuenta con un método GET+TipoDeDato para obtener el valor de una clave enviada como parámetro. El acceso por índice corresponde al JSONArray, cuyos elementos no se registran con clave-valor.',
    source: SOURCE,
    tags: ['JSONObject'],
  },
  {
    id: 'u16-q14',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué método de JSONArray devuelve la cantidad de elementos que contiene?',
    options: ['length', 'size', 'count', 'length()'],
    correctIndex: 0,
    explanation:
      'El material lo enumera entre las características del JSONArray: cuenta con un método LENGTH para conocer su longitud, además de PUT para agregar elementos y GET para acceder a uno en particular.',
    source: SOURCE,
    tags: ['JSONArray'],
  },
  {
    id: 'u16-q15',
    unitId: 16,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué caracteres delimitan un objeto JSON y cuáles un arreglo JSON?',
    options: [
      'Llaves { } para el objeto y corchetes [ ] para el arreglo.',
      'Corchetes [ ] para el objeto y llaves { } para el arreglo.',
      'Paréntesis ( ) para los dos.',
      'Comillas dobles para el objeto y llaves para el arreglo.',
    ],
    correctIndex: 0,
    explanation:
      'El material los presenta con esa notación: JSONObject - { } y JSONArray - [ ]. En los ejemplos con estructuras anidadas usa justamente esa diferencia para distinguir qué es cada cosa.',
    source: SOURCE,
    tags: ['JSONObject', 'JSONArray'],
  },
  {
    id: 'u16-q16',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué significa serializar un objeto?',
    options: [
      'Convertir un objeto Java en una cadena de texto con su representación JSON.',
      'Convertir una cadena JSON en un objeto real de Java.',
      'Guardar el objeto en una base de datos relacional.',
      'Ordenar los atributos del objeto alfabéticamente.',
    ],
    correctIndex: 0,
    explanation:
      'Serializar es convertir el objeto Java en texto JSON, y deserializar es el camino inverso. Las librerías que menciona el material (Jackson, GSON, Boon, JSON.org) proveen métodos y mapeadores para ambas operaciones.',
    source: SOURCE,
    tags: ['Serialización'],
  },
  {
    id: 'u16-q17',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál de estas NO es una ventaja de JSON que mencione el material?',
    options: [
      'Que sólo pueda ser leído por aplicaciones escritas en Java.',
      'Su ligereza, ideal para aplicaciones web y móviles.',
      'Su flexibilidad, ya que admite arrays y objetos anidados.',
      'Que sea fácil de leer y escribir por su sintaxis simple.',
    ],
    correctIndex: 0,
    explanation:
      'Es exactamente lo contrario: entre sus ventajas está ser independiente del lenguaje, compatible con muchos lenguajes y plataformas, lo que lo vuelve ideal para comunicar sistemas distintos. Además es gratis, libre y documentado.',
    source: SOURCE,
    tags: ['JSON'],
  },
  {
    id: 'u16-q18',
    unitId: 16,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Sobre los nombres de las propiedades, ¿qué recomienda el material?',
    options: [
      'Que sean descriptivos y consistentes, preferentemente en minúsculas y separados por guiones bajos.',
      'Que sean lo más cortos posible, para reducir el tamaño del archivo.',
      'Que usen lowerCamelCase, igual que las variables de Java.',
      'Que empiecen siempre con mayúscula, como los nombres de clase.',
    ],
    correctIndex: 0,
    explanation:
      'Está entre los estándares de codificación y convenciones de nomenclatura que enumera el material, junto con usar indentación para estructurar el archivo y comillas dobles para propiedades y valores de cadena.',
    source: SOURCE,
    tags: ['Buenas prácticas'],
  },
  {
    id: 'u16-q19',
    unitId: 16,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `JSONObject persona = new JSONObject();
persona.put("nombre", "Ana");
persona.put("edad", 30);
System.out.println(persona.get("nombre"));`,
    options: [
      'Ana',
      'nombre',
      '{"nombre":"Ana","edad":30}',
      'No compila: put() sólo acepta valores de tipo String.',
    ],
    correctIndex: 0,
    explanation:
      'put() recibe una clave de tipo String y un valor, y está sobrecargado para todo tipo de datos: por eso admite tanto el texto "Ana" como el número 30. El método GET devuelve el valor asociado a la clave que se le pasa.',
    source: SOURCE,
    tags: ['JSONObject'],
  },
  {
    id: 'u16-q20',
    unitId: 16,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `JSONArray notas = new JSONArray();
notas.put(8);
notas.put(10);
notas.put(7);
System.out.println(notas.length());`,
    options: ['3', '25', '0', 'No compila: JSONArray no tiene método length().'],
    correctIndex: 0,
    explanation:
      'JSONArray cuenta con un método PUT para ingresar elementos y uno LENGTH para conocer su longitud. Después de tres inserciones, la longitud es 3. Los elementos se separan por coma de manera automática.',
    source: SOURCE,
    tags: ['JSONArray'],
  },
  {
    id: 'u16-q21',
    unitId: 16,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué estructura JSON produce?',
    code: `JSONArray materias = new JSONArray();
materias.put("Programacion II");

JSONObject alumno = new JSONObject();
alumno.put("nombre", "Ana");
alumno.put("materias", materias);`,
    options: [
      'Un objeto entre llaves, con una clave cuyo valor es un arreglo entre corchetes.',
      'Un arreglo entre corchetes que contiene dos objetos.',
      'Dos objetos independientes, sin relación entre sí.',
      'No compila: put() no acepta un JSONArray como valor.',
    ],
    correctIndex: 0,
    explanation:
      'El método put de JSONObject acepta tipos de datos de Java, objetos JSON y arreglos JSON, así que se pueden anidar. El resultado usa llaves para el objeto y corchetes para el arreglo, tal como muestran los ejemplos del material.',
    source: SOURCE,
    tags: ['JSONObject', 'JSONArray'],
  },
]
