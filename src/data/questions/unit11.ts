import type { Question } from '../../types'

const SOURCE = 'Clase 11 — Colecciones de tipo Set'

export const unit11: Question[] = [
  {
    id: 'u11-q01',
    unitId: 11,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Un Set permite acceder a sus elementos por índice, igual que una List.',
    answer: false,
    explanation:
      'No se puede acceder a los elementos de un Set por índice: el acceso es mediante iteración. Ésa es una de las diferencias que lo separa de List, junto con la prohibición de duplicados.',
    source: SOURCE,
    tags: ['Set'],
  },
  {
    id: 'u11-q02',
    unitId: 11,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime por consola?',
    code: `Set<String> equipos = new HashSet<>();
equipos.add("River");
equipos.add("Boca");
equipos.add("River");
System.out.println(equipos.size());`,
    options: ['2', '3', '1', 'Lanza una excepción al agregar el elemento repetido.'],
    correctIndex: 0,
    explanation:
      'Si el objeto a agregar tiene el mismo equals y el mismo hashCode que uno que ya está en el conjunto, no se lanza ninguna excepción, pero el elemento no se agrega. Por eso el tamaño final es 2.',
    source: SOURCE,
    tags: ['Set', 'HashSet'],
  },
  {
    id: 'u11-q03',
    unitId: 11,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué es crucial implementar correctamente equals() y hashCode() en los objetos que se agregan a un Set?',
    options: [
      'Porque las implementaciones de Set los usan para detectar duplicados y para ubicar los objetos dentro de la tabla hash.',
      'Porque sin ellos el Set no puede recorrerse con un iterador.',
      'Porque de lo contrario el Set no puede crecer más allá de su capacidad inicial.',
      'Porque son los métodos que definen el orden de iteración del conjunto.',
    ],
    correctIndex: 0,
    explanation:
      'equals() determina si dos objetos son iguales y se usa para asegurar que no se añadan duplicados; hashCode() proporciona el código hash que las implementaciones basadas en hash usan para almacenar y recuperar rápidamente los objetos. Si dos objetos son iguales según equals, deben tener el mismo hashCode.',
    source: SOURCE,
    tags: ['Set', 'equals', 'hashCode'],
  },
  {
    id: 'u11-q04',
    unitId: 11,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué distingue a LinkedHashSet de HashSet?',
    options: [
      'Gestiona la tabla hash con una lista doblemente enlazada, de modo que los elementos conservan el orden de inserción.',
      'Ordena los elementos según su valor natural, como haría un árbol.',
      'Admite elementos duplicados, a diferencia de HashSet.',
      'Permite el acceso por índice numérico.',
    ],
    correctIndex: 0,
    explanation:
      'LinkedHashSet es similar a HashSet, pero la tabla de dispersión se maneja con una lista doblemente enlazada. Esos enlaces definen el orden en que se insertaron los elementos, así que el orden de iteración es el mismo orden de inserción.',
    source: SOURCE,
    tags: ['LinkedHashSet', 'HashSet'],
  },
  {
    id: 'u11-q05',
    unitId: 11,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a un TreeSet?',
    options: [
      'Almacena los elementos en un árbol, ordenándolos según sus valores, con un costo logarítmico O(log n) en las operaciones básicas.',
      'Almacena los elementos en una tabla hash con costo constante y sin orden garantizado.',
      'Conserva el orden de inserción mediante una lista doblemente enlazada.',
      'Es la implementación más rápida de Set para inserción y búsqueda.',
    ],
    correctIndex: 0,
    explanation:
      'El TreeSet usa un árbol y ordena los elementos en función de sus valores. Es bastante más lento que HashSet, con un costo O(log n), pero es útil cuando se necesita un ordenamiento constante de los elementos.',
    source: SOURCE,
    tags: ['TreeSet'],
  },
  {
    id: 'u11-q06',
    unitId: 11,
    type: 'vf',
    difficulty: 'avanzado',
    prompt:
      'Para guardar objetos de una clase propia en un TreeSet, esa clase debe implementar la interfaz Comparable.',
    answer: true,
    explanation:
      'Los elementos de clases propias del sistema, como String, se ordenan según su orden natural. A las clases creadas por el programador hay que implementarles Comparable para que el TreeSet pueda ordenarlas.',
    source: SOURCE,
    tags: ['TreeSet', 'Comparable'],
  },
  {
    id: 'u11-q07',
    unitId: 11,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Un Set puede contener a lo sumo un elemento null.',
    answer: true,
    explanation:
      'Así lo establece el material al describir el comportamiento del método add: un conjunto podrá contener a lo sumo un elemento null, por la misma regla de unicidad que rige al resto de los elementos.',
    source: SOURCE,
    tags: ['Set'],
  },
  {
    id: 'u11-q08',
    unitId: 11,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuándo se consideran iguales dos conjuntos?',
    options: [
      'Cuando contienen exactamente los mismos elementos, sin importar el orden.',
      'Cuando contienen los mismos elementos y además en el mismo orden.',
      'Cuando tienen el mismo tamaño, aunque los elementos difieran.',
      'Cuando fueron creados a partir de la misma implementación de Set.',
    ],
    correctIndex: 0,
    explanation:
      'Dos conjuntos se consideran iguales si contienen exactamente los mismos elementos, independientemente del orden. Esto los diferencia de las listas, donde el orden también importa.',
    source: SOURCE,
    tags: ['Set', 'equals'],
  },
  {
    id: 'u11-q09',
    unitId: 11,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Por qué la iteración sobre un HashSet resulta más costosa que sobre un LinkedHashSet?',
    options: [
      'Porque el HashSet debe recorrer todas las entradas de la tabla de dispersión, mientras que el LinkedHashSet sigue los enlaces entre los elementos insertados.',
      'Porque el HashSet reordena los elementos en cada recorrido.',
      'Porque el HashSet recalcula el hashCode de cada elemento al iterar.',
      'Porque el LinkedHashSet mantiene los elementos en memoria contigua.',
    ],
    correctIndex: 0,
    explanation:
      'En el HashSet el costo de iterar depende tanto de la cantidad de elementos como del número de entradas de la tabla. En el LinkedHashSet, al haber enlaces entre los elementos, el costo sólo depende de la cantidad de elementos insertados.',
    source: SOURCE,
    tags: ['HashSet', 'LinkedHashSet'],
  },
  {
    id: 'u11-q10',
    unitId: 11,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: 'En un TreeSet con los valores del 1 al 10, ¿qué devuelve ts.higher(5)?',
    options: ['6', '4', '5', 'null'],
    correctIndex: 0,
    explanation:
      'higher(o) devuelve el elemento menor de la colección que sea mayor que el elemento dado, es decir 6. El método lower() hace lo inverso: devuelve el mayor de los que son menores, que en este caso sería 4.',
    source: SOURCE,
    tags: ['TreeSet'],
  },
  {
    id: 'u11-q11',
    unitId: 11,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `Set<String> s = new HashSet<>();
System.out.println(s.add("uno"));
System.out.println(s.add("uno"));`,
    options: [
      'true y luego false',
      'true y luego true',
      'false y luego false',
      'true y luego lanza una excepción',
    ],
    correctIndex: 0,
    explanation:
      'El método add de Collection retorna si agregó o no. El material recomienda analizarlo justamente en los Set: devuelve true si el elemento no estaba y fue añadido, y false si ya se encontraba dentro del conjunto.',
    source: SOURCE,
    tags: ['Set', 'HashSet'],
  },
  {
    id: 'u11-q12',
    unitId: 11,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `Set<String> s = new LinkedHashSet<>();
s.add("zeta");
s.add("alfa");
s.add("beta");
System.out.println(s);`,
    options: [
      '[zeta, alfa, beta]',
      '[alfa, beta, zeta]',
      '[beta, alfa, zeta]',
      'Un orden impredecible, distinto en cada ejecución.',
    ],
    correctIndex: 0,
    explanation:
      'El LinkedHashSet gestiona la tabla hash con una lista doblemente enlazada, y esos enlaces definen el orden en que se insertaron los elementos. El orden de iteración es entonces el de inserción, no el alfabético: eso lo daría un TreeSet.',
    source: SOURCE,
    tags: ['LinkedHashSet'],
  },
  {
    id: 'u11-q13',
    unitId: 11,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `Set<String> s = new TreeSet<>();
s.add("pera");
s.add("banana");
s.add("manzana");
System.out.println(s);`,
    options: [
      '[banana, manzana, pera]',
      '[pera, banana, manzana]',
      '[manzana, banana, pera]',
      'Un orden impredecible.',
    ],
    correctIndex: 0,
    explanation:
      'El TreeSet almacena en un árbol y ordena en función de los valores. Como String es una clase propia del sistema, se aplica su orden natural, que es el alfabético.',
    source: SOURCE,
    tags: ['TreeSet'],
  },
  {
    id: 'u11-q14',
    unitId: 11,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Cómo implementa internamente sus funcionalidades la clase HashSet?',
    options: [
      'Delegando casi todo en un mapa interno, un HashMap.',
      'Manteniendo un ArrayList ordenado por hashCode.',
      'Con un árbol binario balanceado.',
      'Con una lista doblemente enlazada de nodos.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo indica expresamente: la clase HashSet delega casi todas sus funcionalidades a un mapa interno (HashMap). Al llamar al constructor, internamente lo que hace es crear ese HashMap.',
    source: SOURCE,
    tags: ['HashSet'],
  },
  {
    id: 'u11-q15',
    unitId: 11,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Cuál es el costo de las operaciones básicas en un HashSet?',
    options: [
      'Constante, siempre que la función hash disperse bien los elementos.',
      'Logarítmico con la cantidad de elementos.',
      'Lineal con la cantidad de elementos.',
      'Depende del orden en que se hayan insertado.',
    ],
    correctIndex: 0,
    explanation:
      'La tabla hash lo hace más eficiente que las clases que implementan List: proporciona tiempos constantes en inserción, borrado y búsqueda, siempre que la función hash disperse correctamente los elementos dentro de la tabla.',
    source: SOURCE,
    tags: ['HashSet'],
  },
  {
    id: 'u11-q16',
    unitId: 11,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué hace el método pollFirst() de un TreeSet?',
    options: [
      'Elimina el primer elemento de la colección y lo devuelve, o null si está vacía.',
      'Devuelve el primer elemento sin eliminarlo.',
      'Devuelve el menor elemento que sea mayor al indicado.',
      'Ordena la colección y devuelve el resultado.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo enumera junto con pollLast(), que hace lo propio con el último. Los que consultan sin eliminar en función de otro elemento son higher() y lower().',
    source: SOURCE,
    tags: ['TreeSet'],
  },
  {
    id: 'u11-q17',
    unitId: 11,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Se necesita una colección sin duplicados donde importe el orden de llegada de los elementos. ¿Cuál corresponde?',
    options: ['LinkedHashSet', 'HashSet', 'TreeSet', 'ArrayList'],
    correctIndex: 0,
    explanation:
      'Según la matriz de decisión del material, el LinkedHashSet garantiza la unicidad y además respeta la secuencia de inserción. El HashSet no garantiza orden y el TreeSet ordena por valor natural, no por llegada.',
    source: SOURCE,
    tags: ['LinkedHashSet', 'Decisión'],
  },
  {
    id: 'u11-q18',
    unitId: 11,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'La interfaz Set agrega métodos propios además de los que hereda de Collection.',
    answer: false,
    explanation:
      'Set hereda todos los métodos de Collection (add, remove, contains, size, etc.) y no introduce métodos específicos. Su diferencia está en cómo maneja la adición de elementos y en la garantía de unicidad.',
    source: SOURCE,
    tags: ['Set', 'Collection'],
  },
]
