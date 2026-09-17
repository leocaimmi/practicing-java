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
  {
    id: 'u03-q13',
    unitId: 3,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'El método trim() elimina los espacios en blanco de la cadena original.',
    answer: false,
    explanation:
      'Como todos los métodos de String, trim() devuelve una copia sin los espacios al inicio y al final. La cadena original no cambia, porque los objetos String son inmutables.',
    source: SOURCE,
    tags: ['String', 'Inmutabilidad'],
  },
  {
    id: 'u03-q14',
    unitId: 3,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `String frase = "casa de casas";
System.out.println(frase.indexOf("casa"));
System.out.println(frase.lastIndexOf("casa"));`,
    options: ['0 y luego 8', '0 y luego 0', '1 y luego 9', '0 y luego 12'],
    correctIndex: 0,
    explanation:
      'indexOf() busca desde el principio y encuentra "casa" en la posición 0. lastIndexOf() busca desde el final: la última aparición arranca en la posición 8, contando desde cero.',
    source: SOURCE,
    tags: ['String', 'indexOf'],
  },
  {
    id: 'u03-q15',
    unitId: 3,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `String s = "Java";
System.out.println(s.charAt(0));
System.out.println(s.charAt(3));`,
    options: ['J y luego a', 'J y luego v', 'a y luego a', 'Lanza StringIndexOutOfBoundsException.'],
    correctIndex: 0,
    explanation:
      'charAt() retorna el carácter que está en la posición indicada, contando desde cero: la 0 es la J y la 3 es la última a de "Java".',
    source: SOURCE,
    tags: ['String', 'charAt'],
  },
  {
    id: 'u03-q16',
    unitId: 3,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué hace el método endsWith(String sufijo)?',
    options: [
      'Indica con un boolean si la cadena termina con el sufijo indicado.',
      'Devuelve la posición donde comienza el sufijo.',
      'Recorta la cadena quitándole el sufijo.',
      'Agrega el sufijo al final de la cadena.',
    ],
    correctIndex: 0,
    explanation:
      'endsWith() dice si la cadena termina o no con el sufijo indicado, y startsWith() hace lo mismo con el prefijo. Ambos devuelven boolean.',
    source: SOURCE,
    tags: ['String'],
  },
  {
    id: 'u03-q17',
    unitId: 3,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `String[] nombres = new String[2];
System.out.println(nombres[0]);
System.out.println(nombres.length);`,
    options: [
      'null y luego 2',
      'Una cadena vacía y luego 2',
      '0 y luego 2',
      'Lanza NullPointerException en la primera línea.',
    ],
    correctIndex: 0,
    explanation:
      'Los arreglos de objetos se inicializan con null, no con cadena vacía. length retorna la longitud total del arreglo, esté cargado o no, así que da 2.',
    source: SOURCE,
    tags: ['Arrays', 'null'],
  },
  {
    id: 'u03-q18',
    unitId: 3,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Al declarar un arreglo, los corchetes pueden ir tanto después del tipo como después del nombre.',
    answer: true,
    explanation:
      'El material lo menciona al describir las formas de declarar un arreglo: el tipo de datos seguido de corchetes y el nombre de la variable, o también con los corchetes al final.',
    source: SOURCE,
    tags: ['Arrays'],
  },
  {
    id: 'u03-q19',
    unitId: 3,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué hay que usar el operador new para crear un arreglo?',
    options: [
      'Porque un arreglo es un objeto en Java, y como tal debe instanciarse.',
      'Porque es la única manera de fijar el tipo de los elementos.',
      'Porque los arreglos se almacenan en el stack y new los reserva ahí.',
      'No hace falta: los arreglos se crean solos al declararlos.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo plantea así: como un Array es considerado un Objeto en Java, debe crearse una instancia. Se usa new, el tipo de los elementos y el número de elementos.',
    source: SOURCE,
    tags: ['Arrays'],
  },
  {
    id: 'u03-q20',
    unitId: 3,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int[] nums = {2, 4, 6};
int total = 0;
for (int n : nums) {
    total += n;
}
System.out.println(total);`,
    options: ['12', '6', '3', 'No compila: falta el índice en el for.'],
    correctIndex: 0,
    explanation:
      'Es el for each que presenta el material como forma nueva de recorrer arreglos. En cada vuelta la variable n toma un elemento del arreglo, así que la suma da 2 + 4 + 6 = 12.',
    source: SOURCE,
    tags: ['Arrays', 'for each'],
  },
  {
    id: 'u03-q21',
    unitId: 3,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué método del StringBuilder agrega texto al final?',
    options: ['append(s)', 'add(s)', 'concat(s)', 'push(s)'],
    correctIndex: 0,
    explanation:
      'Entre los métodos clave del StringBuilder, el material enumera append(s), insert(offset, s), delete(start, end), reverse() y setCharAt(index, ch).',
    source: SOURCE,
    tags: ['StringBuilder'],
  },
  {
    id: 'u03-q22',
    unitId: 3,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `StringBuilder sb = new StringBuilder("abc");
sb.append("de");
sb.reverse();
System.out.println(sb.toString());`,
    options: ['edcba', 'abcde', 'cbaed', 'abc'],
    correctIndex: 0,
    explanation:
      'A diferencia de String, el StringBuilder se modifica sin generar instancias nuevas: append deja "abcde" y reverse lo invierte en el lugar, quedando "edcba".',
    source: SOURCE,
    tags: ['StringBuilder'],
  },
  {
    id: 'u03-q23',
    unitId: 3,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál es la ventaja de usar StringBuilder en lugar de concatenar String dentro de un ciclo?',
    options: [
      'Evita crear un objeto nuevo en memoria por cada concatenación.',
      'Permite guardar caracteres de distintos tipos en la misma secuencia.',
      'Ordena automáticamente los caracteres al agregarlos.',
      'Es la única forma de recorrer una cadena carácter por carácter.',
    ],
    correctIndex: 0,
    explanation:
      'El StringBuilder gestiona una secuencia de caracteres mutable, orientada a optimizar el rendimiento y evitar la asignación innecesaria de objetos temporales en memoria. Con String, cada modificación genera una instancia nueva.',
    source: SOURCE,
    tags: ['StringBuilder', 'Inmutabilidad'],
  },
]
