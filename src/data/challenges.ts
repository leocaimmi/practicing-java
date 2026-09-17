import type { Difficulty } from '../types'
import type { ChallengeSpec } from '../lib/java/runner'

export interface Challenge {
  id: string
  title: string
  /** Clase de la materia con la que se relaciona. */
  unitId: number
  difficulty: Difficulty
  /** Consigna. Cada string es un párrafo. */
  statement: string[]
  /** Pistas que el estudiante puede abrir si se traba. */
  hints: string[]
  starterCode: string
  /** Solución de referencia, disponible después de resolver o de rendirse. */
  solution: string
  spec: ChallengeSpec
}

export const challenges: Challenge[] = [
  {
    id: 'suma-arreglo',
    title: 'Sumar los elementos de un arreglo',
    unitId: 3,
    difficulty: 'basico',
    statement: [
      'Escribí un método que reciba un arreglo de enteros y devuelva la suma de todos sus elementos.',
      'Si el arreglo está vacío, la suma es 0.',
    ],
    hints: [
      'Necesitás una variable acumuladora inicializada en 0 antes del ciclo.',
      'El for each de la clase 3 se escribe: for (int n : nums) { ... }',
    ],
    starterCode: `public static int sumar(int[] nums) {
    // Recorré el arreglo y acumulá la suma
    return 0;
}`,
    solution: `public static int sumar(int[] nums) {
    int total = 0;
    for (int n : nums) {
        total += n;
    }
    return total;
}`,
    spec: {
      methodName: 'sumar',
      argHints: ['int[]'],
      returnHint: 'int',
      tests: [
        { args: [[1, 2, 3, 4]], expected: 10 },
        { args: [[5]], expected: 5 },
        { args: [[]], expected: 0 },
        { args: [[-3, 3, -7]], expected: -7, hidden: true },
        { args: [[10, 20, 30, 40, 50]], expected: 150, hidden: true },
      ],
    },
  },

  {
    id: 'fibonacci',
    title: 'Serie de Fibonacci',
    unitId: 1,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que devuelva el término n de la serie de Fibonacci, donde cada término es la suma de los dos anteriores.',
      'La serie arranca en 0: fibonacci(0) es 0, fibonacci(1) es 1, fibonacci(2) es 1, fibonacci(3) es 2, y así.',
      'Podés resolverlo con un ciclo o con recursión. Si vas por la recursión, acordate de definir el caso base.',
    ],
    hints: [
      'Con un ciclo: guardá los dos últimos valores en dos variables y andá corriéndolos en cada vuelta.',
      'Con recursión: el caso base es n <= 1, donde el resultado es el propio n.',
      'Cuidado con la recursión sin caso base: se corta sola con un error de llamadas anidadas.',
    ],
    starterCode: `public static int fibonacci(int n) {
    // Devolvé el termino n de la serie
    return 0;
}`,
    solution: `public static int fibonacci(int n) {
    int a = 0;
    int b = 1;
    for (int i = 0; i < n; i++) {
        int siguiente = a + b;
        a = b;
        b = siguiente;
    }
    return a;
}`,
    spec: {
      methodName: 'fibonacci',
      argHints: ['int'],
      returnHint: 'int',
      tests: [
        { args: [0], expected: 0 },
        { args: [1], expected: 1 },
        { args: [7], expected: 13 },
        { args: [10], expected: 55, hidden: true },
        { args: [20], expected: 6765, hidden: true },
      ],
    },
  },

  {
    id: 'invertir-cadena',
    title: 'Invertir una cadena',
    unitId: 3,
    difficulty: 'basico',
    statement: [
      'Escribí un método que reciba un String y devuelva la cadena invertida.',
      'Por ejemplo, con "hola" tiene que devolver "aloh".',
      'Acordate de que los String son inmutables: no podés modificar la cadena original, tenés que construir una nueva.',
    ],
    hints: [
      'StringBuilder es justamente la clase pensada para armar cadenas sin crear una instancia nueva por cada paso.',
      'Podés recorrer la cadena de atrás para adelante con charAt(), o usar el método reverse() del StringBuilder.',
    ],
    starterCode: `public static String invertir(String texto) {
    // Devolvé el texto al reves
    return "";
}`,
    solution: `public static String invertir(String texto) {
    StringBuilder sb = new StringBuilder();
    for (int i = texto.length() - 1; i >= 0; i--) {
        sb.append(texto.charAt(i));
    }
    return sb.toString();
}`,
    spec: {
      methodName: 'invertir',
      argHints: ['String'],
      returnHint: 'String',
      tests: [
        { args: ['hola'], expected: 'aloh' },
        { args: ['Java'], expected: 'avaJ' },
        { args: [''], expected: '' },
        { args: ['a'], expected: 'a', hidden: true },
        { args: ['programacion'], expected: 'noicamargorp', hidden: true },
      ],
    },
  },

  {
    id: 'contar-vocales',
    title: 'Contar vocales',
    unitId: 3,
    difficulty: 'basico',
    statement: [
      'Escribí un método que reciba un String y devuelva cuántas vocales tiene.',
      'Se cuentan tanto las minúsculas como las mayúsculas. No hace falta contemplar acentos.',
    ],
    hints: [
      'Pasá la cadena a minúsculas una sola vez, antes del ciclo, y comparás contra un solo juego de vocales.',
      'El método indexOf() de String devuelve -1 cuando no encuentra el carácter: sirve para preguntar si está.',
    ],
    starterCode: `public static int contarVocales(String texto) {
    // Contá cuantas vocales tiene el texto
    return 0;
}`,
    solution: `public static int contarVocales(String texto) {
    String minusculas = texto.toLowerCase();
    int total = 0;
    for (int i = 0; i < minusculas.length(); i++) {
        char c = minusculas.charAt(i);
        if ("aeiou".indexOf(c) >= 0) {
            total++;
        }
    }
    return total;
}`,
    spec: {
      methodName: 'contarVocales',
      argHints: ['String'],
      returnHint: 'int',
      tests: [
        { args: ['programacion'], expected: 5 },
        { args: ['JAVA'], expected: 2 },
        { args: ['xyz'], expected: 0 },
        { args: [''], expected: 0, hidden: true },
        { args: ['Aeiou Murcielago'], expected: 10, hidden: true },
      ],
    },
  },

  {
    id: 'ordenar-arreglo',
    title: 'Ordenar un arreglo',
    unitId: 3,
    difficulty: 'basico',
    statement: [
      'Escribí un método que reciba un arreglo de enteros, lo ordene de menor a mayor y devuelva su representación como texto.',
      'El formato esperado es el de Arrays.toString(): los elementos entre corchetes y separados por coma y espacio, por ejemplo "[1, 2, 4, 5]".',
    ],
    hints: [
      'La clase Arrays tiene los dos métodos que necesitás: sort() para ordenar y toString() para formatear.',
      'Arrays.sort() modifica el arreglo en el lugar, no devuelve uno nuevo.',
    ],
    starterCode: `public static String ordenar(int[] nums) {
    // Ordená el arreglo y devolvelo como texto
    return "";
}`,
    solution: `public static String ordenar(int[] nums) {
    Arrays.sort(nums);
    return Arrays.toString(nums);
}`,
    spec: {
      methodName: 'ordenar',
      argHints: ['int[]'],
      returnHint: 'String',
      tests: [
        { args: [[5, 1, 4, 2]], expected: '[1, 2, 4, 5]' },
        { args: [[3]], expected: '[3]' },
        { args: [[9, 8, 7, 6]], expected: '[6, 7, 8, 9]' },
        { args: [[]], expected: '[]', hidden: true },
        { args: [[0, -5, 12, -1]], expected: '[-5, -1, 0, 12]', hidden: true },
      ],
    },
  },

  {
    id: 'mayor-de-lista',
    title: 'El mayor de una lista',
    unitId: 10,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que reciba una List de enteros y devuelva el mayor de todos.',
      'Si la lista está vacía, devolvé 0.',
      'Resolvelo recorriendo la lista, sin usar Collections.max().',
    ],
    hints: [
      'El for each también sirve para recorrer una List: for (int n : numeros) { ... }',
      'Arrancá tomando el primer elemento como máximo provisorio, o usá Integer.MIN_VALUE.',
      'Acordate de preguntar antes si la lista está vacía con isEmpty().',
    ],
    starterCode: `public static int mayor(List<Integer> numeros) {
    // Devolvé el elemento mas grande de la lista
    return 0;
}`,
    solution: `public static int mayor(List<Integer> numeros) {
    if (numeros.isEmpty()) {
        return 0;
    }
    int maximo = numeros.get(0);
    for (int n : numeros) {
        if (n > maximo) {
            maximo = n;
        }
    }
    return maximo;
}`,
    spec: {
      methodName: 'mayor',
      argHints: ['List<Integer>'],
      returnHint: 'int',
      tests: [
        { args: [[3, 9, 2]], expected: 9 },
        { args: [[7]], expected: 7 },
        { args: [[]], expected: 0 },
        { args: [[-4, -9, -1]], expected: -1, hidden: true },
        { args: [[5, 5, 5]], expected: 5, hidden: true },
      ],
    },
  },

  {
    id: 'sin-duplicados',
    title: 'Eliminar duplicados',
    unitId: 11,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que reciba un arreglo de enteros y devuelva cuántos valores distintos contiene.',
      'Por ejemplo, con {1, 2, 2, 3, 1} hay 3 valores distintos.',
      'Es el caso de uso natural de la interfaz Set, que vimos en la clase 11.',
    ],
    hints: [
      'Un Set no admite duplicados: si agregás dos veces el mismo valor, queda uno solo.',
      'HashSet alcanza, porque acá no importa el orden.',
      'Después de cargar el conjunto, size() te da la respuesta.',
    ],
    starterCode: `public static int contarDistintos(int[] nums) {
    // Devolvé cuantos valores distintos hay
    return 0;
}`,
    solution: `public static int contarDistintos(int[] nums) {
    Set<Integer> vistos = new HashSet<>();
    for (int n : nums) {
        vistos.add(n);
    }
    return vistos.size();
}`,
    spec: {
      methodName: 'contarDistintos',
      argHints: ['int[]'],
      returnHint: 'int',
      tests: [
        { args: [[1, 2, 2, 3, 1]], expected: 3 },
        { args: [[4, 4, 4]], expected: 1 },
        { args: [[]], expected: 0 },
        { args: [[1, 2, 3, 4, 5]], expected: 5, hidden: true },
        { args: [[-1, -1, 0, 0, 7]], expected: 3, hidden: true },
      ],
    },
  },

  {
    id: 'palindromo',
    title: '¿Es palíndromo?',
    unitId: 3,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que indique si una palabra es un palíndromo, es decir si se lee igual al derecho y al revés.',
      'La comparación no distingue mayúsculas de minúsculas: "Neuquen" se considera palíndromo.',
      'No hace falta contemplar espacios ni acentos.',
    ],
    hints: [
      'Podés armar la cadena invertida y compararla con la original.',
      'Para comparar el contenido de dos String se usa equals(), nunca ==.',
      'equalsIgnoreCase() te ahorra tener que pasar todo a minúsculas.',
    ],
    starterCode: `public static boolean esPalindromo(String palabra) {
    // Devolvé true si se lee igual en los dos sentidos
    return false;
}`,
    solution: `public static boolean esPalindromo(String palabra) {
    StringBuilder sb = new StringBuilder(palabra);
    sb.reverse();
    return palabra.equalsIgnoreCase(sb.toString());
}`,
    spec: {
      methodName: 'esPalindromo',
      argHints: ['String'],
      returnHint: 'boolean',
      tests: [
        { args: ['neuquen'], expected: true },
        { args: ['Neuquen'], expected: true },
        { args: ['java'], expected: false },
        { args: ['a'], expected: true, hidden: true },
        { args: ['reconocer'], expected: true, hidden: true },
        { args: ['programacion'], expected: false, hidden: true },
      ],
    },
  },

  {
    id: 'contar-repetidos',
    title: 'Contar apariciones con un Map',
    unitId: 12,
    difficulty: 'avanzado',
    statement: [
      'Escribí un método que reciba un arreglo de palabras y devuelva cuántas veces aparece la palabra más repetida.',
      'Por ejemplo, con {"a", "b", "a"} el resultado es 2, porque "a" aparece dos veces.',
      'Si el arreglo está vacío, devolvé 0.',
    ],
    hints: [
      'Un Map asocia cada palabra con su cantidad de apariciones.',
      'getOrDefault(clave, 0) te devuelve 0 cuando la clave todavía no está, y te evita el if.',
      'Después de contar, recorré los valores del mapa con values() para quedarte con el máximo.',
    ],
    starterCode: `public static int maximaRepeticion(String[] palabras) {
    // Contá las apariciones y devolvé la mayor
    return 0;
}`,
    solution: `public static int maximaRepeticion(String[] palabras) {
    Map<String, Integer> conteo = new HashMap<>();
    for (String palabra : palabras) {
        conteo.put(palabra, conteo.getOrDefault(palabra, 0) + 1);
    }
    int maximo = 0;
    for (int cantidad : conteo.values()) {
        if (cantidad > maximo) {
            maximo = cantidad;
        }
    }
    return maximo;
}`,
    spec: {
      methodName: 'maximaRepeticion',
      argHints: ['String[]'],
      returnHint: 'int',
      tests: [
        { args: [['a', 'b', 'a']], expected: 2 },
        { args: [['x']], expected: 1 },
        { args: [[]], expected: 0 },
        { args: [['p', 'p', 'p', 'q']], expected: 3, hidden: true },
        { args: [['uno', 'dos', 'tres']], expected: 1, hidden: true },
      ],
    },
  },

  {
    id: 'ordenar-nombres',
    title: 'Ordenar nombres alfabéticamente',
    unitId: 10,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que reciba una List de nombres, la ordene alfabéticamente y la devuelva como texto.',
      'El formato esperado es el que produce toString() de una lista: "[Ana, Juan, Pedro]".',
      'Los String ya implementan Comparable, así que tienen orden natural.',
    ],
    hints: [
      'Collections.sort() ordena la lista en el lugar usando el orden natural de sus elementos.',
      'toString() de la lista ya te da el formato con corchetes.',
    ],
    starterCode: `public static String ordenarNombres(List<String> nombres) {
    // Ordená la lista y devolvela como texto
    return "";
}`,
    solution: `public static String ordenarNombres(List<String> nombres) {
    Collections.sort(nombres);
    return nombres.toString();
}`,
    spec: {
      methodName: 'ordenarNombres',
      argHints: ['List<String>'],
      returnHint: 'String',
      tests: [
        { args: [['Pedro', 'Ana', 'Juan']], expected: '[Ana, Juan, Pedro]' },
        { args: [['Zoe']], expected: '[Zoe]' },
        { args: [[]], expected: '[]' },
        {
          args: [['delta', 'alfa', 'charlie', 'bravo']],
          expected: '[alfa, bravo, charlie, delta]',
          hidden: true,
        },
      ],
    },
  },

  {
    id: 'promedio',
    title: 'Promedio sin perder los decimales',
    unitId: 1,
    difficulty: 'avanzado',
    statement: [
      'Escribí un método que reciba un arreglo de enteros y devuelva su promedio como double.',
      'Ojo con la división entre enteros: si dividís dos int, Java descarta los decimales. El promedio de {1, 2} tiene que dar 1.5 y no 1.',
      'Si el arreglo está vacío, devolvé 0.',
    ],
    hints: [
      'Acumular la suma en un int está bien; el problema aparece recién al dividir.',
      'Si alguno de los dos operandos es double, el resultado es double. Podés castear: (double) suma / nums.length',
    ],
    starterCode: `public static double promedio(int[] nums) {
    // Devolvé el promedio conservando los decimales
    return 0;
}`,
    solution: `public static double promedio(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    int suma = 0;
    for (int n : nums) {
        suma += n;
    }
    return (double) suma / nums.length;
}`,
    spec: {
      methodName: 'promedio',
      argHints: ['int[]'],
      returnHint: 'double',
      tests: [
        { args: [[1, 2]], expected: 1.5 },
        { args: [[2, 4, 6]], expected: 4 },
        { args: [[]], expected: 0 },
        { args: [[10, 15]], expected: 12.5, hidden: true },
        { args: [[1, 1, 1, 2]], expected: 1.25, hidden: true },
      ],
    },
  },

  {
    id: 'tabla-multiplicar',
    title: 'Tabla de multiplicar',
    unitId: 1,
    difficulty: 'basico',
    statement: [
      'Escribí un método que imprima por consola la tabla de multiplicar del número que recibe, del 1 al 10.',
      'Cada línea tiene el formato "3 x 1 = 3", con espacios alrededor de la x y del igual.',
      'Este desafío se evalúa por lo que imprimís, no por lo que devolvés.',
    ],
    hints: [
      'Un for común del 1 al 10 alcanza: for (int i = 1; i <= 10; i++)',
      'Al concatenar con + dentro de println, los números se convierten a texto solos.',
    ],
    starterCode: `public static void tabla(int numero) {
    // Imprimí las 10 lineas de la tabla
}`,
    solution: `public static void tabla(int numero) {
    for (int i = 1; i <= 10; i++) {
        System.out.println(numero + " x " + i + " = " + (numero * i));
    }
}`,
    spec: {
      methodName: 'tabla',
      argHints: ['int'],
      returnHint: 'void',
      tests: [
        {
          args: [3],
          expected: '',
          expectedOutput: [
            '3 x 1 = 3', '3 x 2 = 6', '3 x 3 = 9', '3 x 4 = 12', '3 x 5 = 15',
            '3 x 6 = 18', '3 x 7 = 21', '3 x 8 = 24', '3 x 9 = 27', '3 x 10 = 30',
          ],
        },
        {
          args: [1],
          expected: '',
          hidden: true,
          expectedOutput: [
            '1 x 1 = 1', '1 x 2 = 2', '1 x 3 = 3', '1 x 4 = 4', '1 x 5 = 5',
            '1 x 6 = 6', '1 x 7 = 7', '1 x 8 = 8', '1 x 9 = 9', '1 x 10 = 10',
          ],
        },
        {
          args: [7],
          expected: '',
          hidden: true,
          expectedOutput: [
            '7 x 1 = 7', '7 x 2 = 14', '7 x 3 = 21', '7 x 4 = 28', '7 x 5 = 35',
            '7 x 6 = 42', '7 x 7 = 49', '7 x 8 = 56', '7 x 9 = 63', '7 x 10 = 70',
          ],
        },
      ],
    },
  },
]

export const challengeById = new Map(challenges.map((c) => [c.id, c]))
