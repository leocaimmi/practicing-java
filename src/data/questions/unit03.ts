import type { Question } from '../../types'

const SOURCE = 'Clase 3 — Clase String y Arrays'

export const unit03: Question[] = [
  {
    id: 'u03-q01',
    unitId: 3,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'La clase String está declarada como final, de modo que no puede tener subclases.',
    answer: true,
    explanation:
      'El material la presenta como una clase final, lo que imposibilita la creación de subclases derivadas.',
    source: SOURCE,
    tags: ['String', 'final'],
  },
  {
    id: 'u03-q02',
    unitId: 3,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'El operador == aplicado a dos String compara el contenido de ambas cadenas.',
    answer: false,
    explanation:
      'El operador == compara por referencia, es decir, si ambas variables apuntan a la misma dirección de memoria. Para comparar el contenido hay que usar equals() o equalsIgnoreCase().',
    source: SOURCE,
    tags: ['String', 'equals'],
  },
  {
    id: 'u03-q03',
    unitId: 3,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `String a = "casa";
System.out.println(a.equals("Casa"));
System.out.println(a.equalsIgnoreCase("Casa"));`,
    options: ['false y luego true', 'true y luego true', 'false y luego false', 'true y luego false'],
    correctIndex: 0,
    explanation:
      'equals() compara el contenido carácter por carácter, y "casa" no es igual a "Casa" por la mayúscula inicial. equalsIgnoreCase() hace la misma comparación sin distinguir mayúsculas de minúsculas, por lo que da true.',
    source: SOURCE,
    tags: ['String', 'equals'],
  },
  {
    id: 'u03-q04',
    unitId: 3,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `String a = "java";
a.toUpperCase();
System.out.println(a);`,
    options: [
      'java, porque los String son inmutables y toUpperCase() devuelve una copia que acá se descarta.',
      'JAVA, porque toUpperCase() modifica la cadena original.',
      'Una cadena vacía, porque la conversión deja la variable sin contenido.',
      'No compila, porque el resultado de toUpperCase() tiene que asignarse.',
    ],
    correctIndex: 0,
    explanation:
      'Los objetos String son inmutables: una vez creados no se puede modificar su contenido. toUpperCase() devuelve una copia en mayúsculas, y como esa copia no se asigna a ninguna variable, se pierde y “a” sigue valiendo "java".',
    source: SOURCE,
    tags: ['String', 'Inmutabilidad'],
  },
  {
    id: 'u03-q05',
    unitId: 3,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `String s = "Programacion";
System.out.println(s.length());
System.out.println(s.substring(0, 6));`,
    options: ['12 y luego Progra', '12 y luego Program', '11 y luego Progra', '13 y luego Program'],
    correctIndex: 0,
    explanation:
      '"Programacion" tiene 12 caracteres. En substring(int beginIndex, int endIndex) el carácter que está en endIndex no se incluye, así que substring(0, 6) toma las posiciones 0 a 5: "Progra".',
    source: SOURCE,
    tags: ['String', 'substring'],
  },
  {
    id: 'u03-q06',
    unitId: 3,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué devuelve indexOf() cuando la subcadena buscada no aparece en el texto?',
    options: ['-1', '0', 'null', 'Lanza una excepción'],
    correctIndex: 0,
    explanation:
      'indexOf() y lastIndexOf() devuelven el índice de la primera o la última ocurrencia, y -1 cuando el valor buscado no existe dentro de la cadena.',
    source: SOURCE,
    tags: ['String', 'indexOf'],
  },
  {
    id: 'u03-q07',
    unitId: 3,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál es la diferencia central entre String y StringBuilder?',
    options: [
      'StringBuilder representa una secuencia de caracteres mutable, que se modifica sin generar nuevas instancias en memoria.',
      'StringBuilder sólo admite caracteres alfabéticos, mientras que String admite cualquier símbolo.',
      'String pertenece a java.util y StringBuilder a java.lang.',
      'StringBuilder no permite concatenar; únicamente permite reemplazar caracteres sueltos.',
    ],
    correctIndex: 0,
    explanation:
      'Ambos gestionan conjuntos de caracteres, pero el StringBuilder se puede modificar sin estar generando nuevas instancias en memoria, como sí ocurre con los String. Por eso optimiza el rendimiento cuando hay muchas modificaciones.',
    source: SOURCE,
    tags: ['StringBuilder'],
  },
  {
    id: 'u03-q08',
    unitId: 3,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cómo se obtiene la cantidad de posiciones de un arreglo en Java?',
    options: [
      'Con el atributo length, sin paréntesis.',
      'Con el método length(), con paréntesis.',
      'Con el método size().',
      'Con el método count().',
    ],
    correctIndex: 0,
    explanation:
      'En los arreglos, length es una propiedad directa y se escribe sin paréntesis. length() con paréntesis es el método de la clase String, y size() es el de las colecciones.',
    source: SOURCE,
    tags: ['Arrays', 'length'],
  },
  {
    id: 'u03-q09',
    unitId: 3,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int[] numeros = new int[3];
numeros[0] = 10;
System.out.println(numeros.length);
System.out.println(numeros[1]);`,
    options: [
      '3 y luego 0',
      '1 y luego 0',
      '3 y luego null',
      'Lanza ArrayIndexOutOfBoundsException en la última línea.',
    ],
    correctIndex: 0,
    explanation:
      'length retorna la longitud total del arreglo, esté cargado o no: la instanciación reservó 3 posiciones. La posición 1 existe y todavía tiene el valor por defecto de los int, que es 0.',
    source: SOURCE,
    tags: ['Arrays', 'length'],
  },
  {
    id: 'u03-q10',
    unitId: 3,
    type: 'vf',
    difficulty: 'basico',
    prompt:
      'Un arreglo en Java puede contener elementos de distintos tipos de datos al mismo tiempo, por ejemplo int y String.',
    answer: false,
    explanation:
      'Los arreglos pueden contener tipos primitivos u objetos, pero siempre asociados a un solo tipo de datos, el que se indica en la declaración.',
    source: SOURCE,
    tags: ['Arrays'],
  },
  {
    id: 'u03-q11',
    unitId: 3,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué devuelve el método split(String patron) de la clase String?',
    options: [
      'Un arreglo de String con las subcadenas resultantes de separar el texto por el patrón indicado.',
      'Un único String con el patrón eliminado del texto.',
      'La cantidad de veces que el patrón aparece en la cadena.',
      'Un arreglo de char con todos los caracteres de la cadena.',
    ],
    correctIndex: 0,
    explanation:
      'split() divide la cadena en varias subcadenas usando el patrón indicado como separador, y las devuelve en un String[]. El que convierte la cadena en un arreglo de caracteres es toCharArray().',
    source: SOURCE,
    tags: ['String', 'split'],
  },
  {
    id: 'u03-q12',
    unitId: 3,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué devuelve a.compareTo(b) cuando la cadena a es lexicográficamente anterior a b?',
    options: ['Un valor negativo', 'Cero', 'Un valor positivo', 'false'],
    correctIndex: 0,
    explanation:
      'El contrato de compareTo() establece un valor negativo si la cadena es anterior al argumento, cero si son iguales y un valor positivo si es posterior.',
    source: SOURCE,
    tags: ['String', 'compareTo'],
  },
]
