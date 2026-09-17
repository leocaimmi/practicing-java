import type { Unit } from '../types'

/**
 * Unidades de la materia, en el orden en que se dictan.
 * Los títulos replican los del material teórico de la cátedra.
 */
export const units: Unit[] = [
  {
    id: 1,
    name: 'Introducción a Java',
    title: 'Clase 1 — Introducción a Java, variables y operadores',
    summary:
      'La JVM y el bytecode, tipos primitivos, clases wrapper, operadores, alcance de las variables y entrada de datos con Scanner.',
    topics: ['JVM', 'Bytecode', 'Tipos primitivos', 'Wrappers', 'Operadores', 'Scope', 'Scanner'],
    inParcial: false,
  },
  {
    id: 2,
    name: 'Clases y objetos',
    title: 'Clase 2 — Introducción a la POO. Clases y objetos',
    summary:
      'Los cuatro pilares de la POO, UML, relaciones entre objetos, constructores, la palabra this, modificadores de acceso, stack y heap, y la clase Math.',
    topics: ['POO', 'UML', 'Constructores', 'this', 'Modificadores de acceso', 'Heap y Stack', 'Math'],
    inParcial: false,
  },
  {
    id: 3,
    name: 'String y Arrays',
    title: 'Clase 3 — Clase String y Arrays',
    summary:
      'Inmutabilidad de String, métodos de la clase, StringBuilder, y declaración, instanciación y recorrido de arreglos.',
    topics: ['String', 'Inmutabilidad', 'StringBuilder', 'Arrays', 'for each'],
    inParcial: true,
  },
  {
    id: 4,
    name: 'Static y non-static',
    title: 'Clase 4 — Static y Non-Static',
    summary:
      'Métodos y atributos de clase frente a los de instancia, restricciones del contexto estático, constantes y la palabra final.',
    topics: ['static', 'Variables de clase', 'final', 'Constantes'],
    inParcial: true,
  },
  {
    id: 5,
    name: 'Herencia y polimorfismo',
    title: 'Clase 5 — Herencia y Polimorfismo',
    summary:
      'Superclases y subclases, sobrescritura, la palabra super, sustitución y variables polimórficas, casting, instanceof y los dos tipos de polimorfismo.',
    topics: ['Herencia', 'super', 'Sobrescritura', 'Sustitución', 'Casting', 'instanceof', 'Polimorfismo'],
    inParcial: true,
  },
  {
    id: 6,
    name: 'Abstracción',
    title: 'Clase 6 — Encapsulamiento. Clases y métodos abstractos',
    summary:
      'Encapsulamiento con getters y setters, clases abstractas, métodos abstractos y las reglas que rigen a sus subclases.',
    topics: ['Encapsulamiento', 'abstract', 'Métodos abstractos', 'Getters y setters'],
    inParcial: true,
  },
  {
    id: 7,
    name: 'Clase Object',
    title: 'Clase 7 — La clase Object',
    summary:
      'equals, hashCode, toString y getClass, su sobrescritura correcta, referencias polimórficas y uso de instanceof antes del casting.',
    topics: ['Object', 'equals', 'hashCode', 'toString', 'getClass', 'Casting'],
    inParcial: true,
  },
  {
    id: 8,
    name: 'Enum',
    title: 'Clase 8 — La clase Enum',
    summary:
      'Tipos enumerados, sus ventajas, campos, constructores y métodos propios, el método values(), su uso en switch y la comparación con ==.',
    topics: ['enum', 'values()', 'switch', 'Constructores privados'],
    inParcial: true,
  },
  {
    id: 9,
    name: 'Interfaces',
    title: 'Clase 9 — Interfaces. Comparable',
    summary:
      'El concepto de contrato, implements, interfaces contra clases abstractas, herencia múltiple, la interfaz como tipo de dato y Comparable.',
    topics: ['Interfaces', 'implements', 'Contrato', 'Herencia múltiple', 'Comparable', 'compareTo'],
    inParcial: true,
  },
  {
    id: 10,
    name: 'List y Queue',
    title: 'Clase 10 — Colecciones. List y Queue. Comparable',
    summary:
      'La API Collection, la interfaz List, ArrayList y LinkedList, formas de iterar, y el comportamiento FIFO y LIFO de Queue y Deque.',
    topics: ['Collection', 'List', 'ArrayList', 'LinkedList', 'Queue', 'Deque', 'Iterator'],
    inParcial: true,
  },
  {
    id: 11,
    name: 'Set',
    title: 'Clase 11 — Colecciones de tipo Set',
    summary:
      'Conjuntos de elementos únicos, el papel de equals y hashCode, y las diferencias entre HashSet, LinkedHashSet y TreeSet.',
    topics: ['Set', 'HashSet', 'LinkedHashSet', 'TreeSet', 'equals', 'hashCode'],
    inParcial: true,
  },
  {
    id: 12,
    name: 'Map',
    title: 'Clase 12 — Colecciones de tipo Map',
    summary:
      'La estructura clave-valor, por qué Map no hereda de Collection, sus métodos, formas de recorrerlo, y HashMap, LinkedHashMap y TreeMap.',
    topics: ['Map', 'HashMap', 'LinkedHashMap', 'TreeMap', 'entrySet', 'keySet'],
    inParcial: true,
  },
  {
    id: 13,
    name: 'Excepciones',
    title: 'Clase 13 — Manejo de errores. Excepciones',
    summary:
      'La jerarquía Throwable, excepciones checked y unchecked, try-catch-finally, throw y throws, propagación, excepciones propias y buenas prácticas.',
    topics: ['Excepciones', 'checked', 'unchecked', 'try-catch', 'throw', 'throws', 'finally'],
    inParcial: false,
  },
  {
    id: 14,
    name: 'Genericidad',
    title: 'Clase 14 — Genericidad',
    summary:
      'Parámetros de tipo, clases, métodos e interfaces genéricas, sus restricciones, tipos acotados con extends y comodines.',
    topics: ['Genéricos', 'Parámetros de tipo', 'Tipos acotados', 'Comodines', 'extends', 'super'],
    inParcial: false,
  },
  {
    id: 15,
    name: 'Archivos de texto',
    title: 'Clase 15 — Manejo de archivos de texto',
    summary:
      'Archivos de texto frente a binarios, el ciclo de abrir, operar y cerrar, y las clases File, FileWriter, PrintWriter, FileReader y BufferedReader.',
    topics: ['File', 'FileWriter', 'PrintWriter', 'BufferedReader', 'Buffer'],
    inParcial: false,
  },
  {
    id: 16,
    name: 'JSON',
    title: 'Clase 16 — Manejo de archivos JSON',
    summary:
      'El formato JSON, serialización y deserialización, librerías disponibles, JSONObject y JSONArray, y buenas prácticas.',
    topics: ['JSON', 'JSONObject', 'JSONArray', 'Serialización', 'Buenas prácticas'],
    inParcial: false,
  },
]

export const unitById = new Map(units.map((unit) => [unit.id, unit]))
