import type { Difficulty } from '../types'
import type { ChallengeSpec } from '../lib/java/runner'

/** Una forma de resolver el desafío, con su nivel y qué conviene mirar de ella. */
export interface Solution {
  /** Cómo se llega a esta solución, por ejemplo "Con un for each". */
  label: string
  level: Difficulty
  code: string
  /** Qué enseña este enfoque frente a los otros. */
  note: string
}

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
  /**
   * Soluciones posibles, de la más directa a la más elaborada. Se muestran
   * recién después de gastar los intentos o de resolver el desafío.
   */
  solutions: Solution[]
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
    solutions: [
      {
        label: 'Con un for each',
        level: 'basico',
        code: `public static int sumar(int[] nums) {
    int total = 0;
    for (int n : nums) {
        total += n;
    }
    return total;
}`,
        note:
          'La forma más directa: el for each de la clase 3 recorre el arreglo sin que tengas que manejar el índice.',
      },
      {
        label: 'Con un for por índice',
        level: 'basico',
        code: `public static int sumar(int[] nums) {
    int total = 0;
    for (int i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    return total;
}`,
        note:
          'Equivalente, pero acá sí manejás la posición. Sirve cuando además necesitás saber en qué índice estás.',
      },
      {
        label: 'Con un while',
        level: 'intermedio',
        code: `public static int sumar(int[] nums) {
    int total = 0;
    int i = 0;
    while (i < nums.length) {
        total += nums[i];
        i++;
    }
    return total;
}`,
        note:
          'El mismo recorrido con el otro bucle. Fijate que el contador hay que declararlo antes y aumentarlo a mano dentro del cuerpo.',
      },
    ],
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
    solutions: [
      {
        label: 'Iterativa',
        level: 'intermedio',
        code: `public static int fibonacci(int n) {
    int a = 0;
    int b = 1;
    for (int i = 0; i < n; i++) {
        int siguiente = a + b;
        a = b;
        b = siguiente;
    }
    return a;
}`,
        note:
          'Recorre una sola vez y guarda nada más que los dos últimos términos. Es la más eficiente de las dos.',
      },
      {
        label: 'Recursiva',
        level: 'avanzado',
        code: `public static int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        note:
          'Más parecida a la definición matemática, pero recalcula los mismos términos muchas veces: con n grande se vuelve lenta. El caso base es lo que evita que la recursión no termine.',
      },
    ],
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
    solutions: [
      {
        label: 'Recorriendo de atras para adelante',
        level: 'intermedio',
        code: `public static String invertir(String texto) {
    StringBuilder sb = new StringBuilder();
    for (int i = texto.length() - 1; i >= 0; i--) {
        sb.append(texto.charAt(i));
    }
    return sb.toString();
}`,
        note:
          'Muestra el recorrido inverso con charAt() y cómo el StringBuilder va armando el resultado sin crear un String nuevo en cada vuelta.',
      },
      {
        label: 'Con el reverse() del StringBuilder',
        level: 'basico',
        code: `public static String invertir(String texto) {
    StringBuilder sb = new StringBuilder(texto);
    sb.reverse();
    return sb.toString();
}`,
        note:
          'La más corta: el propio StringBuilder sabe invertirse. Ojo que reverse() modifica el objeto, no devuelve una copia.',
      },
      {
        label: 'Con toCharArray()',
        level: 'intermedio',
        code: `public static String invertir(String texto) {
    char[] letras = texto.toCharArray();
    StringBuilder sb = new StringBuilder();
    for (int i = letras.length - 1; i >= 0; i--) {
        sb.append(letras[i]);
    }
    return sb.toString();
}`,
        note:
          'Convierte la cadena en un arreglo de caracteres y lo recorre al revés. Es útil cuando además necesitás trabajar con los caracteres sueltos.',
      },
    ],
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
    solutions: [
      {
        label: 'Con indexOf sobre las vocales',
        level: 'basico',
        code: `public static int contarVocales(String texto) {
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
        note:
          'El truco está en usar indexOf() como si fuera una pregunta: devuelve -1 cuando el carácter no está en "aeiou".',
      },
      {
        label: 'Comparando carácter por carácter',
        level: 'intermedio',
        code: `public static int contarVocales(String texto) {
    String t = texto.toLowerCase();
    int total = 0;
    for (int i = 0; i < t.length(); i++) {
        char c = t.charAt(i);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            total++;
        }
    }
    return total;
}`,
        note:
          'Sin atajos: se compara contra cada vocal con el operador OR. Es más largo pero deja ver exactamente qué se está preguntando.',
      },
    ],
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
    solutions: [
      {
        label: 'Con Arrays.sort()',
        level: 'basico',
        code: `public static String ordenar(int[] nums) {
    Arrays.sort(nums);
    return Arrays.toString(nums);
}`,
        note:
          'La API ya resuelve el ordenamiento: es exactamente el dolor de cabeza que, según el material, la API viene a evitarte.',
      },
      {
        label: 'Ordenando a mano',
        level: 'avanzado',
        code: `public static String ordenar(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[i]) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
    }
    return Arrays.toString(nums);
}`,
        note:
          'El mismo resultado implementando el ordenamiento por intercambio. Sirve para entender qué hace Arrays.sort() por dentro, pero en un programa real conviene usar la API.',
      },
    ],
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
    solutions: [
      {
        label: 'Con for each',
        level: 'intermedio',
        code: `public static int mayor(List<Integer> numeros) {
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
        note:
          'Arranca tomando el primer elemento como máximo provisorio, que es lo que evita el problema de inicializar en 0 con listas de negativos.',
      },
      {
        label: 'Con get() por índice',
        level: 'intermedio',
        code: `public static int mayor(List<Integer> numeros) {
    if (numeros.isEmpty()) {
        return 0;
    }
    int maximo = numeros.get(0);
    for (int i = 1; i < numeros.size(); i++) {
        if (numeros.get(i) > maximo) {
            maximo = numeros.get(i);
        }
    }
    return maximo;
}`,
        note:
          'La List permite acceso por índice, así que también se puede recorrer con un for común empezando desde la posición 1.',
      },
      {
        label: 'Con Collections.max()',
        level: 'basico',
        code: `public static int mayor(List<Integer> numeros) {
    if (numeros.isEmpty()) {
        return 0;
    }
    return Collections.max(numeros);
}`,
        note:
          'La API ya trae el método. Requiere que los elementos implementen Comparable, cosa que Integer cumple, y hay que contemplar aparte la lista vacía.',
      },
    ],
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
    solutions: [
      {
        label: 'Con un HashSet',
        level: 'intermedio',
        code: `public static int contarDistintos(int[] nums) {
    Set<Integer> vistos = new HashSet<>();
    for (int n : nums) {
        vistos.add(n);
    }
    return vistos.size();
}`,
        note:
          'Es el caso de uso natural del Set: como no admite duplicados, el tamaño final ya es la respuesta.',
      },
      {
        label: 'Evaluando el retorno de add()',
        level: 'intermedio',
        code: `public static int contarDistintos(int[] nums) {
    Set<Integer> vistos = new HashSet<>();
    int distintos = 0;
    for (int n : nums) {
        if (vistos.add(n)) {
            distintos++;
        }
    }
    return distintos;
}`,
        note:
          'Misma idea, pero contando explícitamente. add() devuelve true sólo cuando el elemento no estaba, así que sirve como contador.',
      },
    ],
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
    solutions: [
      {
        label: 'Con el reverse() del StringBuilder',
        level: 'intermedio',
        code: `public static boolean esPalindromo(String palabra) {
    StringBuilder sb = new StringBuilder(palabra);
    sb.reverse();
    return palabra.equalsIgnoreCase(sb.toString());
}`,
        note:
          'Arma la cadena invertida y la compara con equalsIgnoreCase(), que ahorra pasar todo a minúsculas.',
      },
      {
        label: 'Con dos índices que se acercan',
        level: 'avanzado',
        code: `public static boolean esPalindromo(String palabra) {
    String p = palabra.toLowerCase();
    int izquierda = 0;
    int derecha = p.length() - 1;
    while (izquierda < derecha) {
        if (p.charAt(izquierda) != p.charAt(derecha)) {
            return false;
        }
        izquierda++;
        derecha--;
    }
    return true;
}`,
        note:
          'No crea ninguna cadena nueva: compara el primero con el último, avanza y retrocede, y corta apenas encuentra una diferencia.',
      },
    ],
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
    solutions: [
      {
        label: 'Con getOrDefault()',
        level: 'avanzado',
        code: `public static int maximaRepeticion(String[] palabras) {
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
        note:
          'getOrDefault() devuelve 0 cuando la clave todavía no está, y así te ahorra el if de la primera aparición.',
      },
      {
        label: 'Con containsKey()',
        level: 'intermedio',
        code: `public static int maximaRepeticion(String[] palabras) {
    Map<String, Integer> conteo = new HashMap<>();
    for (String palabra : palabras) {
        if (conteo.containsKey(palabra)) {
            conteo.put(palabra, conteo.get(palabra) + 1);
        } else {
            conteo.put(palabra, 1);
        }
    }
    int maximo = 0;
    for (int cantidad : conteo.values()) {
        if (cantidad > maximo) {
            maximo = cantidad;
        }
    }
    return maximo;
}`,
        note:
          'La versión explícita: pregunta si la clave ya está antes de decidir si guarda 1 o suma al valor anterior.',
      },
    ],
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
    solutions: [
      {
        label: 'Con Collections.sort()',
        level: 'intermedio',
        code: `public static String ordenarNombres(List<String> nombres) {
    Collections.sort(nombres);
    return nombres.toString();
}`,
        note:
          'String ya implementa Comparable, así que el orden natural es el alfabético y no hay que escribir ningún criterio.',
      },
      {
        label: 'Con el sort() de la propia lista',
        level: 'basico',
        code: `public static String ordenarNombres(List<String> nombres) {
    nombres.sort();
    return nombres.toString();
}`,
        note:
          'La List también sabe ordenarse a sí misma. El resultado es el mismo: ordena en el lugar, no devuelve una lista nueva.',
      },
    ],
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
    solutions: [
      {
        label: 'Casteando el numerador',
        level: 'avanzado',
        code: `public static double promedio(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    int suma = 0;
    for (int n : nums) {
        suma += n;
    }
    return (double) suma / nums.length;
}`,
        note:
          'El casteo a double sobre uno de los operandos alcanza: con que uno de los dos sea double, el resultado también lo es.',
      },
      {
        label: 'Acumulando en un double',
        level: 'intermedio',
        code: `public static double promedio(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    double suma = 0;
    for (int n : nums) {
        suma += n;
    }
    return suma / nums.length;
}`,
        note:
          'Si la suma ya es double, la división también lo es y no hace falta castear. Es la forma de evitar el problema desde el principio.',
      },
    ],
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
    solutions: [
      {
        label: 'Con un for',
        level: 'basico',
        code: `public static void tabla(int numero) {
    for (int i = 1; i <= 10; i++) {
        System.out.println(numero + " x " + i + " = " + (numero * i));
    }
}`,
        note:
          'El for concentra en una línea la inicialización, la condición y el incremento.',
      },
      {
        label: 'Con un while',
        level: 'basico',
        code: `public static void tabla(int numero) {
    int i = 1;
    while (i <= 10) {
        System.out.println(numero + " x " + i + " = " + (numero * i));
        i++;
    }
}`,
        note:
          'El mismo recorrido con el contador declarado afuera. Si te olvidás el incremento, el ciclo no termina nunca.',
      },
    ],
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

challenges.push(
  {
    id: 'factorial',
    title: 'Factorial con recursión',
    unitId: 1,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que devuelva el factorial de un número, es decir el producto de todos los enteros desde 1 hasta ese número.',
      'Por ejemplo, el factorial de 5 es 5 × 4 × 3 × 2 × 1 = 120.',
      'El factorial de 0 es 1 por definición: ése es el caso base.',
    ],
    hints: [
      'El caso base corta la recursión: si n es 0 o 1, el resultado es 1.',
      'El caso recursivo se apoya en el anterior: n por el factorial de n menos 1.',
      'También se puede resolver con un ciclo que vaya multiplicando un acumulador.',
    ],
    starterCode: `public static int factorial(int n) {
    // Devolvé el factorial de n
    return 0;
}`,
    solutions: [
      {
        label: 'Recursiva',
        level: 'intermedio',
        code: `public static int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
        note:
          'Sigue la definición matemática. El caso base n <= 1 es lo que corta la recursión.',
      },
      {
        label: 'Iterativa',
        level: 'basico',
        code: `public static int factorial(int n) {
    int resultado = 1;
    for (int i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}`,
        note:
          'Un acumulador que se multiplica en cada vuelta. No usa la pila de llamadas, así que soporta números más grandes.',
      },
    ],
    spec: {
      methodName: 'factorial',
      argHints: ['int'],
      returnHint: 'int',
      tests: [
        { args: [0], expected: 1 },
        { args: [5], expected: 120 },
        { args: [1], expected: 1 },
        { args: [7], expected: 5040, hidden: true },
        { args: [10], expected: 3628800, hidden: true },
      ],
    },
  },

  {
    id: 'es-primo',
    title: '¿Es primo?',
    unitId: 1,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que indique si un número entero es primo, es decir si sólo es divisible por 1 y por sí mismo.',
      'Los números menores a 2 no son primos.',
    ],
    hints: [
      'El operador % devuelve el resto de una división: si n % i da 0, entonces i divide a n.',
      'Alcanza con probar los divisores desde 2 hasta n - 1; en cuanto encontrás uno, ya sabés que no es primo.',
      'Podés cortar el ciclo con return false apenas encontrás un divisor.',
    ],
    starterCode: `public static boolean esPrimo(int n) {
    // Devolvé true si n es primo
    return false;
}`,
    solutions: [
      {
        label: 'Cortando con return',
        level: 'intermedio',
        code: `public static boolean esPrimo(int n) {
    if (n < 2) {
        return false;
    }
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}`,
        note:
          'Apenas encuentra un divisor devuelve false: no tiene sentido seguir buscando.',
      },
      {
        label: 'Con una bandera',
        level: 'intermedio',
        code: `public static boolean esPrimo(int n) {
    if (n < 2) {
        return false;
    }
    boolean primo = true;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            primo = false;
        }
    }
    return primo;
}`,
        note:
          'Misma lógica con una variable boolean. Es más larga, pero deja un único punto de salida del método.',
      },
    ],
    spec: {
      methodName: 'esPrimo',
      argHints: ['int'],
      returnHint: 'boolean',
      tests: [
        { args: [7], expected: true },
        { args: [9], expected: false },
        { args: [1], expected: false },
        { args: [2], expected: true, hidden: true },
        { args: [97], expected: true, hidden: true },
        { args: [100], expected: false, hidden: true },
      ],
    },
  },

  {
    id: 'invertir-arreglo',
    title: 'Invertir un arreglo',
    unitId: 3,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que reciba un arreglo de enteros y devuelva sus elementos en orden inverso, como texto.',
      'El formato esperado es el de Arrays.toString(): por ejemplo, con {1, 2, 3} tiene que devolver "[3, 2, 1]".',
    ],
    hints: [
      'Podés crear un arreglo nuevo del mismo tamaño y cargarlo recorriendo el original de atrás para adelante.',
      'La última posición de un arreglo es length - 1, no length.',
      'Arrays.toString() te da el formato con corchetes y comas.',
    ],
    starterCode: `public static String invertirArreglo(int[] nums) {
    // Devolvé los elementos al reves, como texto
    return "";
}`,
    solutions: [
      {
        label: 'Con un arreglo nuevo',
        level: 'intermedio',
        code: `public static String invertirArreglo(int[] nums) {
    int[] resultado = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
        resultado[i] = nums[nums.length - 1 - i];
    }
    return Arrays.toString(resultado);
}`,
        note:
          'Deja intacto el original y va copiando desde el final. La última posición es length - 1, no length.',
      },
      {
        label: 'Intercambiando en el lugar',
        level: 'avanzado',
        code: `public static String invertirArreglo(int[] nums) {
    int izquierda = 0;
    int derecha = nums.length - 1;
    while (izquierda < derecha) {
        int temp = nums[izquierda];
        nums[izquierda] = nums[derecha];
        nums[derecha] = temp;
        izquierda++;
        derecha--;
    }
    return Arrays.toString(nums);
}`,
        note:
          'No usa memoria extra: intercambia el primero con el último, el segundo con el anteúltimo, y así hasta el medio.',
      },
    ],
    spec: {
      methodName: 'invertirArreglo',
      argHints: ['int[]'],
      returnHint: 'String',
      tests: [
        { args: [[1, 2, 3]], expected: '[3, 2, 1]' },
        { args: [[5]], expected: '[5]' },
        { args: [[]], expected: '[]' },
        { args: [[4, 8, 15, 16]], expected: '[16, 15, 8, 4]', hidden: true },
      ],
    },
  },

  {
    id: 'buscar-en-arreglo',
    title: 'Buscar un valor en un arreglo',
    unitId: 3,
    difficulty: 'basico',
    statement: [
      'Escribí un método que reciba un arreglo de enteros y un valor, y devuelva la posición donde aparece ese valor por primera vez.',
      'Si el valor no está en el arreglo, devolvé -1. Es la misma convención que usa indexOf().',
    ],
    hints: [
      'Necesitás el índice, así que conviene un for común y no un for each.',
      'En cuanto encontrás el valor podés devolver la posición: no hace falta seguir recorriendo.',
      'Si el ciclo termina sin encontrarlo, recién ahí devolvés -1.',
    ],
    starterCode: `public static int buscar(int[] nums, int valor) {
    // Devolvé la posicion del valor, o -1 si no esta
    return 0;
}`,
    solutions: [
      {
        label: 'Devolviendo apenas lo encuentra',
        level: 'basico',
        code: `public static int buscar(int[] nums, int valor) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == valor) {
            return i;
        }
    }
    return -1;
}`,
        note:
          'En cuanto aparece el valor se sale del método: no hace falta recorrer el resto.',
      },
      {
        label: 'Guardando el resultado',
        level: 'basico',
        code: `public static int buscar(int[] nums, int valor) {
    int posicion = -1;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == valor && posicion == -1) {
            posicion = i;
        }
    }
    return posicion;
}`,
        note:
          'Recorre siempre el arreglo completo y guarda la posición en una variable. Es menos eficiente, pero tiene una sola salida.',
      },
    ],
    spec: {
      methodName: 'buscar',
      argHints: ['int[]', 'int'],
      returnHint: 'int',
      tests: [
        { args: [[10, 20, 30], 20], expected: 1 },
        { args: [[10, 20, 30], 99], expected: -1 },
        { args: [[7], 7], expected: 0 },
        { args: [[], 1], expected: -1, hidden: true },
        { args: [[5, 5, 5], 5], expected: 0, hidden: true },
      ],
    },
  },

  {
    id: 'contar-palabras',
    title: 'Contar palabras de una frase',
    unitId: 3,
    difficulty: 'basico',
    statement: [
      'Escribí un método que reciba una frase y devuelva cuántas palabras tiene.',
      'Las palabras vienen separadas por un único espacio. La frase nunca llega vacía.',
    ],
    hints: [
      'split() divide la cadena en un arreglo usando el separador que le indiques.',
      'La cantidad de palabras es la longitud de ese arreglo, y en los arreglos length va sin paréntesis.',
    ],
    starterCode: `public static int contarPalabras(String frase) {
    // Devolvé cuantas palabras tiene la frase
    return 0;
}`,
    solutions: [
      {
        label: 'Con split()',
        level: 'basico',
        code: `public static int contarPalabras(String frase) {
    String[] palabras = frase.split(" ");
    return palabras.length;
}`,
        note:
          'Divide por el espacio y cuenta las partes. Acordate de que en los arreglos length va sin paréntesis.',
      },
      {
        label: 'Contando los espacios',
        level: 'intermedio',
        code: `public static int contarPalabras(String frase) {
    int espacios = 0;
    for (int i = 0; i < frase.length(); i++) {
        if (frase.charAt(i) == ' ') {
            espacios++;
        }
    }
    return espacios + 1;
}`,
        note:
          'Si las palabras están separadas por un espacio, hay una palabra más que espacios. Recorre la cadena sin crear el arreglo intermedio.',
      },
    ],
    spec: {
      methodName: 'contarPalabras',
      argHints: ['String'],
      returnHint: 'int',
      tests: [
        { args: ['hola mundo'], expected: 2 },
        { args: ['uno'], expected: 1 },
        { args: ['a b c d'], expected: 4 },
        { args: ['Programacion II Desarrollo en Java'], expected: 5, hidden: true },
      ],
    },
  },

  {
    id: 'contar-letra',
    title: 'Contar apariciones de un carácter',
    unitId: 3,
    difficulty: 'basico',
    statement: [
      'Escribí un método que reciba un texto y un carácter, y devuelva cuántas veces aparece ese carácter en el texto.',
      'La comparación distingue mayúsculas de minúsculas.',
    ],
    hints: [
      'charAt(i) te devuelve el carácter que está en la posición i.',
      'Los char se comparan con == porque son tipos primitivos, no objetos.',
    ],
    starterCode: `public static int contarLetra(String texto, char letra) {
    // Contá cuantas veces aparece la letra
    return 0;
}`,
    solutions: [
      {
        label: 'Con charAt()',
        level: 'basico',
        code: `public static int contarLetra(String texto, char letra) {
    int total = 0;
    for (int i = 0; i < texto.length(); i++) {
        if (texto.charAt(i) == letra) {
            total++;
        }
    }
    return total;
}`,
        note:
          'Recorre por posición y compara cada carácter. Los char se comparan con == porque son primitivos.',
      },
      {
        label: 'Con toCharArray() y for each',
        level: 'basico',
        code: `public static int contarLetra(String texto, char letra) {
    int total = 0;
    for (char c : texto.toCharArray()) {
        if (c == letra) {
            total++;
        }
    }
    return total;
}`,
        note:
          'Convierte la cadena en un arreglo de caracteres y lo recorre con for each, sin necesitar el índice.',
      },
    ],
    spec: {
      methodName: 'contarLetra',
      argHints: ['String', 'char'],
      returnHint: 'int',
      tests: [
        { args: ['banana', 'a'], expected: 3 },
        { args: ['Java', 'J'], expected: 1 },
        { args: ['hola', 'z'], expected: 0 },
        { args: ['Java', 'j'], expected: 0, hidden: true },
        { args: ['aaaa', 'a'], expected: 4, hidden: true },
      ],
    },
  },

  {
    id: 'maximo-y-minimo',
    title: 'Distancia entre el mayor y el menor',
    unitId: 3,
    difficulty: 'intermedio',
    statement: [
      'Escribí un método que reciba un arreglo de enteros y devuelva la diferencia entre el mayor y el menor de sus elementos.',
      'Por ejemplo, con {3, 9, 1} el mayor es 9 y el menor es 1, así que la diferencia es 8.',
      'Si el arreglo está vacío, devolvé 0.',
    ],
    hints: [
      'Podés recorrer una sola vez llevando dos variables: el máximo y el mínimo encontrados hasta ahora.',
      'Conviene inicializar las dos con el primer elemento, y no con 0: si todos los números fueran negativos, el 0 arruinaría el máximo.',
      'Math.max() y Math.min() te evitan escribir los if.',
    ],
    starterCode: `public static int distancia(int[] nums) {
    // Devolvé la diferencia entre el mayor y el menor
    return 0;
}`,
    solutions: [
      {
        label: 'Con Math.max() y Math.min()',
        level: 'intermedio',
        code: `public static int distancia(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    int maximo = nums[0];
    int minimo = nums[0];
    for (int n : nums) {
        maximo = Math.max(maximo, n);
        minimo = Math.min(minimo, n);
    }
    return maximo - minimo;
}`,
        note:
          'Los métodos estáticos de Math evitan escribir los if. Inicializar con el primer elemento es lo que hace que funcione con negativos.',
      },
      {
        label: 'Con if',
        level: 'basico',
        code: `public static int distancia(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    int maximo = nums[0];
    int minimo = nums[0];
    for (int n : nums) {
        if (n > maximo) {
            maximo = n;
        }
        if (n < minimo) {
            minimo = n;
        }
    }
    return maximo - minimo;
}`,
        note:
          'La versión sin la clase Math: dos condiciones que van actualizando el máximo y el mínimo.',
      },
    ],
    spec: {
      methodName: 'distancia',
      argHints: ['int[]'],
      returnHint: 'int',
      tests: [
        { args: [[3, 9, 1]], expected: 8 },
        { args: [[5, 5]], expected: 0 },
        { args: [[]], expected: 0 },
        { args: [[-10, -2]], expected: 8, hidden: true },
        { args: [[0, 100, 50]], expected: 100, hidden: true },
      ],
    },
  },

  {
    id: 'multiplos-de-tres',
    title: 'Múltiplos de tres',
    unitId: 1,
    difficulty: 'basico',
    statement: [
      'Escribí un método que imprima por consola todos los múltiplos de 3 desde el 3 hasta el número que recibe, inclusive.',
      'Cada múltiplo va en su propia línea.',
      'Este desafío se evalúa por lo que imprimís, no por lo que devolvés.',
    ],
    hints: [
      'Un número es múltiplo de 3 cuando el resto de dividirlo por 3 da cero: n % 3 == 0.',
      'También podés recorrer de 3 en 3 con un for, y ahorrarte el if.',
    ],
    starterCode: `public static void multiplosDeTres(int hasta) {
    // Imprimí los multiplos de 3, uno por linea
}`,
    solutions: [
      {
        label: 'Avanzando de tres en tres',
        level: 'basico',
        code: `public static void multiplosDeTres(int hasta) {
    for (int i = 3; i <= hasta; i += 3) {
        System.out.println(i);
    }
}`,
        note:
          'Si el incremento ya es 3, todos los valores son múltiplos y no hace falta preguntar nada.',
      },
      {
        label: 'Preguntando por el resto',
        level: 'basico',
        code: `public static void multiplosDeTres(int hasta) {
    for (int i = 1; i <= hasta; i++) {
        if (i % 3 == 0) {
            System.out.println(i);
        }
    }
}`,
        note:
          'Recorre uno por uno y usa el operador % para quedarse sólo con los que dividen exacto por 3.',
      },
    ],
    spec: {
      methodName: 'multiplosDeTres',
      argHints: ['int'],
      returnHint: 'void',
      tests: [
        { args: [10], expected: '', expectedOutput: ['3', '6', '9'] },
        { args: [3], expected: '', expectedOutput: ['3'] },
        {
          args: [20],
          expected: '',
          hidden: true,
          expectedOutput: ['3', '6', '9', '12', '15', '18'],
        },
      ],
    },
  },
)

export const challengeById = new Map(challenges.map((c) => [c.id, c]))
